import React from 'react'
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'bootstrap';
import { getStudent, deleterStudent } from '../service/api';
import { passStd } from './classes';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import Swal from "sweetalert2";
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
export default function Classlayout() {
  const navigate = useNavigate();
  const temp = localStorage.getItem('token');
  const [sname, setSname] = useState("");
  const [students, setStudent] = useState(null);


  const getAllStudent = async () => {
    let response = await getStudent(passStd());
    setStudent(response?.data.data);
  }

  const deleteStudentData = async (id) => {

    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do You won't to delete student!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleterStudent(id);
          if (response?.status == 200) {
            getAllStudent();
            Swal.fire({
              title: "Success",
              text: "Student deleted Successful",
              icon: "success",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
              } else if (result.isDenied) {
                Swal.fire('Nothing to display')
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

    }


  }

  useEffect(() => {
    console.log(temp);
    if (temp === null) {
      navigate('/');
    }
  }, [temp])

  useEffect(() => {
    getAllStudent();
  }, []);

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#EFEFEF" }}>

      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: '#002147' }}>
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
          <table class="table-striped table">
            <thead>
              <tr>
                <th scope="col" className='col-md-2 col-xl-1'>Id</th>
                <th scope="col" className='col-md-6 col-xl-2 col-sm-6'>Name</th>
                <th scope="col" className='col-md-3 col-xl-2 col-sm-3'>Contact No</th>
                <th scope="col" className='col-md-4 col-xl-1'>Fees</th>
                <th scope="col" className='col-md-2 col-xl-2'></th>
              </tr>
            </thead>
            <tbody>
              {
                students?.filter((user) =>
                  user.name.includes(sname))
                  .map((user) => {

                    return <tr>
                      <th scope="row"  >{user._id}</th>
                      <td >{user.name}</td>
                      <td  >{user.contact}</td>
                      <td >{user.Alternet_contact}</td>
                      <td  ><Button component={Link} to={`/admin/classes/std/edit/${user._id}`} startIcon={<EditIcon />}>
                      </Button><Button onClick={() => deleteStudentData(user._id)} startIcon={<DeleteIcon />}>
                        </Button></td>
                    </tr>

                  })

              }
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  )
}
