const mongoose = require('mongoose');
const Utilities = require('../Utilities');
const TeacherModule = require('../models/Teacher')
const getUsers= require('../models/getUser')
const StudyMaterailModel= require('../models/studymaterial')
class TeacherController
{


    async countTeacher(req,res){

        try {
            const totalTeacher = await TeacherModule.countDocuments({})
            Utilities.apiResponse(res, 200, 'Teacher Count  Successfully!',totalTeacher);
        } catch (error) {
            Utilities.apiResponse(res,500,error);
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

    async sendMailData(req, res) {

        try
        {
          console.log("Hello from send sms")
  
          const response= await fast2Sms.sendMessage({authorization: process.env.FAST_2_SMS_KEY, message:"Hello from Exousia", number:"8530458123"})
          
          Utilities.apiResponse(res, 200, 'Mail send Successfully',response);
          
        }
            
       catch (error) {
        Utilities.apiResponse(res, 500, error);
      }
      };

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
            await getUsers.deleteOne({user_Id: req.params.id});
            Utilities.apiResponse(res, 200, 'teacher Deleted Successfully');
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
    
    async uploadFIle(req, res) {
      console.log(req.body);

      try {
       const study= new StudyMaterailModel(req.body);
       await study.save();
        Utilities.apiResponse(res, 200, 'File uploaded successful');
    } catch (error) {
        Utilities.apiResponse(res, 500, error);
    }
    }
  
    async getuploadFIle(req, res) {
        console.log(req.body);
        try {
            const data = await StudyMaterailModel.find({ teacher_name: req.body.name });
            Utilities.apiResponse(res, 200, 'File uploaded successful',data);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }

    async getuploadFileForStudent(req, res) {
        console.log(req.body);
        try {
            const data = await StudyMaterailModel.find({ std: req.body.std_id });
            Utilities.apiResponse(res, 200, 'File get  successful',data);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
    
    async deleteFile(req, res) {
        console.log(req.body);
        try {
            const data = await StudyMaterailModel.deleteOne({ _id: req.body.id });
            Utilities.apiResponse(res, 200, 'File deleted successful',data);
        } catch (error) {
            Utilities.apiResponse(res, 500, error);
        }
    }
    
    
}
module.exports = new TeacherController();