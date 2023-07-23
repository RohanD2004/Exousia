const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const TeacherModule = require('../models/Teacher')
const getUsers= require('../models/getUser')

class TeacherController
{


    async countTeacher(req,res){

        try {
            const totalTeacher = await TeacherModule.countDocuments({})
            Utilities.apiResponse(res, 200, 'Teacher Count  Successfully!',totalTeacher);
        } catch (error) {
            Utilities.apiResponse(rres,500,error);
        }

    };
    async AddTeacher(req, res) {

        try {
            // const doesExist = await TeacherModule.findOne({ email: req.body.email});
            // if (doesExist) return Utilities.apiResponse(res, 422, 'Teacher is already been registered');


              
          let teacherData = {
            name: req.body.name,
            dob: req.body.dob,
            gen: req.body.gen,
            Asignclass: req.body.Asignclass,
            Experties: req.body.Experties,
            Experience: req.body.Experience,
            subjects: req.body.subjects,
            ContactNo: req.body.ContactNo,
            Alternateno: req.body.Alternateno,
            Address: req.body.Address,
            Email: req.body.Email,
            Username: req.body.Username,
            Password: req.body.Password,
           
          };

            const newTeachermodel = new TeacherModule(teacherData);
            await newTeachermodel.save();

            let userData = {
                loginid: req.body.Username,
                pass: req.body.Password,
                role: 'Teacher',
                user_Id: newTeachermodel._id,
              };
              const NewUser = new getUsers(userData);
              await NewUser.save();

            Utilities.apiResponse(res, 200, 'Teacher Added  Successfully!');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    };

    async  getAllTeacher (req, res) {
        try {
           
            let getteacher = [];
            getteacher = await TeacherModule.find({});
            Utilities.apiResponse(res, 200, 'Get Users Successfully', getteacher);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async  getSingleTeacher (req, res) {

       const id= req.params.id;

        try {
          const  getSingleteacher = await TeacherModule.find({_id : id});
            Utilities.apiResponse(res, 200, 'Get Teacher Successfully', getSingleteacher);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async  getSingleTeacher2(req, res) {

       const id= req.body.id;
        console.log(id);
        try {
          const  getSingleteacher = await TeacherModule.find({_id : id});
            Utilities.apiResponse(res, 200, 'Get Teacher Successfully', getSingleteacher);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async updateTeacher(req, res) {
        try {
            await TeacherModule.findOneAndUpdate({ _id: req.params.id }, req.body);
            Utilities.apiResponse(res, 200, 'Teacher updated Successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async  deleteTeacher (req, res) {
        try {
            await TeacherModule.deleteOne({ _id: req.params.id });
            await getUsers.deleteOne({user_Id: req.params.id})
            Utilities.apiResponse(res, 200, 'teacher Deleted Successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
    
    
    
}
module.exports = new TeacherController();