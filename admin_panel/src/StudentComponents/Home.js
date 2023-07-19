
import Sidebar from "../StudentComponents/studentSidebar.tsx";
import Box from '@mui/material/Box';
import {React,useEffect} from 'react'
import Profile from '../StudentComponents/profile.js'
import { useNavigate } from "react-router-dom";


export default function Home (){

    
  const temp= localStorage.getItem('token');
  const navigate= useNavigate();


  useEffect(() => {
    if(temp ===null){
      navigate('/');
    }
  }, [temp])
    return (


        <Box sx={{ display: 'flex' }}>

            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
                <Profile/>
            </Box>
        </Box>

    )
}



