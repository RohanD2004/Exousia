import * as React from 'react';
import 'bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import Admission from './components/admission.js';
import Classes from "./components/classes.js"
import Student from "./components/student.js"
import Teacher from './components/teacher.js';
import Std from "./components/std"
import UpdatStudent from "./components/updateStudent"
import UpdateTeacher from "./components/teacher_update"
import SudentAdmission from "./components/student_admission"
import TeacherAdmission from "./components/teacher_admission"
import TeacherProfile from "./components/teacherProfile"
import StudentProfile from "./components/studentprofile"
import Feeshistory from './components/feeshistory';
import Feesdetails from './components/feesdetails';
import Recipt from "./components/recipt"
import Login from './components/Login';
import SHome from './StudentComponents/Home'
import StudyMaterial from './StudentComponents/studyMaterial';
import TimeTable from './StudentComponents/Timetable';
import Feesdata from './StudentComponents/Fees';
import Assesment from './StudentComponents/Assesment';
import TeacherHome from "./TeacherComponent/TeacherHome"
import Exams from './TeacherComponent/Exams';
import Uploadmaterial from './TeacherComponent/uploadmaterial';
import TeacherTimeTable from "./TeacherComponent/TeacherTimetable"
import AdminProfile from './components/AdminProfile';
import AdminEdit   from "./components/AdminEdit";
import Message from './StudentComponents/Message';
import Cancle from './components/cancle.js';
import Viewmark from './TeacherComponent/viewmark.js'
import Attendence from './TeacherComponent/Attendence.js';
import StudentAttendence from './StudentComponents/StudentAttendence.js'
import ViewAttendence from './TeacherComponent/ViewAttendence.js'
import AttendanceHistory from './TeacherComponent/AttendanceHistory.js'
export default function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />}  ></Route>
          <Route path="admin" exact element={<Home />}  ></Route>
          <Route path="/admin/profile/:id?" exact element={<AdminProfile />}  ></Route>
          <Route path="/admin/profile/edit/:id?" exact element={<AdminEdit />}  ></Route>
          <Route path="admin/student" element={<Student />}></Route>
          <Route path="/admin/student/view/:id?" element={<StudentProfile />}></Route>
          <Route path="admin/teacher" element={<Teacher />}>  </Route>
          <Route path="admin/classes" element={<Classes />}>  </Route>
          <Route path="admin/admission" element={<Admission />}>  </Route>
          <Route path="admin/classes/std/:std?" element={<Std />}> </Route>
          <Route path="admin/classes/std/edit/:id?" element={<UpdatStudent />}>  </Route>
          <Route path="admin/teacher/view/edit/:id?" element={<UpdateTeacher />}>  </Route>
          <Route path="admin/student/admission" element={<SudentAdmission />}>  </Route>
          <Route path="admin/teacher/admission" element={<TeacherAdmission />}>  </Route>
          <Route path="admin/teacher/view/:id?" element={<TeacherProfile />}>  </Route>
          <Route path="admin/feesdetails" element={<Feeshistory />}>  </Route>
          <Route path="admin/feesdetails/history/:id?" element={<Feesdetails />}></Route>
          <Route path="/admin/recipt" element={<Recipt />}> </Route>
          <Route path="/admin/cancle" element={<Cancle />}> </Route>

          <Route path="/login" element={<Recipt />}> </Route>
          


          {/* student route start */}
          <Route path="student/:id?" element={<SHome />}> </Route>
          <Route path="/student/StudyMaterial" element={<StudyMaterial />}> </Route>
          <Route path="/student/Timetable" element={<TimeTable />}> </Route>
          <Route path="/student/feesdetails/:id?" element={<Feesdata />}> </Route>
          <Route path="/student/Assessment/:id?" element={<Assesment />}> </Route>
          <Route path="/student/messages" element={< Message/>}> </Route>
          <Route path="/student/attendence" element={< StudentAttendence/>}> </Route>

          {/* Teacher dashboard route start */}
          <Route path="/teacher/:id?" element={<TeacherHome />}> </Route>
          <Route path="/teacher/exams" element={<Exams />}> </Route>
          <Route path="/teacher/viewmark" element={<Viewmark />}> </Route>

          <Route path="/teacher/uploadmaterial" element={<Uploadmaterial />}> </Route>
          <Route path="/teacher/Timetable" element={<TeacherTimeTable />}> </Route>
          <Route path="/teacher/attendence" element={<Attendence/>}> </Route>
          <Route path="/teacher/attendence/view" element={<ViewAttendence/>}> </Route>
          <Route exact path="/teacher/attendence/view/student/:id?" element={<AttendanceHistory/>}> </Route>





        </Routes>
      </BrowserRouter>

    </>
  );
}

