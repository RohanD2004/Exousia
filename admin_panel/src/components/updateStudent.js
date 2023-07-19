import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import { getSingletudentData, updateStudent } from "../service/api"
import { useForm } from "react-hook-form";
import {Input, Typography, styled, FormGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom';


const textstyle = {
    color: 'Black'
}

const Container = styled(FormGroup)`
    & > div {
        margin-top: 20px;
        padding:5px;
`;

const Container2 = styled(FormGroup)`
    margin-top:2rem;
    `;
const initialValue = {
    name: '',
    dob: '',
    gen: '',
    std: '',
    contact: '',
    Alternet_contact: '',
    Address: '',
    email: '',
    username: '',
    password: ''
}


const Admission = () => {
    const navigate= useNavigate();
    const temp= localStorage.getItem('token');
    const { id } = useParams();

    const [student, setStudent] = useState(initialValue);
    const [updatedvalue, setUpdateValue] = useState(initialValue);

    let { name, dob, std, contactno, alternateno, address, email, uname, pass } = student;


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
        const response = await getSingletudentData(id);
        setStudent(response?.data);
        // console.log(response.data)
    }

    const onValueChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }

    const updateStudentDetails = async () => {
        console.log(student)
       await updateStudent(id, student);
    }
    // const onSubmit = async (data) => await updateStudent(id, data);
    useEffect(() => {
        console.log(temp);
        if(temp ===null){
          navigate('/');
        }
      }, [temp])
    return (

        <Box sx={{ display: 'flex' }}>

            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >

                {/* <Container injectFirst>
                <form className="container row g-3" onSubmit={handleSubmit(onSubmit)}>

                    <div className="col-12 mt-5">
                    <FormControl fullWidth>
                    <Input  onChange={(e) => onValueChange(e)}  name='name' value={student.name} id="my-input" aria-describedby="my-helper-text" 
                            
                        />
                        </FormControl>
                        

                        <p className='text-danger'>
                            {errors.name?.type === "required" && "Name is required"}
                        </p>
                    </div>

                    <div className='col-12'>
                    <FormControl fullWidth>
                            <TextField type='date'  value={student.dob}  variant='outlined' style={textstyle}
                                {...register("dob", { required: true })}
                            />
                            <FormHelperText id="outlined-weight-helper-text">Date of Birth</FormHelperText>
                        </FormControl>
                            <p className='text-danger'>
                                {errors.dob?.type === "required" && "Dob is required"}
                            </p>
                        
                    </div>

                    <div className='col-12'>
                        <FormControl sx={{ minWidth: 300 }} className='mt-3'>
                            <InputLabel id="demo-controlled-open-select-label1" >Std</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                // open={open}
                                {...register("std", { required: true })}

                                // onClose={handleClose}
                                // onOpen={handleOpen}
                                // value={Std2}
                                value={student.std}
                                label="Std"
                            // onChange={handleChange}
                            >
                                <MenuItem value={1}>1st</MenuItem>
                                <MenuItem value={2}>2nd</MenuItem>
                                <MenuItem value={3}>3rd</MenuItem>
                                <MenuItem value={4}>4th</MenuItem>
                                <MenuItem value={5}>5th</MenuItem>
                                <MenuItem value={6}>6th</MenuItem>
                                <MenuItem value={7}>7th</MenuItem>
                                <MenuItem value={8}>8th</MenuItem>
                                <MenuItem value={9}>9th</MenuItem>
                                <MenuItem value={10}>10th</MenuItem>

                            </Select>
                            
                        </FormControl>
                        <p className='text-danger'>
                                {errors.std?.type === "required" && "std is required"}
                            </p>
                    </div>
                    <div class="row g-3">
                        <div class="col">
                            <TextField  variant='outlined' value={student.contact}   label="Contact No"  className='d-block mt-3' 
                                {...register("contact", { required: true })}
                            
                            />
                            <p className='text-danger'>
                                {errors.contact?.type === "required" && "contact is required"}
                            </p>
                        </div>
                        
                        <div class="col">
                            <TextField  variant='outlined' value={student.Alternet_contact}  id='contactno2' label="Alternate No" className='mt-3 '
                                {...register("Alternet_contact", { required: true })}
                            />
                        </div>
                        <p className='text-danger'>
                                {errors.Alternet_contact?.type === "required" && "Alternet_contact is required"}
                            </p>
                    </div>

                    <div className='col-12'>
                        <TextField   variant='outlined' value={student.Address}  label='Address' className='mt-3' multiline maxRows={4}  
                                {...register("Address", { required: true })}
                        />
                        <p className='text-danger'>
                                {errors.Address?.type === "required" && "Address is required"}
                            </p>
                    </div>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="input-group mt-3">
                                <input type="text" className="form-control" value={student.email} placeholder="Email" aria-describedby="basic-addon2" 
                                 {...register("email", { required: true })}
                                />
                                <span className="input-group-text " id="basic-addon2">@gmail.com</span>
                            </div>
                            <p className='text-danger'>
                                {errors.email?.type === "required" && "email is required"}
                            </p>

                        </div>
                        <div className="col-md-6">
                            <div className="input-group mt-3">
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input type="text" value={student.username} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
                                 {...register("Username", { required: true })}
                                
                                />
                            </div>
                            <p className='text-danger'>
                                {errors.Username?.type === "required" && "Username is required"}
                            </p>
                        </div>
                    </div>

                    <div className='row g-3'>
                        <div className='col-md-6'>
                            <TextField
                                label="Password"
                
                                defaultValue="Generate"
                                value={student.password}
                                InputProps={{
                                    readOnly: true,
                                }}

                                {...register("password", { required: true })}

                                variant="outlined"
                            />
                        <p className='text-danger'>
                                {errors.password?.type === "required" && "password is required"}
                            </p>
                        </div>
                        <div className='col-md-6'>
                            <Button className='mx-3 mt-2' style={{ color: 'black' }} endIcon={<KeyIcon />}>
                                Create Password
                            </Button>
                        </div>
                    </div>
                    <div className="col-12">
                    <TextField className="button" type="submit" />
                    </div>

                </form>
                </Container> */}

                <Container injectFirst className='shadow w-50 ' >
                    <h2 variant="h4" className='text-center p-3'>Update Student</h2>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input  className='form-control' onChange={(e) => onValueChange(e)} name='name'  value={student.name} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">DOB</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name='dob' value={student.dob} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Gen</InputLabel>
                        <Input onChange={(e) => onValueChange(e)} name='gen' value={student.gen} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">STD</InputLabel>
                        <Input  className='form-control' onChange={(e) => onValueChange(e)} name='std' value={student.std} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Contact</InputLabel>
                        <Input  className='form-control' onChange={(e) => onValueChange(e)} name='contact' value={student.contact} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Alternet Contact No</InputLabel>
                        <Input  className='form-control' onChange={(e) => onValueChange(e)} name='Alternet_contact' value={student.Alternet_contact} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Address</InputLabel>
                        <Input  className='form-control' onChange={(e) => onValueChange(e)} name='Address' value={student.Address} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Gmail</InputLabel>
                        <Input  className='form-control' onChange={(e) => onValueChange(e)} name='email' value={student.email} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Username</InputLabel>
                        <Input  className='form-control' onChange={(e) => onValueChange(e)} name='username' value={student.username} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input className='form-control' onChange={(e) => onValueChange(e)} name='password' value={student.password} id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </Container>
                <Container2 className='w-50'>

                    <div className='text-center' >
                        <Button  variant="contained" className='btn btn-primary' onClick={() => updateStudentDetails()} >Update Student</Button>
                    </div>
                </Container2>
            </Box>
        </Box>
    )
}

export default Admission;