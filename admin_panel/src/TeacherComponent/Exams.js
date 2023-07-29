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
import { React, useEffect, useState } from 'react'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Sidebar from './TeacherSidebar.tsx'
import Header from "../components/header.js";
import '../components/css/Exam.css'
import { GetFees, viewTeacher2 } from "../service/api"
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
  };

  const getAllStudent = async (data) => {
    let response = await GetStudentStd(data);
    setStudent2(response?.data.data);
  }

  const fees = async () => {
    try {
      const response = await GetFees();
      if (response.status === 200) {
        let list = response?.data;
        if (list && list.length) {
          list = list.map((item) => {
            return {
              key: item._id,
              text: item.std,
              value: item._id,
            };
          });
        }
        setfeesStd(list);
      } else setfeesStd([]);
    } catch (error) {
      Swal.fire({
        title: 'Error !',
        text: error,
        icon: 'error',
      });
    }

  }
  const handleMarkSubmit = (event, id) => {
    setDate({ ...date, [event.target.name]: event.target.value, ["stuId"]: id })

  };

  const [markSuccess, setMarkSuccess] = useState(false)
  const [updatedStudentId, setUpdatedStudentId] = useState(null);


  const AddMark = async () => {
    try {

      let response = await updateMark(date);
      if (response?.status === 200) {
        setMarkSuccess(true);
        setUpdatedStudentId(date.stuId); // Set the ID of the updated student
        setTimeout(() => {
          setMarkSuccess(false);
           // Reset the updated student ID after 2 seconds
        }, 2000);
      }

    } catch (error) {

    }
  }

  const getTeacherData = async () => {
    try {
      const response = await viewTeacher2(result);
      if (response.status === 200) {
        const teacherData = response.data.data[0];
        setSub(teacherData); // Set the teacher's data in 'Sub' state
      }
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };

  useEffect(() => {
    fees();
    getTeacherData();
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
                onChange={(event) => setDate({ ...date, [event.target.name]: event.target.value })}
              ></TextField>
            </div>
            <div className='col-lg-2 mb-2'>
              <FormControl fullWidth>
                {/* <FormHelperText >Date of Birth</FormHelperText> */}
                <TextField focused type='date' label='Date' name='date' variant='outlined'
                  onChange={(event) => setDate({ ...date, [event.target.name]: event.target.value })}
                />
              </FormControl>
            </div>
            <div className='col-lg-2 mb-2'>
              <TextField variant='outlined' label='Total marks' name='TotalMark' focused
                onChange={(event) => setDate({ ...date, [event.target.name]: event.target.value })}
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
                  {
                    Sub?.subjects && <MenuItem value={Sub?.subjects}>{Sub.subjects}</MenuItem>
                  }

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
          {markSuccess && (
            <p className='alert alert-success' role='alert'>
              Mark updated successfully!
            </p>
          )}
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
                student2.map((user) => {
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
                          <input type='number' id='marks-input' name='score' className='form-control'

                            onChange={(event) => handleMarkSubmit(event, user._id)} /></td>
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