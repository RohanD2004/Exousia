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
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { GetStudentStd, updateMark } from '../service/api';
import { React, useEffect, useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Sidebar from './TeacherSidebar.tsx'
import Header from "../components/header.js";
import '../components/css/Exam.css'
import { getSingleAttendence } from "../service/api"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import Toggle from 'react-toggle';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
export default function Attendence() {
    const { id } = useParams();
    const navigate = useNavigate();
    const temp = localStorage.getItem('token');
    const userid = localStorage.getItem('user_id');
    const [attendenceData, setAttendenceData] = useState([]);
    const [attendedLectures, setAttendedLectures] = useState([]);


    const user_id = {
        'user_id': id
    };

    useEffect(() => {
        if (temp === null) {
            navigate('/');
        }
    }, [temp])

    const getAttendance = async () => {
        console.log(user_id);
        const response = await getSingleAttendence(user_id);
        console.log(response.data);
        setAttendenceData(response.data.data);

        let presentCount = 0; // Initialize present count variable

        response.data.data.forEach((data, index) => {
            if (data.attend === 1) {
                presentCount++; // Increment present count for each attended lecture
            }
        });

        setAttendedLectures(prevState => ({
            ...prevState,
            present: presentCount // Update the present count in the state
        }));
    }




    useEffect(() => {
        getAttendance();
        console.log(attendedLectures);
    }, [])


    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Header title="Student Attendance" />
                </Box>

                <div className="shadow container-fluid bg-light mt-5 pt-3 pb-3">

                    <div className="row">
                        <div className="col-xl-6 ">
                            <PieChart
                                series={[
                                    {
                                        arcLabel: (item) => `${item.label} (${item.value})`,
                                        arcLabelMinAngle: 45,
                                        data: [
                                            { id: 0, value: attendenceData.length, label: 'Present', color: 'blue' },
                                            { id: 1, value: attendedLectures.present, label: 'Absent', color: 'red' },
                                        ],
                                    },
                                ]}
                                sx={{
                                    [`& .${pieArcLabelClasses.root}`]: {
                                        fill: 'white',
                                        fontWeight: 'bold',
                                    },
                                }}
                                width={400}
                                height={200}
                            />
                        </div>
                        <div className="col">

                            <p className="h5 mt-3">Attendance</p>
                            <p className="h2">{String((attendedLectures.present / attendenceData.length) * 100).slice(0, 5)}</p>
                            <p className="h5">Total lectures: {attendenceData.length}</p>
                            <p className="h5">Attended: {attendedLectures.present}</p>
                            <p className="h5">Missed: {attendenceData.length - attendedLectures.present}</p>

                        </div>
                    </div>

                    <div className="mt-5">
                        <table className="table table-responsive">
                            <thead className="table-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Taken by</th>
                                    <th>Present/Absent</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    attendenceData.map((data, index) => {
                                        return (
                                            <>
                                                <tr>

                                                    <td>{data.date}</td>
                                                    <td>{data.attendanceinfo.length > 0 ? data.attendanceinfo[0].name : ''}</td>
                                                    <td>{data.attend == 0 ? 'A' : 'P'}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </Box>
        </Box >
    )
}