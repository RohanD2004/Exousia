// import React from 'react'
// import { Box } from '@mui/material'
// import Sidebar from './TeacherSidebar.tsx'

// export default function Exams() {
//   return (
//     <Box sx={{ display: 'flex' }} >
//     <Sidebar/>
// <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

//   </Box>
//   </Box>
//   )
// }
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { GetStudentStd, updateMark } from '../service/api';
import { React, useEffect, useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Sidebar from './TeacherSidebar.tsx'
import Header from "../components/header.js";
import '../components/css/Exam.css'
import { GetFees, viewTeacher2, getStandards } from "../service/api"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
export default function Exams() {
  const { id } = useParams();

  const [subject, setSubject] = useState('');
  const [Standard, setStandard] = useState('');
  const [feesstd, setfeesStd] = useState([])
  const [student, setStudent] = useState([]);
  const [student2, setStudent2] = useState([]);
  const [std, setStd] = useState([]);
  const [Sub, setSub] = useState([]);
  const [assign_class, setassignclass] = useState([]);
  const temp = localStorage.getItem('user_id')
  const result = Number(temp);


  const [date, setDate] = useState([]);


  const handleChange = (event) => {
    setSubject(event.target.value);
    setDate({ ...date, [event.target.name]: event.target.value })
  };

  const handleChange2 = (event) => {
    setStandard(event.target.value);
    const data = event.target.value;
    setStudent({ ...student, [event.target.name]: event.target.value })
    setDate({ ...date, [event.target.name]: event.target.value })
    getAllStudent({ std_id: data });
    console.log("Mark : ", date.TotalMark)
  };

  const getAllStudent = async (data) => {
    let response = await GetStudentStd(data);
    setStudent2(response?.data.data);
  }

  const fees = async () => {
    try {



    } catch (error) {
      Swal.fire({
        title: 'Error !',
        text: error,
        icon: 'error',
      });
    }
  }
  var dataarray=[];
  const handleMarkSubmit = (event, id,index) => {
    setDate({ ...date, [event.target.name]: event.target.value, ["stuId"]: id })
  };

  const [markSuccess, setMarkSuccess] = useState(false)
  const [updatedStudentId, setUpdatedStudentId] = useState(null);

  const AddMark = async () => {

    console.log(date);
    if (parseInt(date.score) == 0 || date.score == '') {
      Swal.fire({
        title: 'Error !',
        text: "Mark should not be zero",
        icon: 'error',
      });
      setMarkSuccess(false);
    }
    else {
      try {
        let response = await updateMark(date);
      
        if (response?.status === 200) {
          console.log(response);
          setMarkSuccess(true);
          setUpdatedStudentId(date.stuId); // Set the ID of the updated student
          setTimeout(() => {
            setMarkSuccess(false);
            // Reset the updated student ID after 2 seconds
          }, 2000);
        } else if (response.response.data.status === 400) {
          // Display a message indicating that the mark already exists
          console.log(response.response.data.message);
          Swal.fire({
            title: 'Error !',
            text: response.response.data.message.toString(),
            icon: 'error',
          });
        } else {
          // Display a generic error message
          console.error("Failed to update mark");
        }
      } catch (error) {
        // Display a generic error message
        console.error("Failed to update mark");
      }
      
    }

  }

  const getTeacherData = async () => {
    try {
      const response = await viewTeacher2(result);
      if (response.status === 200) {
        const teacherData = response.data.data[0];
        setSub(teacherData); // Set the teacher's data in 'Sub' state
        const stdids = response?.data.data[0].Asignclass;
        const response2 = await getStandards(stdids);
        setassignclass(response2?.data)

        console.log(response2?.data);
        let list = [];
        if (response2?.data && response2?.data) {
          list = response2?.data.map((item) => {
            return {
              key: item._id,
              text: item.std,
              value: item._id,
            };
          });

        }
        console.log(response2?.data)
        console.log(list)
        
        setfeesStd(list);
      }
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };
  const [max_mark, setMaxMark] = useState('');

  const submitData=()=>{
    console.log(dataarray);
  }
  useEffect(() => {

    getTeacherData();
    fees();
  }, [result])


  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Header title="Exams" />
        </Box>

        <div className='mt-4 p-2 container-fluid shadow'>
          <div className='row px-5'>
            <div className='col-lg-2 mb-2'>
              <Typography
                className='mt-2'
                variant="h4"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Fill Marks
              </Typography>
            </div>
            <div className='col-lg-2 mb-2'>
              <TextField variant='outlined' name="testName" focused label='Test' placeholder='Enter test name'
                onChange={(event) => {
                  const testName = event.target.value;

                  setDate({ ...date, [event.target.name]: testName });

                }}
              ></TextField>
            </div>
            <div className='col-lg-2 mb-2'>
              <FormControl fullWidth>
                {/* <FormHelperText >Date of Birth</FormHelperText> */}
                <TextField focused type='date' label='Date' name='date' variant='outlined'
                maxDate={new Date()}
                InputProps={{
                  inputProps: {
                    max: new Date().toISOString().split("T")[0],
                  },
                  }}
                  onChange={(event) => setDate({ ...date, [event.target.name]: event.target.value })}
                />
              </FormControl>
            </div>
            <div className='col-lg-2 mb-2'>
              <TextField variant='outlined' label='Total marks' name='TotalMark' focused
                onChange={(event) => {
                  const mark = event.target.value;

                  if (mark < 0) {
                    Swal.fire({
                      title: 'Error !',
                      text: "Invalid mark",
                      icon: 'error',
                    }).then((res) => {

                      if (res.isConfirmed) {
                        event.target.value = ''
                      }
                      else {

                      }
                    });
                  }
                  else {
                    setDate({ ...date, [event.target.name]: mark });
                    setMaxMark(event.target.value);
                  }


                }}
              />
            </div>
            <div className='col-lg-2 mb-2'>
              <FormControl fullWidth focused>
                <InputLabel id="select-label" >Subject</InputLabel>
                <Select
                  labelId="select-label"
                  id="select-subject"
                  name='sub'
                  value={subject}
                  label="Subject"
                  onChange={handleChange}
                >
                  {Sub && Sub.subjects && Sub.subjects.map((sub, index) => (
                    <MenuItem key={index} value={sub}>{sub}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className='col-lg-2 mb-2'>
              <FormControl fullWidth focused>
                <InputLabel id="select-label" >Standard</InputLabel>
                <Select
                  labelId="select-label"
                  name='std'
                  id="select-std"
                  value={Standard}
                  label="Standard"
                  onChange={handleChange2}
                >
                  {feesstd.map((user) => (

                    <MenuItem value={user.value}>{user.text}</MenuItem>

                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='container mt-4'>
          {/* {markSuccess && (
            <p className='alert alert-success' role='alert'>
              Mark updated successfully!
            </p>
          )} */}
          <table className='table table-responsive'>
            <thead className='table-dark'>
              <tr>
                <th>Name</th>
                <th className='ms-5 w-25'>Marks</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>

              {
                student2.map((user,index) => {
                  return (
                    <>
                      <tr>
                        <td>
                          {user.name}
                          {updatedStudentId === user._id && (
                            <CheckCircleIcon sx={{ color: 'green', ml: 1 }} />
                          )}
                        </td>
                        <td>
                          <input type='number'
                          className='form-control'
                          id='marks-input' name='score' required='true'
                           defaultValue={0}

                            onChange={(event) => {
                              const mark = event.target.value;
                              if (parseInt(mark) > parseInt(max_mark) || parseInt(mark) < 0) {
                                Swal.fire({
                                  title: 'Error !',
                                  text: "Enter mark should be less than total mark",
                                  icon: 'error',
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    event.target.value = ''
                                  }
                                });

                              }
                              else {

                                handleMarkSubmit(event, user._id)
                              }
                              const className = `form-control ${parseInt(event.target.value) < (parseInt(max_mark))/2 || parseInt(event.target.value) == 0 ? 'is-invalid' : ''}`;
                              event.target.className = className;
                            }}

                          />
                          </td>
                        <td ><button type='button' className='btn btn-warning' onClick={() => AddMark()} >Submit</button></td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </Box>
    </Box >
  )
}