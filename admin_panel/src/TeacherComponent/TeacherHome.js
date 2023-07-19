import React from 'react'
import { Box } from '@mui/material'
import Header from '../components/header'
import Profile from '../TeacherComponent/profile'
import Sidebar from '../TeacherComponent/TeacherSidebar.tsx'

export default function TeacherHome() {
  document.body.style.backgroundColor="#EFEFEF"
  return (
    <Box sx={{ display: 'flex' }} >
        <Sidebar/>
    <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
      <Profile/>

      </Box>
      </Box>
    
  )
}
