import React from 'react'
import { Box } from '@mui/material'
import Header from '../components/header'
import Sidebar from '../TeacherComponent/TeacherSidebar.tsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export default function uploadmaterial() {
    return (
        <Box sx={{display:'flex'}}>
            <Sidebar />

            <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
                <Box sx={{ flexGrow: 1 }}>
                    <Header title="Upload Material" />
                </Box>

                <div className='container-fluid mt-5 table-responsive bg-light shadow'>

                    {/* <div className='container shadow bg-light'> */}
                        <div className='d-flex justify-content-center'>
                            <div>

                            <CloudUploadIcon color='primary' className='w-100 h-100' />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div>
                                <select class="form-select mb-2">
                                    <option selected>Select subject</option>
                                    <option >English</option>
                                    <option >Math</option>
                                </select>
                                <input class="form-control mb-2" type="file" multiple />
                                <input class="form-control mb-2" placeholder='Enter file name' type="text" />
                                <button className='btn btn-dark w-100 mb-5'>Upload</button>
                            </div>
                        </div>
                    {/* </div> */}

                </div>

            </Box>
        </Box>
    )
}
