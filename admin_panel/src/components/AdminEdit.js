import '../components/css/Admin.css';
import { React, useEffect, useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidenav from '../components/sidebar.tsx'
import { useParams } from "react-router-dom";
import Loading from './Loading';
import { adminData } from '../service/api';
function App() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [admin, setAdminData] = useState([]);
    const [update, setUpdateData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getAdminData = async () => {
        const response = await adminData(id);
        setAdminData(response?.data?.data || {});
        console.log(admin)
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

                            <div class="container py-5 h-100">
                                <div class="row d-flex justify-content-center align-items-center h-100">
                                    <div class="col col-lg-6 mb-4 mb-lg-0">
                                        <div class="card mb-3" style={{ borderRadius: '.5rem' }}>
                                            <div class="row g-0">
                                                <div class="col-md-4 py-2 gradient-custom text-center text-white"
                                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                                    <AdminPanelSettingsIcon className='mt-3 mb-3' style={{ fontSize: '7rem', color: 'black' }} />

                                                    <p>ADMIN</p>
                                                    <div className='mt-5'>
                                                        <button className='btn btn-dark w-75'>
                                                            Save
                                                        </button>
                                                    </div>

                                                </div>
                                                <div class="col-md-8">

                                                    {
                                                        admin.map((data) => {
                                                            return (
                                                                <>

                                                                    <div class="card-body p-4">
                                                                        <h6>Personal Details</h6>
                                                                        <hr class="mt-0 mb-4" />
                                                                        <div className='row pt-1'>
                                                                            <div className='col-lg-12'>

                                                                                <TextField variant='outlined'  fullWidth value={data.name} label='Name' focused

                                                                                    onChange={(e) => setUpdateData({
                                                                                        ...update,
                                                                                        name: e.target.value
                                                                                    })}
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                        <div className='row pt-2'>
                                                                            <div className='col-lg-12'>

                                                                                <TextField variant='outlined' value={data.emial} readOnly fullWidth label='Email' focused></TextField>

                                                                            </div>
                                                                        </div>

                                                                        <div className='row pt-2'>
                                                                            <div className='col-lg-12'>

                                                                                <TextField variant='outlined' value={data.contact} readOnly fullWidth label='Contact' focused></TextField>

                                                                            </div>
                                                                        </div>

                                                                        <div className='row pt-2'>
                                                                            <div className='col-lg-12'>

                                                                                <TextField variant='outlined' value={data.address} readOnly fullWidth label='Address' multiline maxRows={2} focused></TextField>

                                                                            </div>
                                                                        </div>

                                                                        <div className='row pt-2 pb-4'>
                                                                            <div className='col-6'>

                                                                                <TextField variant='outlined' value={data.gen} readOnly fullWidth label='Gender' focused></TextField>

                                                                            </div>
                                                                        </div>

                                                                        <h6>Credentials</h6>
                                                                        <hr class="mt-0 mb-4" />
                                                                        <div class="row pt-1">
                                                                            <div class="col-12 mb-3">
                                                                                <TextField variant='outlined' value={data.name} readOnly fullWidth label='Classes Name' focused></TextField>
                                                                            </div>
                                                                            <div class="col-12 mb-3">
                                                                                <TextField variant='outlined' value={data.username} readOnly fullWidth label='Username' focused></TextField>
                                                                            </div>
                                                                            <div class="col-12 mb-3">
                                                                                <TextField variant='outlined' value={data.password} readOnly fullWidth label='Password' focused></TextField>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

            </Box>
        </Box>
    );
}

export default App;