// import React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ViewListIcon from '@mui/icons-material/ViewList';
// import { Box } from '@mui/material';
// import Sidenav from "../components/sidebar.tsx"

// export default function Teacher() {

//     return (

//         <>
//               <Box sx={{ display: 'flex' }}>
//                 <Sidenav />
//                 <Box component="main" sx={{flexGrow: 1,p:3}} >
//                 <div class="container list-group listgroup">

//                     <div class="row">
//                         <a href="#" class=" col list-group-item list-group-item-action" aria-current="true">


//                             <div class="d-flex w-100 justify-content-between">
//                                 <h5 class="mb-1">Shubham Khadekar</h5>
//                                 <small>Marathi</small>
//                             </div>
//                             <p class="mb-1"> <b> Designation:- </b> teacher </p>
//                             <small><b>Classes:-</b>1,10</small>
//                         </a>
//                         <ToggleButton className='col col-xxl-1' value="list" aria-label="list">
//                             <ViewListIcon />
//                         </ToggleButton>
//                     </div>
//                     <br />


//                     <div class="row">
//                         <a href="#" class="col list-group-item list-group-item-action">
//                             <div class="d-flex w-100 justify-content-between">
//                                 <h5 class="mb-1">Pranav Mirkar</h5>
//                                 <small class="text-muted">English</small>
//                             </div>
//                             <p class="mb-1"> <b>Designation:-</b> teacher </p>
//                             <small class="text-muted"><b>Classes:-</b>5,10</small>
//                         </a>
//                         <ToggleButton className='col col-xxl-1' value="list" aria-label="list">
//                             <ViewListIcon />
//                         </ToggleButton>
//                     </div>
//                 </div>

//             </Box>
//             </Box>
//         </>
//     )

// }

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Sidenav from "../components/sidebar.tsx"
import { useState, useEffect } from 'react';
import { getAllteacher } from '../service/api.js';
import ViewListIcon from '@mui/icons-material/ViewList';
import ToggleButton from '@mui/material/ToggleButton';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { deleteTeacher } from '../service/api.js';
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

export default function Student() {

  const [teachers, setTeacher] = useState([]);
  const [tname, settname] = useState("");
  useEffect(() => {
    getAllTeacher2();
  }, []);

  const getAllTeacher2 = async () => {
    let response = await getAllteacher();
    setTeacher(response?.data.data);
  }

  let history = useNavigate();


  const deleteTeacherData = async(id)=>{


    Swal.fire({
      title: 'Are you sure?',
      text: "Do You won't to delete Teacher!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response =   await deleteTeacher(id);
        if (response?.status === 200) {
          getAllTeacher2();
          Swal.fire({
            title: "Success",
            text: "Teacher deleted Successful",
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

   
    
  }

  const navigate= useNavigate();
  const temp= localStorage.getItem('token');
  useEffect(() => {
    console.log(temp);
    if(temp ===null){
      navigate('/');
    }
  }, [temp])

  return (

    <Box sx={{ display: 'flex' }}>

      <Sidenav />

      <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ backgroundColor: '#002147' }}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Teacher
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={(e) => settname(e.target.value)}
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
              <h2>Teacher</h2>
            </div>

            <div class="col-auto text-end float-start ms-auto download-grp me-5">
              <button className='btn btn-primary' onClick={() => history("admission")}><AiOutlinePlus size={30} /> </button>
            </div>

          </div>
          <div class="card-body">

            <div class="container list-group listgroup  mt-4">

              {

                teachers.filter((element) =>
                  element.name.includes(tname))
                  .map((element) => {
                    return (
                      <><div class="row">
                        <a href="#" class=" col list-group-item list-group-item-action" aria-current="true">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{element.name}</h5>
                            <small>{element.subjects}</small>
                          </div>
                          <p class="mb-1"> <b> Designation:- </b> teacher </p>
                          <small><b>Classes:-</b>{element.Asignclass}</small>
                        </a>
                        <ToggleButton className='col col-xxl-1' value="list" aria-label="list">
                          <button onClick={()=>history(`view/${element._id}`)}>
                          <AccountBoxSharpIcon />
                          </button>
                        </ToggleButton>
                        <ToggleButton
                          className="col col-xxl-1"
                          value="list"
                          aria-label="list"
                        
                        >
                          <button className='btn' type='btn'
                            onClick={()=>deleteTeacherData(element._id)}
                          >

                          <DeleteSharpIcon />
                          </button>
                        </ToggleButton>
                      </div>
                        <br /></>

                    )
                  }
                  )

              }

            </div>
          </div>
        </div>
      </Box>
    </Box >
  )
}

