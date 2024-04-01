const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });
const authcontroller = require('./controllers/AuthController');
const StudentController = require('./controllers/StudentController');
const TeacherController = require('./controllers/TeacherController');
const FeesController = require('./controllers/FeesController');
const FeesDataController = require('./controllers/feesdataController');
const feesdataController = require('./controllers/feesdataController');
const LoginController = require('./controllers/LoginController')
const MarkControler = require('./controllers/MarkController')
const mailController = require('./controllers/mail')
const AdminController = require("./controllers/AdminController");
const AttendenceController = require('./controllers/AttendenceController');

/**
 * APIs V1 Routes
 */



Route.route('/')
    // .post(LoginController.AuthData)
    .post(authcontroller.login);



Route.route('/admin')
    .get(authcontroller.Auth, StudentController.getTotalCount)
    .post(authcontroller.Auth, FeesDataController.AddFees)
    // .get(StudentController.gatAllstudentdata)
    .put(authcontroller.Auth, FeesController.setFees);

Route.route('/admin/mail')

    .get(mailController.sendMailData);

Route.route('/admin/classes')
    .get(FeesController.getFeesDetails);

Route.route('/admin/teacherCount')
    .get(authcontroller.Auth, TeacherController.countTeacher);

Route.route('/admin/feescount')
    .get(authcontroller.Auth, StudentController.totalFeesPaid);

Route.route('/admin/profile/:id?')
    .get(authcontroller.Auth, AdminController.getAdminData);

Route.route('/admin/profile/edit/:id?')
    .put(authcontroller.Auth, AdminController.updateData);




Route.route('/admin/student/admission')
    .post(authcontroller.Auth, StudentController.AddStudent)
    .get(authcontroller.Auth, FeesController.getFeesDetails);

Route.route('/admin/teacher/admission')
    .post(authcontroller.Auth, TeacherController.AddTeacher);

Route.route('/admin/classes/std/edit/:id?')
    .get(authcontroller.Auth, StudentController.studentdata2);

Route.route('/admin/classes/std/edit/:id?')
    .put(authcontroller.Auth, StudentController.updateStudent);

Route.route('/admin/classes/std/:id?')
    .delete(authcontroller.Auth, StudentController.deleteStudent);


Route.route('/admin/teacher')
    .get(authcontroller.Auth, TeacherController.getAllTeacher);

Route.route('/admin/teacher/view/:id')
    .get(authcontroller.Auth, TeacherController.getSingleTeacher);

Route.route('/admin/teacher/view/edit/:id')
    .get(authcontroller.Auth, TeacherController.getSingleTeacher)
    .put(authcontroller.Auth, TeacherController.updateTeacher);

Route.route('/admin/teacher/:id?')
    .delete(authcontroller.Auth, TeacherController.deleteTeacher);

Route.route('/admin/classes/std/:std?')
    .get(authcontroller.Auth, StudentController.studentdata);

Route.route('/admin/student')
    .get(authcontroller.Auth, StudentController.gatAllstudentdata);


Route.route('/admin/feesdetails')
    .get(authcontroller.Auth, StudentController.gatAllstudentdata);

Route.route('/admin/feesdetails/history/:id')
    .get(authcontroller.Auth, feesdataController.getFeesHistory)
    .post(authcontroller.Auth, feesdataController.sendMessage);

Route.route('/admin/recipt')
    .get(authcontroller.Auth, feesdataController.getReciptdata);

Route.route('/admin/std/sendmsg')
    .post(authcontroller.Auth, FeesController.setMessage);

    Route.route('/admin/cancel')
    .post(StudentController.getCancle);

Route.route('/admin/student/view/:id')
    .get(authcontroller.Auth, StudentController.getSinglestudetnData);

    Route.route('/admin/chageyear')
    .post(authcontroller.Auth, );

Route.route('/teacher/exams')
    .post(authcontroller.Auth, StudentController.studentdataForMarks);

// Route.route('/teacher/exams2')
// .post(StudentController.studentdataForMarks);

// student dashboard route start
Route.route('/getstd')
    .post(FeesController.getStdDetails)

Route.route('/student/:id')
    .get(authcontroller.Auth, StudentController.getSinglestudetnData);

Route.route('/student/feesdetails/:id')
    .get(authcontroller.Auth, feesdataController.getFeesHistory);

Route.route('/student/Assessment/:id')
    .post(authcontroller.Auth, MarkControler.getMarkData);

Route.route('/student/messages')
    .post(authcontroller.Auth, StudentController.getSinglestudetnDataForMessage);

    Route.route('/student/attendence')
    .post(authcontroller.Auth, AttendenceController.getSingleStudentAttendance);

    Route.route('/student/getuploadFIle')
    .post(authcontroller.Auth, TeacherController.getuploadFileForStudent);

    Route.route('/teacher/attendence/view')
    .post(authcontroller.Auth, AttendenceController.getAllStudentAttendance);

    Route.route('/teacher/attendence/view/date')
    .post(authcontroller.Auth, AttendenceController.getAttendanceDate);

Route.route('/teacher/exams')
    .post(authcontroller.Auth, StudentController.studentdataForMarks);

Route.route('/teacher/exams/sub')
    .post(authcontroller.Auth, TeacherController.getSingleTeacher2);

Route.route('/teacher/uploadefile')
    .post(authcontroller.Auth, TeacherController.uploadFIle);

    Route.route('/teacher/getuploadFIle')
    .post(authcontroller.Auth, TeacherController.getuploadFIle);

    Route.route('/teacher/deletefile')
    .post(authcontroller.Auth, TeacherController.deleteFile);

Route.route('/teacher/exams/updatemark')
    .post(authcontroller.Auth, MarkControler.AddMarks);


Route.route('/teacher/viewmark')
    .post(MarkControler.getAllMarkData);

Route.route('/teacher/viewmark/student')
    .post(StudentController.getStudentDataForMark);

Route.route('/teacher/attendence')
    .post(AttendenceController.AddAttendance);
//Teacher Dashboard route start
Route.route('/teacher/:id')
    .get(authcontroller.Auth, TeacherController.getSingleTeacher);


//study material uploading


module.exports = Route;
