import { React, useState, useEffect } from 'react'
import '../components/css/student_prof.css'
import { Link } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, AppBar, Toolbar, Typography, Button, Icon } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/header";
import moment from 'moment'

import { getTeacherProfile } from "../service/api"

export default function Teacher() {
  const navigate = useNavigate();
  const temp = localStorage.getItem('token');

  const [teacher, setTeacher] = useState([]);

  const { id } = useParams();

  useEffect(() => {

    getSingleTeacher();

  }, [])

  const getSingleTeacher = async () => {
    const response = await getTeacherProfile(id);
    setTeacher(response?.data.data);

  }
  useEffect(() => {
    console.log(temp);
    if (temp === null) {
      navigate('/');
    }
  }, [temp])

//   if (!teacher || teacher.length === 0) {
//     return <div>Loading...</div>; // You can show a loading message or spinner
//   }
  return (
    <Box sx={{ display: 'flex' }} >
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Box>
          <Header title="Home" />
        </Box>
        <div class="container-xl px-3 mt-4">

          {
            teacher.map((teacherdata) => {

              return (

                <div class="row">
                  <div class="col-xl-4">
                    {/* <!-- Profile picture card--> */}
                    <div class="card mb-4 mb-xl-0">
                      <div class="card-header">Profile</div>
                      <div class="card-body text-center">
                        {/* <!-- Profile picture image--> */}
                        <AccountCircleSharpIcon class="img-account-profile rounded-circle mb-2" />
                        {/* <!-- Profile picture help block--> */}
                        <div class="large font-italic mb-2"><b>{teacherdata.name}</b></div>



                        <div class="large font-italic mb-4"  >Assigned To:
                          {teacherdata.Asignclass &&
                            teacherdata.Asignclass.map((Asign, index) => (
                              <span key={index}>{Asign} , </span>
                            ))}
                        </div>

                        <div class="large font-italic mb-4">Subjects: {teacherdata.subjects}</div>
                        <div class="large font-italic mb-4">Admitted On : {moment(teacherdata.createdAt).format('MMMM Do, YYYY')}</div>
                      </div>
                    </div>
                    <div className='mt-3 mb-3 d-flex justify-content-center'>
                      <Button className='btn bg-primary text-white w-50' component={Link} to={`/admin/teacher/view/edit/${teacherdata._id}`} >
                        EDIT
                      </Button>
                    </div>
                  </div>
                  <div class="col-xl-8">
                    {/* <!-- Account details card--> */}
                    <div class="card mb-4">
                      <div class="card-header">Account Details</div>
                      <div class="card-body">
                        <form>
                          {/* <!-- Form Group (name)--> */}
                          <div class="mb-3">
                            <label class="small mb-1" for="inputUsername">Name</label>
                            <input class="form-control" id="inputUsername" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.name} type="text" readOnly />
                          </div>
                          {/* <!-- Form Row--> */}
                          <div class="row gx-3 mb-3">
                            {/* <!-- Form Group (DOB)--> */}
                            <div class="col-md-6">
                              <label class="small mb-1" for="DOB">Date of Birth</label>
                              <input class="form-control" id="DOB" type="text" readOnly style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.dob} readonly />
                            </div>
                            {/* <!-- Form Group (gender)--> */}
                            <div class="col-md-6">
                              <label class="small mb-1" for="gender">Gender</label>
                              <input class="form-control" id="gender" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.gen} type="text" readOnly />
                            </div>
                          </div>
                          {/* <!-- Form Row        --> */}
                          <div class="row gx-3 mb-3">
                            {/* <!-- Form Group (contactno)--> */}
                            <div class="col-md-6">
                              <label class="small mb-1" for="contactno">Contact No</label>
                              <input class="form-control" id="contactno" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.ContactNo} type="text" readOnly />
                            </div>
                            {/* <!-- Form Group (alternateno)--> */}
                            <div class="col-md-6">
                              <label class="small mb-1" for="alternateno">Alternate No</label>
                              <input class="form-control" id="alternateno" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Alternateno} type="text" readOnly />
                            </div>
                          </div>
                          {/* <!-- Form Group (address)--> */}
                          <div class="mb-3">
                            <label class="small mb-1" for="Address">Address</label>
                            <input class="form-control" id="Address" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Address} type="text" readOnly />
                          </div>
                          {/* <!-- Form Group (email)--> */}
                          <div class="mb-3">
                            <label class="small mb-1" for="Email">Email</label>
                            <input class="form-control" id="Email" style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Email} type="text" readOnly />
                          </div>
                          {/* <!-- Form Row--> */}
                          <div class="row gx-3 mb-3">
                            {/* <!-- Form Group (Experties)--> */}
                            <div class="col-md-6">
                              <label class="small mb-1" for="Experties">Experties</label>
                              <input class="form-control" id="Experties" readOnly style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Experties} type="text" readonly />
                            </div>
                            {/* <!-- Form Group (Experience)--> */}
                            <div class="col-md-6">
                              <label class="small mb-1" for="Experience">Experience</label>
                              <input class="form-control" id="Experience" readOnly style={{ fontWeight: 'bold', cursor: 'pointer' }} value={teacherdata.Experience} type="text" readonly />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </Box>
    </Box>
  )
}