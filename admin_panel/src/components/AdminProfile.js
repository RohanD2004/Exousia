
// import Sidenav from "../components/sidebar.tsx";
// import "../components/css/Admin.css"
// import Box from '@mui/material/Box';
// import { React, useEffect, useState } from 'react'
// import { adminData } from "../service/api.js";
// import { useParams ,useNavigate} from "react-router-dom";
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import { TextField } from "@mui/material";
// import Loading from "./Loading.js";
// import "../components/css/loading.css"
// export default function AdminProfile() {

//     const navigate= useNavigate();
//     const [admin, setAdminData] = useState([]);
//     const { id } = useParams();
//     const [isLoading, setIsLoading] = useState(true);
//     const getAdminData = async () => {
//         const response = await adminData(id);
//         setAdminData(response?.data?.data || {});

//     }

//     useEffect(() => {
//         setTimeout(() => {
//             // Replace this with your actual API call
//             getAdminData();

//             setIsLoading(false);
//           }, 2000);
//     }, []);
//     return (
//         <Box sx={{ display: 'flex' }}>


//             <Sidenav />
//             <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

//                 {
//                     isLoading ? (
//                         <Loading />
//                     ) : (
//                         <div className='container'>

//                             <div class="container py-5 h-100">
//                                 <div class="row d-flex justify-content-center align-items-center h-100">
//                                     <div class="col col-lg-6 mb-4 mb-lg-0">
//                                         <div class="card mb-3" style={{ borderRadius: '.5rem' }}>
//                                             <div class="row g-0">
//                                                 {
//                                                     admin.map((data) => {
//                                                         return (
//                                                             <>
//                                                                 <div class="col-md-4 py-2 gradient-custom text-center text-white"
//                                                                     style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>


//                                                                     <AdminPanelSettingsIcon className='mt-3 mb-3' style={{ fontSize: '7rem', color: 'black' }} />
//                                                                     <h5>{data.name}</h5>
//                                                                     <p>ADMIN</p>
//                                                                     <p><strong>Exousia Academy</strong></p>
//                                                                     <div className='mt-5'>
//                                                                         <button className='btn btn-dark w-75'
//                                                                         onClick={()=>navigate(`/admin/profile/edit/${data._id}`)}>
//                                                                             Edit
//                                                                         </button>
//                                                                     </div>

//                                                                 </div>
//                                                                 <div class="col-md-8">
//                                                                     <div class="card-body p-4">
//                                                                         <h6>Personal Details</h6>
//                                                                         <hr class="mt-0 mb-4" />
//                                                                         <div className='row pt-1'>
//                                                                             <div className='col-lg-12'>

//                                                                                 <TextField variant='outlined' value={data.name} readOnly fullWidth label='Name' focused></TextField>

//                                                                             </div>
//                                                                         </div>
//                                                                         <div className='row pt-2'>
//                                                                             <div className='col-lg-12'>

//                                                                                 <TextField variant='outlined' value={data.emial} readOnly fullWidth label='Email' focused></TextField>

//                                                                             </div>
//                                                                         </div>

//                                                                         <div className='row pt-2'>
//                                                                             <div className='col-lg-12'>

//                                                                                 <TextField variant='outlined' value={data.contact} readOnly fullWidth label='Contact' focused></TextField>

//                                                                             </div>
//                                                                         </div>

//                                                                         <div className='row pt-2'>
//                                                                             <div className='col-lg-12'>

//                                                                                 <TextField variant='outlined' readOnly value={data.address} fullWidth label='Address' multiline maxRows={2} focused></TextField>

//                                                                             </div>
//                                                                         </div>

//                                                                         <div className='row pt-2 pb-4'>
//                                                                             <div className='col-6'>

//                                                                                 <TextField variant='outlined' readOnly value={data.gen} fullWidth label='Gender' focused></TextField>

//                                                                             </div>
//                                                                         </div>

//                                                                         <h6>Credentials</h6>
//                                                                         <hr class="mt-0 mb-4" />
//                                                                         <div class="row pt-1">
//                                                                             <div class="col-12 mb-3">
//                                                                                 <TextField variant='outlined' value={data.username} readOnly fullWidth label='Username' focused></TextField>
//                                                                             </div>
//                                                                             <div class="col-12 mb-3">
//                                                                                 <TextField variant='outlined' value={data.password} readOnly fullWidth label='Password' focused></TextField>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </>
//                                                         )
//                                                     })
//                                                 }
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     )}

//             </Box>
//         </Box>
//     )
// }

// import './App.css';
import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Loading from "./Loading.js";
import { adminData } from "../service/api.js";
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import "../components/css/loading.css"
import Header from "../components/header.js"
import Sidenav from "../components/sidebar.tsx";

function AdminProfile() {

    const navigate = useNavigate();
    const [admin, setAdminData] = useState([]);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const getAdminData = async () => {
        const response = await adminData(id);
        setAdminData(response?.data?.data || {});

    }

    useEffect(() => {
        setTimeout(() => {
            // Replace this with your actual API call
            getAdminData();

            setIsLoading(false);
        }, 2000);
    }, []);


    return (

        <Box sx={{ display: 'flex' }}>

            <Sidenav />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                <Header title="Admin Profile " />
                <div className='container mt-4'>

                    {
                        isLoading ? (
                            <Loading />
                        ) : (

                            <div className='row'>
                                {
                                    admin.map((data) => {
                                        return (
                                            <>
                                                <div className='col-lg-4 mt-2'>

                                                    <div className='card' style={{ borderRadius: '8px' }}>
                                                        <div className=' d-flex flex-column' style={{ height: '40vh', backgroundColor: '#aa66CC', borderRadius: '8px' }}>
                                                            <div className='d-flex mt-3 justify-content-center'>
                                                                <AccountCircleIcon style={{ fontSize: '10rem', color: 'white' }}></AccountCircleIcon>
                                                            </div>
                                                            <div className='d-flex justify-content-center'>
                                                                <span className='h6 text-white d-block'>{data.name}</span>
                                                            </div>
                                                            <div className='d-flex justify-content-center'>
                                                                <span className='h7 text-white d-block text-uppercase'>Admin</span>
                                                            </div>
                                                            <div className='d-flex justify-content-center'>
                                                                <span className='h7 text-white d-block mt-1'>{data.className}</span>
                                                            </div>
                                                        </div>
                                                        <div className='card-body' style={{ backgroundColor: 'white' }}>
                                                            <span>Credentials</span>
                                                            <hr style={{ border: '2px solid black' }}></hr>
                                                            <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Email</b></span>
                                                            <p>{data.emial}</p>

                                                            <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Password</b></span>
                                                            <p>{data.password}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='col-lg-8 mt-2'>
                                                    <div className='shadow p-3' style={{ background: 'white' }}>
                                                        <span>Personal Details</span>
                                                        <hr style={{ border: '2px solid black' }}></hr>
                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Name</b></span>
                                                        <p>{data.name}</p>

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Email</b></span>
                                                        <p>{data.emial}</p>

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Contact</b></span>
                                                        <p>{data.contact}</p>

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Gender</b></span>
                                                        <p>{data.gen}</p>

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Address</b></span>
                                                        <p>{data.address}</p>

                                                        <button className='btn btn-dark w-25 mt-3 mb-3'
                                                        onClick={()=>navigate(`/admin/profile/edit/${data._id}`)}
                                                        >Edit</button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )}
                </div>

            </Box>
        </Box>

    );
}

export default AdminProfile;



