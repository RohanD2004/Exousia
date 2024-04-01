import React, { useState } from 'react'
import '../components/css/student_prof.css'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useParams,useNavigate } from 'react-router-dom';
import { getStudentprofile } from '../service/api'
import { useEffect } from 'react';
import Header from "../components/header"
import moment from 'moment';
let remaining;

export default function Studentprofile() {
    const navigate= useNavigate();
    const temp = localStorage.getItem('token');


    const [studetndata, setStudetndata] = useState([]);
    const { id } = useParams()

    // const data= localStorage.getItem('user_id')

    const getStudentData = async () => {

        const response = await getStudentprofile(id)
        console.log(response?.data.data[0].std_id);
        setStudetndata(response?.data.data);
        let paid = response?.data.data.feesPaid;
        localStorage.setItem('std_id', response.data.data[0].std_id);
        let total = response?.data.data[0].stdfeesinfo.total_fees
        remaining = total - paid;

    }
    useEffect(() => {
        if(temp ===null){
          navigate('/');
        }
      }, [temp])

      useEffect(() => {
        getStudentData();
    }, [])

    return (
        <Box sx={{ display: 'flex' }} >
            <Box component='main' sx={{ flexGrow: 1}}>
                <Box>
                    <Header title="Profile"/>
                </Box>
                <div class="container-xl  mt-4">

                    {
                        studetndata?.map((user) => {

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
                                                <div class="large font-italic mb-2"><b>{user.name}</b></div>
                                                <div class="large font-italic mb-4">{user.stdfeesinfo.std}</div>
                                                <div class="large font-italic mb-4">Admitted On :{ moment(user.createdAt).format('MMMM Do, YYYY')}</div>

                                                <div class="large font-italic mb-4">
                                                    Fees Status :{' '}
                                                    {user.stdfeesinfo.total_fees - user.feesPaid === 0 ? (
                                                        <Button startIcon={<CheckCircleIcon style={{ color: 'green' }} />} />
                                                    ) : (
                                                        <Button startIcon={<CancelIcon style={{ color: 'red' }} />} />
                                                    )}
                                                </div>

                                            </div>
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
                                                        <input class="form-control" id="inputUsername" style={{ fontWeight: 'bold' }} value={user.name} type="text" readOnly />
                                                    </div>
                                                    {/* <!-- Form Row--> */}
                                                    <div class="row gx-3 mb-3">
                                                        {/* <!-- Form Group (DOB)--> */}
                                                        <div class="col-md-6">
                                                            <label class="small mb-1" for="DOB">Date of Birth</label>
                                                            <input class="form-control" id="DOB" type="text" style={{ fontWeight: 'bold' }} value={user.dob} readOnly />
                                                        </div>
                                                        {/* <!-- Form Group (gender)--> */}
                                                        <div class="col-md-6">
                                                            <label class="small mb-1" for="gender">Gender</label>
                                                            <input class="form-control" id="gender" type="text" style={{ fontWeight: 'bold' }} value={user.gen} readOnly />
                                                        </div>
                                                    </div>
                                                    {/* <!-- Form Row        --> */}
                                                    <div class="row gx-3 mb-3">
                                                        {/* <!-- Form Group (contactno)--> */}
                                                        <div class="col-md-6">
                                                            <label class="small mb-1" for="contactno">Contact No</label>
                                                            <input class="form-control" id="contactno" type="text" style={{ fontWeight: 'bold' }} value={user.contact} readOnly />
                                                        </div>
                                                        {/* <!-- Form Group (alternateno)--> */}
                                                        <div class="col-md-6">
                                                            <label class="small mb-1" for="alternateno">Alternate No</label>
                                                            <input class="form-control" id="alternateno" type="text" style={{ fontWeight: 'bold' }} value={user.Alternet_contact} readOnly />
                                                        </div>
                                                    </div>
                                                    {/* <!-- Form Group (address)--> */}
                                                    <div class="mb-3">
                                                        <label class="small mb-1" for="Address">Address</label>
                                                        <input class="form-control" id="Address" type="text" style={{ fontWeight: 'bold' }} value={user.Address} readOnly />
                                                    </div>
                                                    {/* <!-- Form Group (email)--> */}
                                                    <div class="mb-3">
                                                        <label class="small mb-1" for="Email">Email</label>
                                                        <input class="form-control" id="Email" type="text" style={{ fontWeight: 'bold' }} value={user.email} readOnly />
                                                    </div>
                                                    {/* <!-- Form Row--> */}
                                                    <div class="row gx-3 mb-3">
                                                        {/* <!-- Form Group (feespaid)--> */}
                                                        <div class="col-md-6">
                                                            <label class="small mb-1" for="feespaid">Fees Paid</label>
                                                            <input class="form-control" id="feespaid" style={{ fontWeight: 'bold' }} type="text" value={user.feesPaid} readOnly />
                                                        </div>
                                                        {/* <!-- Form Group (feesrem)--> */}
                                                        <div class="col-md-6">
                                                            <label class="small mb-1" for="feesrem">Remaining</label>
                                                            <input class="form-control" style={{ fontWeight: 'bold', cursor: 'pointer' }} id="feesrem" value={user.stdfeesinfo.total_fees - user.feesPaid} readOnly />
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