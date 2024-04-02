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
import { GetFees, viewTeacher2, getStandards, FillAttendence } from "../service/api"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import Toggle from 'react-toggle';
export default function Attendence() {
    const { id } = useParams();
    var dataArray = []
    const [date, setDate] = useState('');
    const [Standard, setStandard] = useState('');
    const [feesstd, setfeesStd] = useState([])
    const [student, setStudent] = useState([]);
    const [student2, setStudent2] = useState([]);
    const [std, setStd] = useState([]);
    const [Sub, setSub] = useState([]);
    const [assign_class, setassignclass] = useState([]);
    const temp = localStorage.getItem('user_id')
    const result = Number(temp);
    const [isFirstDateSelected, setIsFirstDateSelected] = useState(false);

    const [data, setData] = useState([]);

    const handleChange2 = (event) => {
        setStandard(event.target.value);
        const data = event.target.value;
        setStudent({ ...student, [event.target.name]: event.target.value })
        setData({ ...data, [event.target.name]: event.target.value })
        getAllStudent({ std_id: data });

    };

    const getAllStudent = async (data) => {
        let response = await GetStudentStd(data);
        setStudent2(response?.data.data);
    }

    const [updatedStudentId, setUpdatedStudentId] = useState(null);



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
    const [presentChecked, setpresentChecked] = useState(false);



    useEffect(() => {

        getTeacherData();

    }, [result])


    const updateAttendence = async (event, id, index, std_id) => {

        if (event.target.checked) {
            dataArray[index] = {
                stuId: id,
                teacher_id: Sub._id,
                std: std_id,
                attend: document.getElementById('flexRadioDefault1').checked == true ? 1 : 0,
                date: date
            };
        }
        else if (!event.target.checked) {
            if (dataArray[index].attend == 1) {

                dataArray[index] = {
                    stuId: id,
                    teacher_id: Sub._id,
                    std: std_id,
                    attend: 0,
                    date: date
                };
            } else if (dataArray[index].attend == 0) {
                dataArray[index] = {
                    stuId: id,
                    teacher_id: Sub._id,
                    std: std_id,
                    attend: 1,
                    date: date
                };
            }
        }


        console.log(dataArray);

    }

    const presentUpdate = async (event) => {

        if (event.target.checked) {
            student2.map((user, index) => {
                dataArray[index] = {
                    stuId: user._id,
                    teacher_id: Sub._id,
                    std: user.std_id,
                    attend: 0,
                    date: date
                };
            }
            )

        } else {
            dataArray = []
        }
        console.log(dataArray);
    }

    const absenttUpdate = async (event) => {
        if (event.target.checked) {
            student2.map((user, index) => {
                dataArray[index] = {
                    stuId: user._id,
                    teacher_id: Sub._id,
                    std: user.std_id,
                    attend: 1,
                    date: date
                };
            })

        } else {
            dataArray = []
        }
        console.log(dataArray);
    }

    const function_date=(event)=>{
        setDate(event.target.value)
        setIsFirstDateSelected(true);
    }

    const submitData = async () => {
        console.log(dataArray);
        console.log(student2.length);

        // if (dataArray.length == student2.length) {
        //     let response = await FillAttendence(dataArray);
        //     console.log(response);
        //     if (response.status == 200) {
        //         Swal.fire({
        //             title: "Success",
        //             text: response.data.message,
        //             icon: "success",
        //             confirmButtonText: "OK",
        //         }).then((result) => {
        //             if (result.isConfirmed) {
        //                 window.location.reload();
        //             }
        //         });
        //     }
        //     else if (response.response.data.status === 400) {
        //         // Display a message indicating that the mark already exists
        //         console.log(response.response.data.message);
        //         Swal.fire({
        //             title: 'Error !',
        //             text: response.response.data.message.toString(),
        //             icon: 'error',
        //         });
        //     }
        // }
        // else {
        //     Swal.fire({
        //         title: 'Error !',
        //         text: 'Please select the category  first , either "Present" or "Absent" !!',
        //         icon: 'error',
        //     });
        // }

    }
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Header title="Attendance" />
                </Box>

                <div className='mt-4 p-2 container-fluid shadow'>
                    <div className='row px-5'>
                        <div className='col-lg-3 mb-2'>
                            <Typography
                                className='mt-2'
                                variant="h4"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                Fill Attendance
                            </Typography>
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
                                    onChange={(event) => function_date(event)}
                                />
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
                                    disabled={!isFirstDateSelected}
                                >
                                    {feesstd.map((user) => (

                                        <MenuItem value={user.value}>{user.text}</MenuItem>

                                    ))}
                                </Select>
                                {
                                    !isFirstDateSelected? <p>Select date first</p>:<p></p>
                                }
                            </FormControl>
                        </div>
                        <div className='col-lg-2 mb-2 mt-3'>
                            <div className="form-check">
                                <input class="form-check-input" type="radio" checked name="attendance" id="flexRadioDefault1" onChange={(e) => presentUpdate(e)} />
                                <label class="form-check-label" for="flexRadioDefault1">Present</label>
                            </div>
                        </div>
                        <div className='col-lg-2 mb-2 mt-3'>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="attendance" id="flexRadioDefault2" onChange={(e) => absenttUpdate(e)} />
                                <label class="form-check-label" for="flexRadioDefault2">Absent</label>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='container mt-4'>
                    <table className='table table-responsive'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Name</th>
                                <th className='ms-5 w-25'>Present</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                student2.map((user, index) => {
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
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(event) => updateAttendence(event, user._id, index, user.std_id)} />
                                                        <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                                    </div>
                                                </td>

                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                        <div>
                            <button onClick={() => submitData()}className=' btn btn-primary mt-2' >Submit</button>
                        </div>
                    </table>
                </div>
            </Box>
        </Box >
    )
}