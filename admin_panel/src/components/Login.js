// import { React, useState, useEffect } from 'react'
// import '../components/css/login.css'
// import TextField from '@mui/material/TextField';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import FormControl from '@mui/material/FormControl';
// import IconButton from '@mui/material/IconButton';
// import pic from '../img/pexels-kobe-1516440.jpg'
// import { Authenticate } from '../service/api';
// import Swal from "sweetalert2";
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { BallTriangle } from 'react-loader-spinner'
// let token;
// function passtoken(tkn) {
//     token = tkn;

// }

// export function tokenpassApi() {
//     return token
// }

// const initialValue = {
//     username: '',
//     password: ''
// }

// export default function Login() {

//     useEffect(() => {

//     }, [])

//     const navigate = useNavigate();

//     const {
//         register,
//         formState: { errors },
//         setValue,
//         handleSubmit,
//     } = useForm();

//     const [logcred, setcred] = useState(initialValue);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isBlur, setIsBlur] = useState(false);

//     const Onsubmit = async (data) => {
//         setIsLoading(true);
//         setIsBlur(true);
//         try {
//             const response = await Authenticate(data)
//             const tkn = response?.data.data.accessToken

//             if (response?.status === 200) {

//                 localStorage.setItem('token', tkn)
//                 Swal.fire({
//                     title: "Success",
//                     text: "Login Successful",
//                     icon: "success",
//                     confirmButtonText: "OK",
//                 });

//                 if (response.data.data.userdata.role === "student") {
//                     navigate(`/student/${response.data.data.userdata.user_id}`);
//                     localStorage.setItem('user_id', response.data.data.userdata.user_id)

//                 } else if (response.data.data.userdata.role === "Teacher") {
//                     navigate(`/teacher/${response.data.data.userdata.user_id}`);
//                     localStorage.setItem('user_id', response.data.data.userdata.user_id)
//                 }
//                 else {

//                     navigate('/admin');
//                     localStorage.setItem('user_id', "64bf2f8991eaa2d95dd880d3");
//                 }

//                 setIsLoading(false);
//                 setIsBlur(false);
//             }
//             else if (response.status == 422) {
//                 Swal.fire({
//                     title: "Error !",
//                     text: response.message,
//                     icon: "error",
//                     confirmButtonText: "OK",
//                 });
//             }
//             else {

//                 Swal.fire({
//                     title: "Error !",
//                     text: response.message,
//                     icon: "error",
//                     confirmButtonText: "OK",
//                 });

//             }

//         } catch (error) {

//             Swal.fire({
//                 title: "Error ",
//                 text: error,
//                 icon: "error",
//                 confirmButtonText: "OK",
//             });
//             setIsLoading(false);
//             setIsBlur(false);

//         }

//     }
//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };
//     const { username, password } = logcred;
//     const onValueChange = (event) => {

//         setcred({ ...logcred, [event.target.name]: event.target.value })

//     }

//     return (
//         <>

//             {isLoading ? (
//                 <div className="d-flex justify-content-center mt-3">
//                     <BallTriangle
//                         height={80}
//                         width={80}
//                         radius={9}
//                         color="green"
//                         ariaLabel="loading"
//                         wrapperStyle={{ display: 'inline-block' }}
//                     />
//                 </div>
//             ) : (

//                 <div className={`container-fluid login-page px-0`} style={{ filter: isBlur ? 'blur(5px)' : 'none' }} >
//                     <div className='blur-overlay'   >
//                         <header className='d-flex justify-content-center' style={{ backgroundColor: '#002147', height: '4rem' }}>
//                             <span className='mt-3 text-white h5'>Exousia Academy</span>
//                         </header>
//                         <div className='container' >
//                             <div className='parent-div d-flex align-items-center justify-content-center' style={{ height: '80vh' }}>
//                                 <div className='child-div p-4 shadow'>
//                                     <div className='d-flex justify-content-center shadow align-items-center mb-3 text-white' id='login' style={{
//                                         height: '15vh', width: '30vw', backgroundImage: `url(${pic})`,
//                                         backgroundRepeat: 'no-repeat',
//                                         backgroundSize: 'cover'
//                                     }}>
//                                         <span style={{ fontSize: '1.5rem' }}>LOGIN</span>
//                                     </div>
//                                     <div style={{ backgroundColor: 'transparent' }} className='text-white'>

//                                         <form onSubmit={handleSubmit(Onsubmit)} >
//                                             <div class="mb-4">
//                                                 <TextField variant='outlined' label='Username' fullWidth focused placeholder='Enter username here..'
//                                                     {...register("loginid", { required: true })}
//                                                 ></TextField>
//                                                 <p className='text-danger'>
//                                                     {errors.username?.type === "required" && "username is required"}
//                                                 </p>
//                                             </div>

//                                             <div class="mb-4">
//                                                 <FormControl fullWidth focused variant="outlined">
//                                                     <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                                                     <OutlinedInput
//                                                         placeholder='Enter password here..'
//                                                         id="outlined-adornment-password"
//                                                         type={showPassword ? 'text' : 'password'}
//                                                         {...register("pass", { required: true })}
//                                                         endAdornment={
//                                                             <InputAdornment position="end">
//                                                                 <IconButton
//                                                                     aria-label="toggle password visibility"
//                                                                     onClick={handleClickShowPassword}

//                                                                     edge="end"
//                                                                 >
//                                                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                                                 </IconButton>
//                                                             </InputAdornment>
//                                                         }
//                                                         label="Password"
//                                                     />
//                                                     <p className='text-danger'>

//                                                         {errors.password?.type === "required" && "password is required"}
//                                                     </p>
//                                                 </FormControl>
//                                             </div>

//                                             <button type='submit' className='btn btn-primary w-100'>Login</button>

//                                         </form>

//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                         <footer className='fixed-bottom d-flex justify-content-center' style={{ backgroundColor: '#002147', height: '4rem' }}>
//                             <span className='mt-3 text-white'>Designed & developed by Exousia. All rights reserved.</span>
//                         </footer>
//                     </div>
//                 </div>
//             )}
//         </>

//     )
// }

import { React, useState, useEffect } from "react";
import "../components/css/login.css";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import pic from "../img/pexels-kobe-1516440.jpg";
import { Authenticate } from "../service/api";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BallTriangle } from "react-loader-spinner";

let token;
function passtoken(tkn) {
  token = tkn;
}

export function tokenpassApi() {
  return token;
}

const initialValue = {
  username: "",
  password: "",
};

export default function Login() {
  useEffect(() => {}, []);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const [logcred, setcred] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const Onsubmit = async (data) => {
    setIsLoading(true);
    setIsBlur(true);
    try {
      const response = await Authenticate(data);
      console.log(response);
      
      if (response?.status === 200) 
      {
        const tkn = response?.data.data.accessToken;
        localStorage.setItem("token", tkn);
        Swal.fire({
          title: "Success",
          text: "Login Successful",
          icon: "success",
          confirmButtonText: "OK",
        });

        if (response.data.data.userdata.role === "student") {
          navigate(`/student/${response.data.data.userdata.user_id}`);
          localStorage.setItem("user_id", response.data.data.userdata.user_id);
        } else if (response.data.data.userdata.role === "Teacher") {
          navigate(`/teacher/${response.data.data.userdata.user_id}`);
          localStorage.setItem("user_id", response.data.data.userdata.user_id);
        } else {
          navigate("/admin");
          localStorage.setItem("user_id", "64bf2f8991eaa2d95dd880d3");
        }

        setIsLoading(false);
        setIsBlur(false);
      } else if (response.response.data.status == 422) {
        Swal.fire({
          title: "Error !",
          text: response.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        setIsLoading(false);
        setIsBlur(false);
      } else {
        Swal.fire({
          title: "Error !121",
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
      setIsLoading(false);
      setIsBlur(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { username, password } = logcred;

  const onValueChange = (event) => {
    setcred({ ...logcred, [event.target.name]: event.target.value });
  };

  return (
    <>
      {isLoading && (
        <div className="loading-container">
          <BallTriangle
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="loading"
          />
        </div>
      )}

      <div
        className={`container-fluid login-page px-0 ${isLoading ? "blur" : ""}`}
      >
        <div />
        <header
          className="d-flex justify-content-center"
          style={{ backgroundColor: "#002147", height: "4rem" }}
        >
          <span className="mt-3 text-white h3">ADHYAYAN COACHING CLASSES</span>
        </header>
        <div className="container">
          <div
            className="parent-div d-flex align-items-center justify-content-center"
            style={{ height: "80vh" }}
          >
            <div className="child-div p-4 shadow">
              <div
                className="d-flex justify-content-center shadow align-items-center mb-3 text-white"
                id="login"
                style={{
                  height: "15vh",
                  width: "30vw",
                  backgroundImage: `url(${pic})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>LOGIN</span>
              </div>
              <div
                style={{ backgroundColor: "transparent" }}
                className="text-white"
              >
                <form onSubmit={handleSubmit(Onsubmit)}>
                  <div class="mb-4">
                    <TextField
                      variant="outlined"
                      label="Username"
                      fullWidth
                      focused
                      placeholder="Enter username here.."
                      {...register("loginid", { required: true })}
                    ></TextField>
                    <p className="text-danger">
                      {errors.username?.type === "required" &&
                        "username is required"}
                    </p>
                  </div>

                  <div class="mb-4">
                    <FormControl fullWidth focused variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        placeholder="Enter password here.."
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        {...register("pass", { required: true })}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      <p className="text-danger">
                        {errors.password?.type === "required" &&
                          "password is required"}
                      </p>
                    </FormControl>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer
          className="fixed-bottom d-flex justify-content-center"
          style={{ backgroundColor: "#002147", height: "4rem" }}
        >
          <span className="mt-3 text-white">
            Designed & developed by Exousia. All rights reserved.
          </span>
        </footer>
      </div>
    </>
  );
}
