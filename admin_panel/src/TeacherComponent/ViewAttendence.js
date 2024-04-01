
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { GetStudentStd, updateMark } from '../service/api';
import { React, useEffect, useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Sidebar from './TeacherSidebar.tsx'
import Header from "../components/header.js";
import '../components/css/Exam.css'
import { GetFees, viewTeacher2, getStandards, getAllAttendence, getSortedAttandence } from "../service/api"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import Toggle from 'react-toggle';
import { IconButton, Button } from "@mui/material";
import { AiFillEye } from 'react-icons/ai';
import { Link, Route, Routes, useNavigate } from "react-router-dom";

export default function ViewAttendence() {
    const { id } = useParams();
    var dataArray = []
    const [date, setDate] = useState('');
    const [Standard, setStandard] = useState('');
    const [stdcat, setStdCat] = useState(false);
    const [dateCat, setDateCat] = useState(false);
    const [attendedLectures, setAttendedLectures] = useState([]);
    const [sortedarray, setSortedArray] = useState([]);

    const [feesstd, setfeesStd] = useState([])
    const [student, setStudent] = useState([]);
    const [Attendence, setAttendance] = useState([]);

    const temp = localStorage.getItem('user_id')
    const result = Number(temp);
    var arr = [];
    const [data, setData] = useState([]);

    const handleChange2 = async (event) => {
        setStandard(event.target.value);
        const data = event.target.value;
        setStudent({ ...student, [event.target.name]: event.target.value })
        arr = [];
        arr = { "std": event.target.value };
        console.log(student);
        getAllStudent(arr);
        setStdCat(true);
        setDate('');
    };

    var sortedarr = [];
    const dateChange = async (event) => {
        setDate(event.target.value);
        setStdCat(false);
        console.log(event.target.value);
        arr = { "date": event.target.value, "std": Standard };
        getAttendenceDate(arr);
    };

    const getAttendenceDate = async (data) => {
        const response = await getSortedAttandence(data);
        setSortedArray(response.data.data);
    }
    const [indexarr, setIndexArr] = useState([]);

    const getAllStudent = async (data) => {
        const response = await getAllAttendence(data);
        const attendenceData = response.data.data;

        let newAttendanceData = attendenceData.map((student) => {
            let attendedCount = student.studentinfo.filter((info) => info.attend === 1).length;
            let attendancePercentage = (attendedCount / student.studentinfo.length) * 100 || 0;
            return { ...student, attendedCount, attendancePercentage };
        });

        let newIndexes = newAttendanceData.map((student) => student.attendedCount);
        setIndexArr(newIndexes);
        setAttendance(newAttendanceData);
        console.log(newIndexes);
    }

    // const getAllStudent = async (data) => {
    //     const response = await getAllAttendence(data);
    //     console.log(response.data);
    //     const attendenceData = response.data.data;


    //     var count=0
    //     for (let index = 0; index < response.data.data.length; index++) {

    //         for (let j = 0; j <response.data.data[index].studentinfo.length; j++) {

    //             if(response.data.data[index].studentinfo[j].attend==1)
    //             {
    //                 count++;
    //             }
    //         }
    //         indexarr.push(count);
    //         count=0;

    //     }
    //    console.log(indexarr);
    //    setAttendance(attendenceData);
    // }



    const [updatedStudentId, setUpdatedStudentId] = useState(null);



    const getTeacherData = async () => {
        try {
            const response = await viewTeacher2(result);
            if (response.status === 200) {
                const teacherData = response.data.data[0];
                // setSub(teacherData); // Set the teacher's data in 'Sub' state
                const stdids = response?.data.data[0].Asignclass;
                const response2 = await getStandards(stdids);
                // setassignclass(response2?.data)

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
                                View Attendance
                            </Typography>
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

                        <div className='col-lg-2 mb-2'>
                            <FormControl fullWidth>
                                {/* <FormHelperText >Date of Birth</FormHelperText> */}
                                <TextField focused type='date' label='Date' name='date' variant='outlined'
                                    onChange={(event) => dateChange(event)}
                                />
                            </FormControl>
                        </div>




                    </div>
                </div>

                <div className='container mt-4'>
                    <table className="table table-responsive">

                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Present/Absent</th>
                                <th>Overall</th>
                                <th>View more</th>
                            </tr>
                        </thead>
                        <tbody>


                            {

                                stdcat == true ?

                                    Attendence.map((data, index) => {
                                        return (

                                            <>

                                                <tr>

                                                    <td>{data.name}</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>{String((indexarr[index] / data.studentinfo.length) * 100).slice(0, 5)}</td>
                                                    <td>
                                                        <Link to={`student/${data._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                            <Button className="btn " href="#data" startIcon={<AiFillEye />} />
                                                        </Link>

                                                    </td>


                                                </tr>

                                            </>


                                        )
                                    })

                                    :

                                    sortedarray.map((data, index) => {
                                            console.log(data.studentinfo[0].date);
                                        return (
                                            <>
                                                <tr>
                                                    <td>{data.name}</td>
                                                    <td>{data.studentinfo[0].date}</td>
                                                    <td>{data.studentinfo[0].attend==0?'A':'P'}</td>
                                                    <td>-</td>
                                                    <td>
                                                         <Link to={`student/${data._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                            <Button className="btn " href="#data" startIcon={<AiFillEye />} />
                                                        </Link>
                                                        </td>
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