import { React, useState } from 'react'
import '../components/css/login.css'
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import pic from '../img/pexels-kobe-1516440.jpg'
import { Authenticate } from '../service/api';
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

let token;
function passtoken(tkn) {
    token = tkn;

}

export function tokenpassApi() {
    return token
}


const initialValue = {
    username: '',
    password: ''
}
export default function Login() {


    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();


    const [logcred, setcred] = useState(initialValue);

    const Onsubmit = async (data) => {

        try {
            const response = await Authenticate(data)
            const tkn=response?.data.data.accessToken
        
            if (response?.status === 200) {
                localStorage.setItem('token',tkn)
                Swal.fire({
                    title: "Success",
                    text: "Login Successful",
                    icon: "success",
                    confirmButtonText: "OK",
                });


                if (response.data.data.userdata.role === "student") {
                    navigate(`/student/${response.data.data.userdata.user_id}`);
                    localStorage.setItem('user_id', response.data.data.userdata.user_id)

                } else if (response.data.data.userdata.role === "Teacher") {
                    navigate(`/teacher/${response.data.data.userdata.user_id}`);
                    localStorage.setItem('user_id', response.data.data.userdata.user_id)
                }
                else {
                    
                    navigate('/admin');
                    localStorage.setItem('user_id', "64bf2f8991eaa2d95dd880d3");
                }



            }
            else if (response.status == 422) {
                Swal.fire({
                    title: "Error !",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
            else {

                Swal.fire({
                    title: "Error !",
                    text: response.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });

            }

        } catch (error) {

            Swal.fire({
                title: "Error ",
                text: error,
                icon: "error",
                confirmButtonText: "OK",
            });

        }

    }
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { username, password } = logcred;
    const onValueChange = (event) => {

        setcred({ ...logcred, [event.target.name]: event.target.value })

    }

    return (
        <>



            {/* <section class="vh-100">
                <div class="container-fluid h-custom">
                    <div className='card shadow' style={{ backgroundColor: '#002147' }}>
                        <div className='card-body'>

                            <p class='h2 text-center card-title text-white'>EXOUSIA ACADEMY</p>
                        </div>  
                    </div>
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src={pic}
                                class="img-fluid" alt="Sample image" />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 bg-light p-5 shadow">
                            <form onSubmit={handleSubmit(Onsubmit)}>

                                <div class="form-outline mb-4">
                                    <TextField id="outlined-basic" label="Username" fullWidth variant="outlined"   {...register("username", { required: true })} />
                                    <p className='text-danger'>
                                    {errors.username?.type === "required" && "username is required"}
                                </p>
                                </div>

                                <div class="form-outline mb-3">
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(event) => onValueChange(event)}
                                            {...register("password", { required: true })}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    {errors.password?.type === "required" && "password is required"}

                                    </FormControl>
                                </div>

                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="form-check mb-0">
                                        <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label class="form-check-label" for="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="/" class="text-body">Forgot password?</a>
                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" class="btn btn-primary btn-lg"
                                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} >Login</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div
                    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-center py-4 px-4 px-xl-5 " style={{ backgroundColor: '#002147' }}>
                    <div class="text-white mb-3 mb-md-0">
                        Copyright © Exousia. All Rights Reserved.
                    </div>

                </div>
            </section> */}
            <div className='container-fluid  login-page px-0' >
                <header className='d-flex justify-content-center' style={{ backgroundColor: '#002147', height: '4rem' }}>
                    <span className='mt-3 text-white h5'>Exousia Academy</span>
                </header>
                <div className='container' >
                    <div className='parent-div d-flex align-items-center justify-content-center' style={{ height: '80vh' }}>
                        <div className='child-div p-4 shadow'>
                            <div className='d-flex justify-content-center shadow align-items-center mb-3 text-white' id='login' style={{
                                height: '15vh', width: '30vw', backgroundImage: `url(${pic})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>LOGIN</span>
                            </div>
                            <div style={{ backgroundColor: 'transparent' }} className='text-white'>
                                <form onSubmit={handleSubmit(Onsubmit)} >
                                    <div class="mb-4">
                                        <TextField variant='outlined'  label='Username' fullWidth focused placeholder='Enter username here..'
                                            {...register("loginid", { required: true })}
                                        ></TextField>
                                        <p className='text-danger'>
                                            {errors.username?.type === "required" && "username is required"}
                                        </p>
                                    </div>

                                    <div class="mb-4">
                                        <FormControl fullWidth focused  variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                placeholder='Enter password here..'
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...register("pass", { required: true })}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}

                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                               <p className='text-danger'>

                                            {errors.password?.type === "required" && "password is required"}
                                               </p>
                                        </FormControl>
                                    </div>

                                    <button type='submit' className='btn btn-primary w-100'>Login</button>


                                </form>
                            </div>

                        </div>
                    </div>
                </div>
                <footer className='fixed-bottom d-flex justify-content-center' style={{ backgroundColor: '#002147', height: '4rem' }}>
                    <span className='mt-3 text-white'>Designed & developed by Exousia. All rights reserved.</span>
                </footer>
            </div>
        </>

    )
}
