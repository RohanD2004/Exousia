import '../components/css/Admin.css';
import { React, useEffect, useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidenav from '../components/sidebar.tsx'
import { useParams } from "react-router-dom";
import Loading from './Loading';
import { adminData, updateAdminData } from '../service/api';
import Swal from "sweetalert2";
// function App() {

//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [admin, setAdminData] = useState([]);
//     const [update, setUpdateData] = useState({});
//     const [isLoading, setIsLoading] = useState(true);

//     const getAdminData = async () => {
//         const response = await adminData(id);
//         setAdminData(response?.data?.data || {});
//         console.log(admin)
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             // Replace this with your actual API call
//             getAdminData();

//             setIsLoading(false);
//         }, 2000);
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
//                                                 <div class="col-md-4 py-2 gradient-custom text-center text-white"
//                                                     style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
//                                                     <AdminPanelSettingsIcon className='mt-3 mb-3' style={{ fontSize: '7rem', color: 'black' }} />

//                                                     <p>ADMIN</p>
//                                                     <div className='mt-5'>
//                                                         <button className='btn btn-dark w-75'>
//                                                             Save
//                                                         </button>
//                                                     </div>

//                                                 </div>
//                                                 <div class="col-md-8">

//                                                     {
//                                                         admin.map((data) => {
//                                                             return (
//                                                                 <>

//                                                                     <div class="card-body p-4">
//                                                                         <h6>Personal Details</h6>
//                                                                         <hr class="mt-0 mb-4" />
//                                                                         <div className='row pt-1'>
//                                                                             <div className='col-lg-12'>

//                                                                                 <TextField variant='outlined'  fullWidth value={data.name} label='Name' focused

//                                                                                     onChange={(e) => setUpdateData({
//                                                                                         ...update,
//                                                                                         name: e.target.value
//                                                                                     })}
//                                                                                 />

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

//                                                                                 <TextField variant='outlined' value={data.address} readOnly fullWidth label='Address' multiline maxRows={2} focused></TextField>

//                                                                             </div>
//                                                                         </div>

//                                                                         <div className='row pt-2 pb-4'>
//                                                                             <div className='col-6'>

//                                                                                 <TextField variant='outlined' value={data.gen} readOnly fullWidth label='Gender' focused></TextField>

//                                                                             </div>
//                                                                         </div>

//                                                                         <h6>Credentials</h6>
//                                                                         <hr class="mt-0 mb-4" />
//                                                                         <div class="row pt-1">
//                                                                             <div class="col-12 mb-3">
//                                                                                 <TextField variant='outlined' value={data.name} readOnly fullWidth label='Classes Name' focused></TextField>
//                                                                             </div>
//                                                                             <div class="col-12 mb-3">
//                                                                                 <TextField variant='outlined' value={data.username} readOnly fullWidth label='Username' focused></TextField>
//                                                                             </div>
//                                                                             <div class="col-12 mb-3">
//                                                                                 <TextField variant='outlined' value={data.password} readOnly fullWidth label='Password' focused></TextField>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </>
//                                                             )
//                                                         })
//                                                     }
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     )}

//             </Box>
//         </Box>
//     );
// }

// export default App;


// import './App.css';

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { FormControl, Select, MenuItem } from '@mui/material';

function App() {

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        setUpdateData({
            ...update,
            gen: event.target.value
        })
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [admin, setAdminData] = useState([]);
    const [update, setUpdateData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getAdminData = async () => {
        const response = await adminData(id);
        setAdminData(response?.data?.data || {});
        setAge(response?.data?.data[0].gen)
    }

    const updateAdmin = async ()=>{
        try {
            
            const response = await updateAdminData(id,update);
            console.log(response.data.message);
            if (response?.status == 200) {
                Swal.fire({
                    title: "Success",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                  }); 
                  navigate(`/admin/profile/${admin[0]._id}`)
            } else {

                console.log("error occure");
                
            }
            
        } catch (error) {
            Swal.fire({
                title: "error",
                text: error,
                icon: "error",
                confirmButtonText: "OK",
              }); 
        }
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

                {
                    isLoading ? (
                        <Loading />
                    ) : (
                        <div className='container'>
                            {
                                admin.map((data) => {

                                    return (
                                        <>



                                            <div className='row mt-3'>
                                                <div className='col-lg-4'>
                                                    <div className='card' style={{ borderRadius: '8px' }}>
                                                        <div className=' d-flex flex-column' style={{ height: '40vh', backgroundColor: '#aa66CC', borderRadius: '8px' }}>
                                                            <div className='d-flex mt-3 justify-content-center'>
                                                                <AccountCircleIcon style={{ fontSize: '10rem', color: 'white' }}></AccountCircleIcon>
                                                            </div>

                                                            <div className='d-flex justify-content-center'>
                                                                <span className='h7 text-white d-block text-uppercase'>Admin</span>
                                                            </div>
                                                            <div className='d-flex justify-content-center'>
                                                                <button className='btn btn-dark mt-3' onClick={()=>updateAdmin()}>Save Changes</button>
                                                            </div>
                                                        </div>
                                                        <div className='card-body' style={{ backgroundColor: 'white' }}>
                                                            <span>Edit Credentials</span>
                                                            <hr style={{ border: '2px solid black' }}></hr>
                                                            <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Username</b></span>
                                                            <TextField
                                                                className='d-block mt-1 mb-1'
                                                                focused
                                                                value={update.username || data.username} // Use update.username for the value
                                                                onChange={(event) => setUpdateData({
                                                                    ...update,
                                                                    username: event.target.value
                                                                })}
                                                            ></TextField>

                                                            <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Password</b></span>
                                                            <TextField className='d-block mt-1 mb-1' focused value={ update.password  || data.password}
                                                              onChange={(event) => setUpdateData({
                                                                ...update,
                                                                password: event.target.value
                                                            })}
                                                            ></TextField>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-5 shadow p-3'>
                                                    <span>Edit Personal Details</span>
                                                    <hr style={{ border: '2px solid black' }}></hr>
                                                    <div className='px-3 '>


                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Name</b></span>
                                                        <TextField fullWidth className='d-block mt-1 mb-1' size='small' value={update.name || data.name} focused 
                                                          onChange={(event) => setUpdateData({
                                                            ...update,
                                                            name: event.target.value
                                                        })}
                                                        />

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Classes name</b></span>
                                                        <TextField fullWidth className='d-block mt-1 mb-1' size='small' focused 
                                                        value={update.className || data.className}
                                                         onChange={(event) => setUpdateData({
                                                            ...update,
                                                            className: event.target.value
                                                        })}
                                                        />

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Email</b></span>
                                                        <TextField fullWidth className='d-block mt-1 mb-1' size='small' value={ update.emial || data.emial} focused 
                                                          onChange={(event) => setUpdateData({
                                                            ...update,
                                                            emial: event.target.value
                                                        })}
                                                        />

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Contact</b></span>
                                                        <TextField className='d-block mt-1 mb-1' size='small' value={ update.contact || data.contact} focused 
                                                         onChange={(event) => setUpdateData({
                                                            ...update,
                                                            contact: event.target.value
                                                        })}
                                                        />

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Gender</b></span>
                                                        <FormControl focused className='d-block mt-1 mb-1' size='small'>
                                                            <Select
                                                                id="demo-simple-select"
                                                                value={update.gen || age}

                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem value={"Male"} >Male</MenuItem>
                                                                <MenuItem value={"Female"}>Female</MenuItem>
                                                                <MenuItem value={"Other"}>Other</MenuItem>
                                                            </Select>
                                                        </FormControl>

                                                        <span style={{ fontSize: '.9rem', color: 'grey' }}><b>Address</b></span>
                                                        <TextField fullWidth className='d-block mt-1 mb-1' value={ update.address || data.address} size='small' focused 
                                                         onChange={(event) => setUpdateData({
                                                            ...update,
                                                            address: event.target.value
                                                        })}
                                                        />
                                                    </div>


                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    )}

            </Box>
        </Box>
    );
}

export default App;