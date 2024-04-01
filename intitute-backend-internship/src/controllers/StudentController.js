const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const Studentmodel = require('../models/Student');
const feesModule = require("../models/fees");
const FeeesDataModule = require("../models/feesdata");
const User = require("../models/getUser");
const getUsers = require('../models/getUser')
const MarkModule = require('../models/Marks')

class StudentController {
    // async AddStudent(req, res) {
    //     try {


    //         const doesExist = await Studentmodel.findOne({ email: req.body.email });

    //         if (doesExist) return Utilities.apiResponse(res, 422, 'Student is already been registered');

    //         let userData={
    //             username: req.body.username,
    //             password: req.body.password,
    //             role: "student",
    //         }
    //         const NewUser= User(userData)
    //         NewUser.save();

    //         let studentData={
    //             name: req.body.name,
    //             dob: req.body.dob,
    //             gen: req.body.gen,
    //             std_id: req.body.std_id,
    //             contact: req.body.contact,
    //             Alternet_contact: req.body.Alternet_contact,
    //             Address: req.body.Address,
    //             email: req.body.email,
    //             username: req.body.username,
    //             fees: req.body.fees,
    //             user_Id: NewUser._id,
    //             feesPaid: req.body.feesPaid,
    //         }

    //         const newStudentmodel = new Studentmodel(studentData);
    //         newStudentmodel.save();
    //         Utilities.apiResponse(res, 200, 'Student Added  Successfully!');
    //     } catch (error) {
    //         Utilities.apiResponse(res, 500, error);
    //     }
    // };


    async AddStudent(req, res) {
        try {
            const doesExist = await Studentmodel.findOne({ username: req.body.username });

            if (doesExist) {
                return Utilities.apiResponse(res, 422, 'Student is already registered');
            }



            let studentData = {
                name: req.body.name,
                dob: req.body.dob,
                gen: req.body.gen,
                std_id: req.body.std_id,
                contact: req.body.contact,
                Alternet_contact: req.body.Alternet_contact,
                Address: req.body.Address,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                fees: req.body.fees,
                feesPaid: req.body.feesPaid,
            };

            const newStudentmodel = new Studentmodel(studentData);
            await newStudentmodel.save();


            let userData = {
                loginid: req.body.username,
                pass: req.body.password,
                role: 'student',
                user_Id: newStudentmodel._id,
            };

            const NewUser = new User(userData);
            await NewUser.save();

            Utilities.apiResponse(res, 200, 'Student Admission Successfully!');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }



    async studentdata(req, res) {
        try {
            const options = {
                page: req.query?.page || 1,
                limit: req.query?.limit || 10,
            };
            let students = [];
            if (req.params.std) {
                students = await Studentmodel.find({ 'std_id': req.params.std,'isActive': true  });

            } else {
                students = await Studentmodel.paginate({}, options);
            }
            Utilities.apiResponse(res, 200, 'Get STudent Successfully', students);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async studentdata2(req, res) {
        try {


            const getstud = await Studentmodel.findOne({ _id: req.params.id });
            res.status(200).json(getstud);
            // Utilities.apiResponse(res, 200, 'Get Student Successfully', getstud);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async gatAllstudentdata(req, res) {
        try {

            const studentdata = await Studentmodel.aggregate([
                {
                    $match: {
                        isActive: true
                    }
                },
                {
                    $sort: { /* Specify the field and order for sorting */
                        _id: -1, // 1 for ascending, -1 for descending
                    }
                },
                {
                    $lookup: {
                        from: "fees",
                        localField: "std_id",
                        foreignField: "_id",
                        as: "stdfeesinfo",
                    },

                    // $unwind:'$stdfeesinfo'
                },
                {

                    $unwind: { path: '$stdfeesinfo', preserveNullAndEmptyArrays: true }
                },
                {
                    $lookup: {
                        from: "feesdatas",
                        localField: "fees",
                        foreignField: "_id",
                        as: "feesinfo",
                    },
                }

            ])
            Utilities.apiResponse(res, 200, 'Get Users Successfully', studentdata);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }


    async deleteStudent(req, res) {
        try {
            await Studentmodel.updateOne({ _id: req.params.id }, { $set: { isActive: false } });
            // await Studentmodel.deleteOne({ _id: req.params.id });
            // await FeeesDataModule.deleteMany({feesId:req.params.id})
            // await getUsers.deleteOne({user_Id: req.params.id})
            // await MarkModule.deleteMany({stuId:req.params.id})
            Utilities.apiResponse(res, 200, 'Student Deleted Successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }


    async updateStudent(req, res) {
        try {
            await Studentmodel.findOneAndUpdate({ _id: req.params.id }, req.body);
            Utilities.apiResponse(res, 200, 'Student updated Successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async getTotalCount(req, res) {
        try {
            const TotalStd = [];
            const totalStudent = await Studentmodel.countDocuments({})
            const first_data = await Studentmodel.countDocuments({ "std_id": "64aaeb0d3e6166d34291cf9a" })
            const second_data = await Studentmodel.countDocuments({ "std_id": "64aaeb2e3e6166d34291cf9c" })
            const third_data = await Studentmodel.countDocuments({ "std_id": "64aaeb6c3e6166d34291cfa0" })
            const fourth_data = await Studentmodel.countDocuments({ "std_id": "64aaeb823e6166d34291cfa2" })
            const fifth_data = await Studentmodel.countDocuments({ "std_id": "64aaeb993e6166d34291cfa4" })
            const six_data = await Studentmodel.countDocuments({ "std_id": "64aaec113e6166d34291cfa7" })
            const seven_data = await Studentmodel.countDocuments({ "std_id": "64b5b3b2a1ef79beee269102" })
            const eight_data = await Studentmodel.countDocuments({ "std_id": "64b5b3c8a1ef79beee269103" })
            const nine_data = await Studentmodel.countDocuments({ "std_id": "64b5b3d5a1ef79beee269104" })
            const ten_data = await Studentmodel.countDocuments({ "std_id": "64b5b40fa1ef79beee269105" })
            let gestudents = [];
            const studentdata = await Studentmodel.aggregate([
                {
                    $lookup: {
                        from: "fees",
                        localField: "std_id",
                        foreignField: "_id",
                        as: "stdfeesinfo",
                    }
                },
                {
                    $unwind: '$stdfeesinfo',
                }
            ])
            TotalStd.push({
                total: totalStudent,
                first: first_data,
                second: second_data,
                third: third_data,
                fourth: fourth_data,
                fifth: fifth_data,
                six: six_data,
                seven: seven_data,
                eight: eight_data,
                nine: nine_data,
                ten: ten_data,
                student: studentdata,

            })
            Utilities.apiResponse(res, 200, 'Get total count Successfully', TotalStd);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async getSinglestudetnData(req, res) {

        let Id = req.params.id;
        let query = { _id: Number(Id) }

        try {

            const studetndata = await Studentmodel.aggregate([

                {
                    $match: query
                },

                {
                    $lookup: {
                        from: "fees",
                        localField: "std_id",
                        foreignField: "_id",
                        as: "stdfeesinfo",
                    }
                },
                {
                    $unwind: '$stdfeesinfo',
                },


            ])

            Utilities.apiResponse(res, 200, 'Get Student Successfully', studetndata);

        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async studentdataForMarks(req, res) {


        const std_id2 = req.body.std_id;
        try {
            const students = await Studentmodel.find({ std_id: mongoose.Types.ObjectId(std_id2) });
            Utilities.apiResponse(res, 200, 'Get Student Successfully', students);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

       async getStudentDataForMark(req, res) {

            let ids=[];
            for (let index = 0; index < req.body.length; index++) {
                ids.push(req.body[index].stuId);
            }
            const students = await Studentmodel.find({ _id: { $in: ids } });
            console.log(ids);
            console.log(students);
            Utilities.apiResponse(res, 200, 'Get Student Successfully', students);
        }

    async getSinglestudetnDataForMessage(req, res) {

        let Id = req.body.id;
        let query = { _id: Number(Id) }
        try {

            const studetndata = await Studentmodel.aggregate([

                {
                    $match: query
                },

                {
                    $lookup: {
                        from: "fees",
                        localField: "std_id",
                        foreignField: "_id",
                        as: "stdfeesinfo",
                    }
                },
                {
                    $unwind: '$stdfeesinfo',
                },


            ])

            Utilities.apiResponse(res, 200, 'Get Student Successfully', studetndata);

        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }


    //couting total fees paid of student

    async totalFeesPaid(req, res) {
        try {
            const response = await Studentmodel.aggregate([
                {
                    $group: {
                        _id: null,
                        sum_val: { $sum: "$feesPaid" }
                    }
                }
            ]);

            if (response.length > 0) {
                const totalFeesPaid = response[0].sum_val;
                Utilities.apiResponse(res, 200, 'Get Student Successfully', totalFeesPaid);
            } else {
                Utilities.apiResponse(res, 200, 'No students found or feesPaid is zero', 0);
            }
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async getCancle(req, res) {
        try {
          
            const studentdata = await Studentmodel.aggregate([
                {
                    $match: {
                        isActive: false
                    }
                },
                {
                    $sort: { /* Specify the field and order for sorting */
                        _id: -1, // 1 for ascending, -1 for descending
                    }
                },
                {
                    $lookup: {
                        from: "fees",
                        localField: "std_id",
                        foreignField: "_id",
                        as: "stdfeesinfo",
                    },

                    // $unwind:'$stdfeesinfo'
                },
                {

                    $unwind: { path: '$stdfeesinfo', preserveNullAndEmptyArrays: true }
                },
                {
                    $lookup: {
                        from: "feesdatas",
                        localField: "fees",
                        foreignField: "_id",
                        as: "feesinfo",
                    },
                }

            ])
            Utilities.apiResponse(res, 200, 'Get Users Successfully', studentdata);
           
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }


}
module.exports = new StudentController();