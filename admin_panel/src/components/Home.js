import React, { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import './css/homepage.css';
import '@fontsource/roboto/700.css';
import Sidenav from "./sidebar.tsx";
import Avatar from '@mui/material/Avatar';
import itsme from './assets/itsMe.jpg'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { FaUsers } from 'react-icons/fa';
import { FaRupeeSign } from 'react-icons/fa';
import { TfiAnnouncement } from 'react-icons/tfi';
import { TextField, Input } from '@mui/material';
import { getTotalCount } from '../service/api';
import { useForm } from 'react-hook-form';
import { setFees } from '../service/api';
import SendIcon from '@mui/icons-material/Send';
import { getData } from '../service/api';
import { addpayFees } from '../service/api';
import Swal from "sweetalert2";
import {  useNavigate } from 'react-router-dom';
const pages = [];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
let count;
let first;
let second;
let third;
let four;
let five;
let six;
let seven;
let eight;
let nine;
let ten;
let stdinfo;
let total_fees;
let  remaining;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




export default function Homepage() {
  const navigate = useNavigate();
  const [students, setStudent] = useState([]);
  const [sname2, setSname2] = useState("");
  const temp= localStorage.getItem('token');
  
  


  let Student = [];
  const totalcount = async () => {
    count = await getTotalCount();
    first = count?.data.data[0].first;
    second = count?.data.data[0].second;
    third = count?.data.data[0].third;
    four = count?.data.data[0].fourth;
    five = count?.data.data[0].fifth;
    six = count?.data.data[0].six;
    seven = count?.data.data[0].seven;
    eight = count?.data.data[0].eight;
    nine = count?.data.data[0].nine;
    ten = count?.data.data[0].ten;
    Student = count?.data.data[0].student;
    setStudent(Student);

  }

  // number counter js
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 3000;
  valueDisplays.forEach((valueDisplay) => {
    let startvalue = 0;
    let endvalue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endvalue);
    let counter = setInterval(function () {
      startvalue += 1;
      valueDisplay.textContent = startvalue;
      if (startvalue == endvalue) {
        clearInterval(counter);
      }
    }, duration)
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    setValue,
    handleSubmit: handleSubmit2,
  } = useForm()




  const [checkbox, setCheckbox] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Search bar
  const [nest, setnext] = useState([]);

  const onSubmit = async (data) => {
    try {
    const response= await setFees(data);

    if (response.status==200) {

      Swal.fire({
        title: "Success",
        text: response.message,
        icon: "success",
        confirmButtonText: "OK",
    });
      
    } else if(response.status==500) {
      Swal.fire({
        title: "Error",
        text: response.message,
        icon: "error",
        confirmButtonText: "OK",
    });
      
    }
      
    } catch (error) {

      Swal.fire({
        title: "Error",
        text: "something went wrong !",
        icon: "error",
        confirmButtonText: "OK",
    });
      
    }
  }






  const [payFees, setPayFees] = useState([]);
  const [feesdata, setFeesdata] = useState([]);

  const onSearch = async (value, id) => {
    setSname2(value);
    // let response = await getData(id);
    // const isfound = Student.includes(id)
    let indexno;
    for (let index = 0; index < students.length; index++) {
      if (students[index]._id === id) {
        setFeesdata([])
        indexno = index;
        setFeesdata(students[index]);
      }
    }
    stdinfo = students[indexno].stdfeesinfo.std;
    total_fees = students[indexno].stdfeesinfo.total_fees;
    remaining =  total_fees - students[indexno].feesPaid;
    console.log(remaining);


  }


  const handleChange = event => {
    if (event.target.checked) {
      setCheckbox(...checkbox, [event.target.value])
    } else {
      console.log('⛔️ Checkbox is NOT checked');
    }
  };

  const sendData = () => {
    console.log(checkbox)
  }



  const onsubmit2 = async (data) => {

    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do You won't to Pay fees !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Pay it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await addpayFees(data);
          if (response?.status == 200) {
            Swal.fire({
              title: "Success",
              text: "Fees paid Successful",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/admin/recipt')
              } else if (result.isDenied) {
                Swal.fire('Fees not paid')
              }
            })

          } else {

            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
              confirmButtonText: "OK",
            })

          }
        }
      })

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
    totalcount();
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>


      <Sidenav />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: '#002147' }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Home
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => setSname2(e.target.value)}
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>

        <div className='d-flex row p-3' >
          <div class='col-md-10 '>
            <div class='row '>
              <div class='col-xl-4 col-lg-6'>
                <div class='card l-bg-cherry' style={{ backgroundColor: '#0079FF' }}>
                  <div class='card-statistic-3 p-4'>
                    <div class='card-icon me-5' style={{ color: 'black' }}><FaUsers size={100} /></div>
                    <div class='mb-4'>
                      <h5 class='card-title mb-0'>Students</h5>
                    </div>
                    <div class='row align-items-center mb-2 d-flex'>
                      <div class='col-8'>
                        <h2 class='d-flex align-items-center mb-0'>
                          <span class="num" data-val="200">000</span>
                        </h2>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class='col-xl-4 col-lg-6'>
                <div class='card l-bg-blue-dark' style={{ backgroundColor: '#00DFA2' }}>
                  <div class='card-statistic-3 p-4'>
                    <div class='card-icon card-icon-large me-5' style={{ color: 'black' }}><FaUsers size={100} /></div>
                    <div class='mb-4'>
                      <h5 class='card-title mb-0'>Teachers</h5>
                    </div>
                    <div class='row align-items-center mb-2 d-flex'>
                      <div class='col-8'>
                        <h2 class='d-flex align-items-center mb-0'>
                          <span class="num" data-val='300'>000</span>
                        </h2>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
              <div class='col-xl-4 col-lg-6'>
                <div class='card l-bg-green-dark' style={{ backgroundColor: '#FF0060' }}>
                  <div class='card-statistic-3 p-4'>
                    <div class='card-icon card-icon-large me-5'><FaRupeeSign size={100} /></div>
                    <div class='mb-4'>
                      <h5 class='card-title mb-0'>Revenue</h5>
                    </div>
                    <div class='row align-items-center mb-2 d-flex'>
                      <div class='col-8'>
                        <h2 class='d-flex align-items-center mb-0'>
                          <span class="num" data-val='300'>000</span>
                          <span>/</span>
                          <span class="num" data-val='300'>000</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>

          <div className='col-lg-4 mt-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='card mb-4 text-light' style={{ backgroundColor: '#002147' }}>
                <div className='card-body'>
                  <div class='mb-3'>
                    <label for='exampleInputEmail1' class='form-label'>Choose standard</label>
                    <select class='form-select' aria-label='Default select example'
                      {...register("std", { required: true })}
                    >
                      {/* <option selected>Open this select menu</option> */}
                      <option value='1'>1st</option>
                      <option value='2'>2nd</option>
                      <option value='3'>3rd</option>
                      <option value='4'>4th</option>
                      <option value='5'>5th</option>
                      <option value='6'>6th</option>
                      <option value='7'>7th</option>
                      <option value='8'>8th</option>
                      <option value='9'>9th</option>
                      <option value='10'>10th</option>

                      <p className='text-danger'>
                        {errors.std?.type === "required" && "std is required"}
                      </p>
                    </select>
                  </div>
                  <div class='mb-3'>
                    <label for='exampleInputPassword1' class='form-label'>Set fees</label>
                    <input class='form-control bg-light' id='exampleInputPassword1'
                      {...register("total_fees", { required: true })}
                    />
                    <p className='text-danger'>
                      {errors.fees?.type === "required" && "fees is required"}
                    </p>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <input type='submit' class='btn text-light w-75' style={{ backgroundColor: '#0079FF' }} />
                  </div>
                </div>
              </div>
            </form>

            <div className='card mb-4 mb-lg-0'>
              <div className='card-body p-0'>
                <ul className='list-group list-group-flush rounded-3'>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fas fa-globe fa-lg text-warning'></i>
                    <p className='mb-0'>https://www.google.com/</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-github fa-lg' style={{ color: '#333333' }}></i>
                    <p className='mb-0'>https://twitter.com/</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-twitter fa-lg' style={{ color: '#55acee' }}></i>
                    <p className='mb-0'>https://www.instagram.com/</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-instagram fa-lg' style={{ color: '#ac2bac' }}></i>
                    <p className='mb-0'>https://www.whatsapp.com/</p>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                    <i className='fab fa-facebook-f fa-lg' style={{ color: '#3b5998;' }}></i>
                    <p className='mb-0'>https://www.snapchat.com/</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col mt-5 p-3 shadow'>
            <strong>
              <span style={{ fontSize: '2rem' }}>Student Data</span>
            </strong>
            <div class="progress mt-1 mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${first}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><b>1st | {first} </b></div>
            </div>
            <div class="progress mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${second}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"><b>2nd | {second} </b></div>
            </div>
            <div class="progress mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${third}%` }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><b>3rth | {third} </b></div>
            </div>
            <div class="progress mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${four}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><b>4th | {four} </b></div>
            </div>
            <div class="progress mt-3 mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${five}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><b>5th | {five} </b></div>
            </div>
            <div class="progress mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${six}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"><b>6th | {six} </b></div>
            </div>
            <div class="progress mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${seven}%` }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"><b>7th | {seven} </b></div>
            </div>
            <div class="progress mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${eight}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><b>8th | {eight} </b></div>
            </div>
            <div class="progress mt-3 mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${nine}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><b>9th | {nine} </b></div>
            </div>
            <div class="progress mb-4" style={{ height: '1.5rem' }}>

              <div class="progress-bar bg-warning" role="progressbar" style={{ width: `${ten}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"><b>10th | {ten} </b></div>
            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-lg-6'>
            <div className='container-fluid shadow p-3'>
              <p className='h3'>Announcement</p>
              <div className='row'>
                <div>
                  <div className='p-3'>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='1st' value={1} onChange={handleChange} />
                      <span>1st</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='2nd' value={2} onChange={handleChange} />
                      <span>2nd</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='3rd' value={3} onChange={handleChange} />
                      <span>3rd</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='4th' value={4} onChange={handleChange} />
                      <span>4th</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='5th' value={5} onChange={handleChange} />
                      <span>5th</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='6th' value={6} onChange={handleChange} />
                      <span>6th</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='7th' value={7} onChange={handleChange} />
                      <span>7th</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='8th' value={8} onChange={handleChange} />
                      <span>8th</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='9th' value={9} onChange={handleChange} />
                      <span>9th</span>
                    </label>
                    <label class="check">
                      <input type="checkbox" id="myCheck" name='10th' value={10} onChange={handleChange} />
                      <span>10th</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className='row px-3'>
                <TextField id="outlined-basic" placeholder='Message' focused multiline minRows={8} variant="outlined" />
                <Button variant="contained" onClick={() => sendData()} endIcon={<SendIcon />} className='w-25 m-3' style={{ backgroundColor: '#0079FF' }}>
                  Send
                </Button>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='container-fluid shadow'>

              <div className='row p-3'>

                <div className='col-lg-4 '>
                  <p className='h3 me-3'>Payment</p>

                </div>
                <div className='col w-50  w'>

                  <Search fullWidth className=' text-light bg-primary text-white'  >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase

                      value={sname2}
                      onChange={(e) => setSname2(e.target.value)}
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>

                </div>
              </div>

              <div>
                {
                  students.filter((item) => {
                    const searchTerm = sname2.toLowerCase();
                    const name = item.name.toLowerCase();

                    return searchTerm && name.startsWith(searchTerm) && name !== searchTerm;
                  })
                    .map((item) => (
                      <>
                   
                      <button type="button"  onClick={() => onSearch(item.name, item._id)} class="  list-group-item list-group-item-action w-50 p-3 " >
                        <b>Name:  </b>{item.name}  <b className='ms-5'>Std:  </b> {item.stdfeesinfo.std}</button>
                     
                      </>
                    ))
                }
              </div>
              <form onSubmit={handleSubmit2(onsubmit2)}>


                <div className='row px-3 '>
                  <div className='col-lg-5 col-md-10 col-sm-10 mb-4 '>
                    <TextField label='ID' fullWidth name='feesId' value={feesdata._id} focused 
                      {...register2("feesId", { required: true })}
                    />
                  </div>
                  <div className='col-lg-6 col-md-10 col-sm-10  mb-4'>
                    <TextField label='Fees Paid ' fullWidth name='feesPaid' value={feesdata.feesPaid} focused 
                      {...register2("feesPaid", { required: true })}
                    />
                  </div>
                </div>
                <div className='row px-3  '>
                  <div className='col-lg-11 col-md-10 col-sm-10 mb-4'>
                    <TextField label='Name' name='name' value={feesdata.name} focused fullWidth 

                      {...register2("name", { required: true })}
                    />
                  </div>
                </div>
                <div className='row px-3 '>
                  <div className='col-lg-5 col-md-10 col-sm-10 mb-4'>
                    <TextField label='STD' fullWidth  name='std' value={stdinfo} focused 

                      {...register2("std", { required: true })}


                    > {stdinfo}</TextField>
                  </div>
                  <div className='col-lg-6  col-md-10 col-sm-10 mb-4'> 
                   <TextField label='CONTACT NO'  fullWidth value={feesdata.contact} focused  placeholder='Enter no' required

                    {...register2("contact", { required: true })}


                    /></div>
                </div>
                <div className='row px-3 '>
                  <div className='col-lg-5 col-md-10 col-sm-10 mb-4'>
                    <TextField label="Amount" placeholder='Enter Amount' type='numeric' focused className='mb-3'

                      {...register2("Amount", { required: true })}

                    />
                    <FaRupeeSign size={35} className='  mt-2' style={{ opacity: '30%' }} />
                  </div>
                  <div className='col-lg-5 col-md-10 col-sm-10'>
                    <TextField label={total_fees} placeholder='Remaining fees'  value={remaining} type='numeric' focused className='mb-3'

                    />
                  </div>
                </div>
                <div className='row px-4'>

                  <Button type='submit' className='w-25 d-block btn btn-primary  mb-5 ' style={{ backgroundColor: '#0079FF', color: 'white' }}
                  // data-bs-toggle="modal" href="#data"
                  >
                    Submit
                  </Button>
                </div>

              
              </form>
            </div>
          </div>
        </div>

      </Box>
    </Box>
  )
}

