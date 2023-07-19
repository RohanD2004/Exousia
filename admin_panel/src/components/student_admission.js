import React from 'react'
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { AddStudent } from '../service/api';
import { useForm } from 'react-hook-form';
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetFees } from "../service/api"
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

import Header from "../components/header"


// For database entry
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
    password: '',
    fees: '',
    feesPaid: ''
}
const ITEM_HEIGHT = 40;

const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



const boxstyle = {
    // border: '2px solid black',

    width: '60vw'
}
const textstyle = {
    color: 'white'
}
// var password = document.getElementById("password");

// const ValidateMobileNumber = (event, id) => {
//     var mobileNumber = event.target.value
//     // var mobileNumber1 = id
//     // console.log(mobileNumber1);

//     var expr = /^(0|91)?[6-9][0-9]{9}$/;
//     if (!expr.test(mobileNumber)) {
//         document.getElementById(id).style.color = 'red'
//     }
//     else {
//         document.getElementById(id).style.color = 'black'
//     }
// }

const Admission = () => {
    const navigate= useNavigate();
    const temp= localStorage.getItem('token');


    const [feesstd, setfeesStd] = useState([])

  

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

    var password = "";
    const theme = useTheme();
    function genPassword() {
        var chars = "0123456789";
        var passwordLength = 5;
        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        document.getElementById("password").value = password;
        setStudent({ ...student, ["pass"]: password })

    }

    const handleChange = (event) => {
        setStd(event.target.value);
        setStudent({ ...student, [event.target.name]: event.target.value })

    };
    const [Std2, setStd] = useState('');
    const [open, setOpen] = useState(false);
    const [username, Setuname] = useState('');
    const [gen, setgen] = React.useState([]);

    const [student, setStudent] = useState(initialValue);
    const { name, dob, std, contactno, alternateno, address, email, uname, pass } = student;
    // setStudent({std:Std})

    const onValueChange2 = (event, id) => {
        var mobileNumber = event.target.value
        // var mobileNumber1 = id
        // console.log(mobileNumber1);

        var expr = /^(0|91)?[6-9][0-9]{9}$/;
        if (!expr.test(mobileNumber)) {
            document.getElementById(id).style.color = 'red'
        }
        else {
            document.getElementById(id).style.color = 'black'
        }
        setStudent({ ...student, [event.target.name]: event.target.value })

    }

    const gender = [
        'male',
        'female',
        'other',
    ];
    function getStylesstd2(name, theme) {
        return {
            fontWeight:
                gender.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChangegen = (event) => {

        setgen(
            event.target.value
        );

    }

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();



    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const onSubmit = async (data) => {

        try {
           let response= await AddStudent(data);
           if (response?.status === 200) {
            Swal.fire({
              title: "Success",
              text: response?.message,
              icon: "success",
              confirmButtonText: "OK",
          });
            
          } else if (response?.status===422) {
            Swal.fire({
                title:"Error",
                text: response.data.data.message,
                icon: "error",
                confirmButtonText: "OK",
            });
            
          }
           else {
            Swal.fire({
              title: "Something went wrong !",
              text: "Error",
              icon: "error",
              confirmButtonText: "OK",
          });
          }


        } catch (error) {
            Swal.fire({
                title: 'Error !',
                text: error,
                icon: 'error',
            });
        }
    }

    useEffect(() => {
        console.log(temp);
        if(temp ===null){
          navigate('/');
        }
      }, [temp])

      useEffect(() => {
        fees();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>

            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <Box>
                <Header title="Student Admission" />
                </Box>

                {/* <ToastContainer /> */}
                <div class="row mt-5">
                    <div class="col-sm-12">

                        <form className="container row " onSubmit={handleSubmit(onSubmit)}>

                            <div className="col-12 col-sm-4 ">
                                <TextField fullWidth label="Name" variant="outlined" className='mb-3' style={textstyle}
                                    {...register("name", { required: true })}
                                />
                                <p className='text-danger'>
                                    {errors.name?.type === "required" && "Name is required"}
                                </p>
                            </div>

                            <div className='col-12 col-sm-4 '>
                                <FormControl fullWidth>
                                    <TextField type='date' className='datetimepicker' name='dob' variant='outlined' placeholder="DD-MM-YYYY  Date Of Birth" style={textstyle}
                                        {...register("dob", { required: true })}
                                    />
                                    <p className='text-danger'>
                                        {errors.dob?.type === "required" && "DOB is required"}
                                    </p>
                                </FormControl>
                            </div>

                            <div class="col-12 col-sm-4 ">
                                <div class="form-group local-forms ">
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-name-label">Gender</InputLabel>
                                        <Select className=' select'
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            value={gen}
                                            {...register("gen", { required: true })}
                                            onChange={handleChangegen}
                                            input={<OutlinedInput label="Gender" />}
                                            MenuProps={MenuProps}
                                        >
                                            <p className='text-danger'>
                                                {errors.gen?.type === "required" && "Gender is required"}
                                            </p>
                                            {gender.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStylesstd2(name, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </div>
                            </div>

                            <div className='col-12 col-sm-4 '>
                                <FormControl fullWidth className='mt-3'>
                                    <InputLabel id="demo-controlled-open-select-label1" >Std</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={Std2}
                                        label="Std"
                                        {...register("std_id", { required: true })}
                                        onChange={handleChange}
                                    >
                                        {/* <MenuItem value={1}>1st</MenuItem>
                                        <MenuItem value={2}>2nd</MenuItem>
                                        <MenuItem value={3}>3rd</MenuItem>
                                        <MenuItem value={4}>4th</MenuItem>
                                        <MenuItem value={5}>5th</MenuItem>
                                        <MenuItem value={6}>6th</MenuItem>
                                        <MenuItem value={7}>7th</MenuItem>
                                        <MenuItem value={8}>8th</MenuItem>
                                        <MenuItem value={9}>9th</MenuItem> */}

                                        {feesstd.map((user) => (

                                                 <MenuItem value={user.value}>{user.text}</MenuItem>

                                        ))}

                                    </Select>
                                    <p className='text-danger'>
                                        {errors.std_id?.type === "required" && "std is required"}
                                    </p>
                                </FormControl>
                            </div>

                            <div class="col-12 col-sm-4 ">
                                <TextField fullWidth variant='outlined' name='contact' id='contactno1' label="Contact No" className='d-block mt-3' inputProps={{ inputMode: 'numeric' }}
                                    {...register("contact", { required: true })}

                                />
                                <p className='text-danger'>
                                    {errors.contact?.type === "required" && "contact is required"}
                                </p>
                            </div>
                            <div class="col-12 col-sm-4 ">
                                <TextField fullWidth variant='outlined' name='Alternet_contact' id='contactno2' label="Alternate No" className='mt-3 '
                                    {...register("Alternet_contact", { required: true })}
                                />
                                <p className='text-danger'>
                                    {errors.Alternet_contact?.type === "required" && "Alternate No is required"}
                                </p>
                            </div>


                            <div className='col-12 col-sm-4  mt-3'>
                                <TextField fullWidth variant='outlined' label='Address'  multiline maxRows={4}
                                    {...register("Address", { required: true })}
                                />
                                <p className='text-danger'>
                                    {errors.Address?.type === "required" && "Address No is required"}
                                </p>
                            </div>


                            <div className="col-12 col-sm-4 mt-3">
                                <div className="input-group  ">
                                    <TextField fullWidth variant='outlined' id='Email' label="Email" placeholder='example123@gmail.com' className='d-block' inputProps={{ inputMode: 'string' }}
                                        {...register("email", { required: true })}

                                    />
                                    <p className='text-danger'>
                                        {errors.email?.type === "required" && "Email  is required"}
                                    </p>
                                </div>

                            </div>
                            <div className="col-12 col-sm-4 mt-3">
                                <div className="input-group  ">
                                    <TextField fullWidth variant='outlined' id='uname' label="Username" className='d-block' inputProps={{ inputMode: 'string' }}
                                        {...register("username", { required: true })}

                                    />
                                    <p className='text-danger'>
                                        {errors.username?.type === "required" && "Username  is required"}
                                    </p>
                                </div>
                            </div>

                            <div className='col-12 col-sm-4 mt-3'>
                                <TextField
                                    name='pass'
                                    id="password"
                                    label="Password"
                                    fullWidth

                                    {...register("password", { required: true })}


                                    variant="outlined"
                                />
                                <p className='color:red'>
                                    {errors.password?.type === "required" && "password  is required"}
                                </p>
                            </div>

                            <div className='col-12 col-sm-4 mt-3'>
                                <TextField
                                    name='fes'
                                    id="fees"
                                    label="Fees Paid"
                                    fullWidth

                                    {...register("feesPaid", { required: false })}


                                    variant="outlined"
                                />
                                <p className='color:red'>
                                    {errors.feesPaid?.type === "required" && "password  is required"}
                                </p>
                            </div>

                            <div>
                                <Button className="btn bg-primary text-white  mt-3"  style={{width:'15%'}} type="submit">Submit</Button>
                            </div>
                        </form>

                    </div>
                </div>

            </Box>

        </Box>
    )


}

export default Admission;