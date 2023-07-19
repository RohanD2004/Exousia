import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Button} from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Sidenav from "../components/sidebar.tsx"
import { useState, useEffect } from 'react';
import { getAllStudent } from '../service/api.js';
import {AiOutlinePlus} from 'react-icons/ai';
import {useNavigate} from"react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
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

export default function Student() {
  const temp= localStorage.getItem('token');
  const [students, setStudent] = useState([]);
  const [sname, setSname] = useState("");


  const getAllStudent2 = async () => {
    let response = await getAllStudent();
    setStudent(response?.data.data);
  }
  // students.map((user,index)=>(

  //   console.log(user.stdfeesinfo[index].std)
  // ))
  // console.log(students)
  let history = useNavigate();

  useEffect(() => {
    console.log(temp);
    if(temp ===null){
      history('/');
    }
  }, [temp])

  useEffect(() => {
    getAllStudent2();
  }, []);

   document.body.style.backgroundColor="#EFEFEF"
  return (

    <Box sx={{ display: 'flex' , backgroundColor: "#EFEFEF",  }}>

      <Sidenav />
      <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" style={{ backgroundColor: '#002147' }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                  Students
                </Typography>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={(e) => setSname(e.target.value)}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Toolbar>
            </AppBar>
          </Box>
          <div class="card comman-shadow mt-5">
            <div class="row align-items-center mt-3">

              <div className='col ms-3'>
                <h2> Add Student</h2>
              </div>

              <div class="col-auto text-end float-start ms-auto download-grp me-5">
                <button className='btn btn-primary' onClick={ ()=>history("admission")}><AiOutlinePlus size={30}/> </button>
              </div>

            </div>
            <div class="card-body">

              <div className=' mt-2 table-responsive'>
                <table class=" table-striped  table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Standard</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Contact No</th>
                      <th scope="col">Email/Username</th>
                      <th scope="col">Fees</th>
                      <th scope="col"></th>
                    </tr>



                  </thead>
                  <tbody>
                    {
                      students.filter((user,index) =>
                        user.name.includes(sname))
                        .map((user,index) => {

                          return  user.feesPaid === user.stdfeesinfo.total_fees ?
                          <tr className='table-success'>
                            <th scope="row"  >{user.name}</th>
                            <td >{user.stdfeesinfo.std}th</td>
                            <td >{user.gen}</td>
                            <td  >{user.contact}</td>
                            <td >{user.email}</td>
                            <td >{user.feesPaid}/{user.stdfeesinfo.total_fees}</td>
                            <td ><Button onClick={()=>history(`view/${user._id}`)} type='btn' startIcon={<PersonIcon/>}>  </Button></td>

                          </tr>
                          :
                          <tr>
                          <th scope="row"  >{user.name}</th>
                          <td >{user.stdfeesinfo.std}th</td>
                          <td >{user.gen}</td>
                          <td  >{user.contact}</td>
                          <td >{user.email}</td>
                          <td >{user.feesPaid}/{user.stdfeesinfo.total_fees}</td>
                          <td ><Button onClick={()=>history(`view/${user._id}`)} type='btn' startIcon={<PersonIcon/>}>  </Button></td>

                        </tr>

                        })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  )
}
