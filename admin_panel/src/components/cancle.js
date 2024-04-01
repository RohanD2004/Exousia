import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Sidenav from "../components/sidebar.tsx"
import { useState, useEffect } from 'react';
import { getAllStudent } from '../service/api.js';
import Header from '../components/header.js';
import PersonIcon from '@mui/icons-material/Person';
import Loading from './Loading.js';
import {getCancelStudent} from '../service/api.js'
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



export default function Cancle() {
  const temp = localStorage.getItem('token');
  const [students, setStudent] = useState([]);
  const [sname, setSname] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  document.body.style.backgroundColor = "#EFEFEF"
  
 const AdmissionCancel= async()=>{
  const response= await getCancelStudent()
  setStudent(response.data.data);
  }
  

  useEffect(()=>{
    AdmissionCancel();
  },[])
  return (

    <Box sx={{ display: 'flex', backgroundColor: "#EFEFEF", }}>

      <Sidenav />
      <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
      <Header title="Admission Cancel" />
      <div className="App">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="m-3">Student Details</h2>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-left">
                <thead className="table table-dark">
                  <tr>
                    <th scope='col'><b>Name</b></th>
                    <th scope='col'><b>Standard</b></th>
                    <th scope='col'><b>Gender</b></th>
                    <th scope='col'><b>Contact No</b></th>
                    <th scope='col'><b>Email</b></th>
                    <th scope='col'><b>Fee</b></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td><b>{student.name}</b></td>
                      <td>{student.stdfeesinfo.std}</td>
                      <td>{student.gen}</td>
                      <td>{student.contact}</td>
                      <td>{student.email}</td>
                      <td>{student.feesPaid+"/"+student.stdfeesinfo.total_fees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Box>
       
    </Box>
  )
}



// import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   const [students, setStudents] = useState([
//     {
//       name: 'Kishori Birari',
//       standard: '2nd',
//       gender: 'Female',
//       contactNo: '1234567890',
//       email: 'kishori@gmail.com',
//       fee: '8000'
//     }
//   ]);

//   const addStudent = () => {
//     setStudents([...students, {
//       name: 'Student Name',
//       standard: '',
//       gender: '',
//       contactNo: '',
//       email: '',
//       fee: ''
//     }]);
//   };

//   return (
//     <div className="App">
//       <div className="d-flex justify-content-between align-items-center">
//         <div>
//           <h2 className="m-3">Student Details</h2>
//         </div>
//         <div>
//           <button type='button' className='btn btn-primary m-3 px-3 py-2 btn-lg' onClick={addStudent}><b>+</b></button>
//         </div>
//       </div>
//       <div className="container-fluid">
//         <div className="card">
//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-striped table-bordered text-left">
//                 <thead className="table table-dark">
//                   <tr>
//                     <th scope='col'><b>Name</b></th>
//                     <th scope='col'><b>Standard</b></th>
//                     <th scope='col'><b>Gender</b></th>
//                     <th scope='col'><b>Contact No</b></th>
//                     <th scope='col'><b>Email</b></th>
//                     <th scope='col'><b>Fee</b></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student, index) => (
//                     <tr key={index}>
//                       <td><b>{student.name}</b></td>
//                       <td>{student.standard}</td>
//                       <td>{student.gender}</td>
//                       <td>{student.contactNo}</td>
//                       <td>{student.email}</td>
//                       <td>{student.fee}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
