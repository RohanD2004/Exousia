import Student_Admission from './student_admission';
import Teacher_Admission from './teacher_admission';
import Button from '@mui/material/Button';
import 'bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PiStudent } from 'react-icons/pi';
import Sidenav from "../components/sidebar.tsx";
import {useEffect} from 'react'
import {useNavigate} from"react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const temp= localStorage.getItem('token');
  const navigate= useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let history = useNavigate();

  useEffect(() => {
    console.log(temp);
    if(temp ===null){
      navigate('/');
    }
  }, [temp])

  return (
    // <Box sx={{ width: '100%'}}>
    //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3,borderColor: 'divider' }} >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Student_Admission" {...a11yProps(0)} />
          <Tab label="Teacher_Admission" {...a11yProps(1)} />
        </Tabs>
      {/* <TabPanel value={value} index={0}>
        <Student_Admission />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Teacher_Admission />
      </TabPanel> */}

      </Box>
    </Box>
  );
}
