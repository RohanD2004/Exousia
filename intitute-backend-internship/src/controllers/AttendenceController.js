const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const AdminModule = require('../models/Admin.js');
const AttendenceModule = require('../models/Attendence.js')
const StudentModule= require('../models/Student.js');

class AttendenceController {

    async AddAttendance(req, res) {
        try {
            for (let index = 0; index < req.body.length; index++) {
                let stuId = parseInt(req.body[index].stuId); // Convert student_id to number
                let date = req.body[index].date;

                const filter = { stuId, date };
                const update = { $setOnInsert: req.body[index] }; // Insert the document if it doesn't exist
                const options = { upsert: true };
                const result = await AttendenceModule.updateOne(filter, update, options);
                if (result.upsertedId) {
                    console.log(`Attendance added for student_id ${stuId} on ${date}`);
                } else {
                    return Utilities.apiResponse(res, 400, 'Attendance already exists');

                }
            }
            return Utilities.apiResponse(res, 200, 'Attendance fill successful');
        } catch (error) {
            return Utilities.apiResponse(res, 500, error);
        }
    }

    async getSingleStudentAttendance(req, res) {
        console.log("student_id "+req.body.user_id);
        const id = parseInt(req.body.user_id);
        try {
         
            const studentdata = await AttendenceModule.aggregate([
                { $match: { stuId: id } }, // Match the student_id
                {
                    $sort: {
                        _id: -1
                    }
                },
                {
                    $lookup: {
                        from: "teachers",
                        localField: "teacher_id",
                        foreignField: "_id",
                        as: "attendanceinfo",
                    },
                },
            ]);
            Utilities.apiResponse(res, 200, 'Get attendence Successfully', studentdata);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }


    async getAllStudentAttendance(req, res) {
        console.log(req.body);
        const id=mongoose.Types.ObjectId(req.body.std);
        try {
         
            const studentdata = 
             await StudentModule.aggregate([
                { $match: { std_id:mongoose.Types.ObjectId(req.body.std) } }, // Match the student_id
                {
                    $sort: {
                        _id: 1
                    }
                },
                {

                    $lookup: {
                        from: "attendences",
                        localField: "_id",
                        foreignField: "stuId",
                        as: "studentinfo",
                    },
                    // $lookup: {
                    //     from: "teachers",
                    //     localField: "teacher_id",
                    //     foreignField: "_id",
                    //     as: "attendanceinfo",
                    // },

                },  
             
            ]);
            
            Utilities.apiResponse(res, 200, 'Get attendence Successfully', studentdata);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async getAttendanceDate(req, res) {
        console.log(req.body);
    
        try {
            const studentdata =
                await StudentModule.aggregate([
                    { $match: { std_id: mongoose.Types.ObjectId(req.body.std) } },
                    {
                        $lookup: {
                            from: "attendences",
                            let: { studentId: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$$studentId", "$stuId"] },
                                                { $eq: ["$date", req.body.date] }
                                            ]
                                        }
                                    }
                                }
                            ],
                            as: "studentinfo"
                        }
                    },
                   
                ]);
    
        
            Utilities.apiResponse(res, 200, 'Get attendence Successfully', studentdata);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
     
    

}
module.exports = new AttendenceController();