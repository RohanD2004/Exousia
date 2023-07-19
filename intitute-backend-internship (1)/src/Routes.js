const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();

 const authcontroller=require('./controllers/AuthController');
const StudentController = require('./controllers/StudentController');
const TeacherController = require('./controllers/TeacherController');
const FeesController = require('./controllers/FeesController');
const FeesDataController= require('./controllers/feesdataController');
const feesdataController = require('./controllers/feesdataController');
const LoginController = require('./controllers/LoginController')
const MarkControler  = require('./controllers/MarkController')

/**
 * APIs V1 Routes
 */




Route.route('/admin')
    .get(authcontroller.Auth,StudentController.getTotalCount)
    .post(authcontroller.Auth,authcontroller.Auth,FeesDataController.AddFees)
    // .get(StudentController.gatAllstudentdata)
    .put(authcontroller.Auth,authcontroller.Auth,FeesController.setFees);

    Route.route('/admin/classes')
    .get(authcontroller.Auth,authcontroller.Auth,FeesController.getFeesDetails);

    Route.route('/')
    .post(LoginController.AuthData)


Route.route('/admin/student/admission')
.post(authcontroller.Auth,StudentController.AddStudent)
.get(authcontroller.Auth,FeesController.getFeesDetails);

Route.route('/admin/teacher/admission')
.post(authcontroller.Auth,TeacherController.AddTeacher);

    Route.route('/admin/classes/std/edit/:id?')
    .get(authcontroller.Auth,StudentController.studentdata2);

    Route.route('/admin/classes/std/edit/:id?')
    .put(authcontroller.Auth,StudentController.updateStudent);

    Route.route('/admin/classes/std/:id?')
    .delete(authcontroller.Auth,StudentController.deleteStudent);


Route.route('/admin/teacher')
    .get(authcontroller.Auth,TeacherController.getAllTeacher);

Route.route('/admin/teacher/view/:id')
    .get(authcontroller.Auth,TeacherController.getSingleTeacher);

Route.route('/admin/teacher/view/edit/:id')
    .get(authcontroller.Auth,TeacherController.getSingleTeacher)
    .put(authcontroller.Auth,TeacherController.updateTeacher);

Route.route('/admin/teacher/:id?')
    .delete(authcontroller.Auth,TeacherController.deleteTeacher);

Route.route('/admin/classes/std/:std?')
    .get(authcontroller.Auth,StudentController.studentdata);

Route.route('/admin/student')
    .get(authcontroller.Auth,StudentController.gatAllstudentdata);


    Route.route('/admin/feesdetails')
    .get(authcontroller.Auth,StudentController.gatAllstudentdata);

    Route.route('/admin/feesdetails/history/:id')
    .get(authcontroller.Auth,feesdataController.getFeesHistory)
    .post(authcontroller.Auth,feesdataController.sendMessage);

    Route.route('/admin/recipt')
    .get(authcontroller.Auth,feesdataController.getReciptdata);

    Route.route('/admin/student/view/:id')
    .get(authcontroller.Auth,StudentController.getSinglestudetnData);
    
    Route.route('/teacher/exams')
    .post(StudentController.studentdataForMarks);

    // Route.route('/teacher/exams2')
    // .post(StudentController.studentdataForMarks);
    
    // student dashboard route start
    
    Route.route('/student/:id')
    .get(StudentController.getSinglestudetnData);
    
    Route.route('/student/feesdetails/:id')
    .get(authcontroller.Auth, feesdataController.getFeesHistory);

    Route.route('/student/Assessment/:id')
    .post( MarkControler.getMarkData);
    

    Route.route('/teacher/exams')
    .post( authcontroller.Auth,StudentController.studentdataForMarks);

    Route.route('/teacher/exams/updatemark')
    .post(authcontroller.Auth,MarkControler.AddMarks);
    
    //Teacher Dashboard route start
    Route.route('/teacher/:id')
    .get(authcontroller.Auth, TeacherController.getSingleTeacher);



    
module.exports = Route;
