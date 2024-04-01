
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { GetStudentStd, updateMark, getStudentMarkData } from '../service/api';
import { React, useEffect, useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import Sidebar from './TeacherSidebar.tsx'
import Header from "../components/header.js";
import '../components/css/Exam.css'
import { GetFees, viewTeacher2, getStandards, getTeacherMarkData } from "../service/api"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';

export default function Viewmark() {
  const { id } = useParams();

  const [subject, setSubject] = useState('');
  const [Standard, setStandard] = useState('');
  const [feesstd, setfeesStd] = useState([])
  const [student, setStudent] = useState([]);
  const [student2, setStudent2] = useState([]);
  const [Sub, setSub] = useState([]);
  const [markData, setMarkData] = useState([]);

  const [testName, setTestName] = useState([]);
  const [test, setTest] = useState('');

  const [filteredMarkData, setFilteredMarkData] = useState([]);


  const [assign_class, setassignclass] = useState([]);
  const temp = localStorage.getItem('user_id')
  const result = Number(temp);


  const [date, setDate] = useState([]);


  const handleChange = (event) => {
    setSubject(event.target.value);
    setDate({ ...date, [event.target.name]: event.target.value })
  };

  const handleChange2 = (event) => {
    setStandard(event.target.value);
    const data = event.target.value;
    setStudent({ ...student, [event.target.name]: event.target.value })
    setDate({ ...date, [event.target.name]: event.target.value })
  };

  const handleChange3 = (event) => {
    const selectedTest = event.target.value;
    setTest(selectedTest);

    // Clear filteredMarkData before populating with new data
    setFilteredMarkData([]);

    const updatedTestName = [];
    for (let i = 0; i < markData.length; i++) {
      if (markData[i].testName === selectedTest) {
        updatedTestName.push(markData[i]);
      }
    }

    setFilteredMarkData(updatedTestName);

  };

  useEffect(() => {
    // Log filteredMarkData after it's updated
    console.log(filteredMarkData);
    getStudentData(filteredMarkData)
  }, [filteredMarkData]);

  const getStudentData = async (data) => {
    console.log(data);
    const response = await getStudentMarkData(data);
    setStudent2(response?.data.data);

  }

  const getAllStudent = async (data) => {
    let response = await GetStudentStd(data);
    setStudent2(response?.data.data);
  }

  const fees = async () => {
    try {



    } catch (error) {
      Swal.fire({
        title: 'Error !',
        text: error,
        icon: 'error',
      });
    }
  }
  const handleMarkSubmit = (event, id) => {
    setDate({ ...date, [event.target.name]: event.target.value, ["stuId"]: id })

  };

  const [markSuccess, setMarkSuccess] = useState(false)
  const [updatedStudentId, setUpdatedStudentId] = useState(null);


  const AddMark = async () => {

    console.log(date);
    if (parseInt(date.score) == 0 || date.score == '') {
      Swal.fire({
        title: 'Error !',
        text: "Mark should not be zero",
        icon: 'error',
      });
      setMarkSuccess(false);
    }
    else {
      try {
        let response = await updateMark(date);

        if (response?.status === 200) {
          console.log(response);
          setMarkSuccess(true);
          setUpdatedStudentId(date.stuId); // Set the ID of the updated student
          setTimeout(() => {
            setMarkSuccess(false);
            // Reset the updated student ID after 2 seconds
          }, 2000);
        } else if (response.response.data.status === 400) {
          // Display a message indicating that the mark already exists
          console.log(response.response.data.message);
          Swal.fire({
            title: 'Error !',
            text: response.response.data.message.toString(),
            icon: 'error',
          });
        } else {
          // Display a generic error message
          console.error("Failed to update mark");
        }
      } catch (error) {
        // Display a generic error message
        console.error("Failed to update mark");
      }

    }

  }

  //   const getData = async()=>
  //   {
  //     const response= await getTeacherMarkData(date);
  //     console.log(response.data.data);

  //     for(let i=0;i<response.data.data.length;i++)
  //     {

  //         setTestName[i]=response.data.data[i].testName;
  //         console.log(response.data.data[i].testName)

  //     }
  //     console.log(testName);
  //   }

  const getData = async () => {
    try {
    
      const response = await getTeacherMarkData(date);


      if(response.status==200)
      {
        Swal.fire({
          title: 'Success',
          text: "Test data get succesfully",
          icon: 'success',
        });
      }
      setMarkData(response.data.data);
      // Create a copy of testName state array
      const updatedTestName = [...testName];
      const testNameSet = new Set(updatedTestName);
      
      for (let i = 0; i < response.data.data.length; i++) {
        // Check if the testName is not already in the set
        if (!testNameSet.has(response.data.data[i].testName)) {
          updatedTestName.push(response.data.data[i].testName);
          testNameSet.add(response.data.data[i].testName);
        }
      }
      

      // Set the updated testName state array
      setTestName(updatedTestName);
      console.log(updatedTestName);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
  };


  const getTeacherData = async () => {
    try {
      const response = await viewTeacher2(result);
      if (response.status === 200) {
        const teacherData = response.data.data[0];
        setSub(teacherData); // Set the teacher's data in 'Sub' state
        const stdids = response?.data.data[0].Asignclass;
        const response2 = await getStandards(stdids);
        setassignclass(response2?.data)

        console.log(response2?.data);
        let list = [];
        if (response2?.data && response2?.data) {
          list = response2?.data.map((item) => {
            return {
              key: item._id,
              text: item.std,
              value: item._id,
            };
          });

        }
        setfeesStd(list);
      }
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };
  const [max_mark, setMaxMark] = useState('');

  useEffect(() => {

    getTeacherData();
    fees();
  }, [result])


  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Header title="Exams" />
        </Box>

        <div className='mt-4 p-2 container-fluid shadow'>
          <div className='row px-5'>
            <div className='col-lg-3 mb-2'>
              <Typography
                className='mt-2'
                variant="h4"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                View Marks
              </Typography>
            </div>



            <div className='col-lg-2 mb-2'>
              <FormControl fullWidth focused>
                <InputLabel id="select-label" >Subject</InputLabel>
                <Select
                  labelId="select-label"
                  id="select-subject"
                  name='sub'
                  value={subject}
                  label="Subject"
                  onChange={handleChange}
                >
                  {Sub && Sub.subjects && Sub.subjects.map((sub, index) => (
                    <MenuItem key={index} value={sub}>{sub}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className='col-lg-2 mb-2'>
              <FormControl fullWidth focused>
                <InputLabel id="select-label" >Standard</InputLabel>
                <Select
                  labelId="select-label"
                  name='std'
                  id="select-std"
                  value={Standard}
                  label="Standard"
                  onChange={handleChange2}
                >
                  {feesstd.map((user) => (

                    <MenuItem value={user.value}>{user.text}</MenuItem>

                  ))}
                </Select>
              </FormControl>
            </div>

            <div className='col-lg-2 mt-2 '>
              <button className='btn btn-primary' onClick={() => getData()}>
                Get Data
              </button>
            </div>

            <div className='col-lg-2 mb-2'>
              <FormControl fullWidth focused>
                <InputLabel id="select-label" >Test Name</InputLabel>
                <Select
                  labelId="select-label"
                  name='test'
                  id="select-std"
                  value={test}
                  label="Standard"
                  onChange={handleChange3}
                >
                  {testName.map((test, index) => (

                    <MenuItem value={test}>{test}</MenuItem>

                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className='container mt-4'>
          {markSuccess && (
            <p className='alert alert-success' role='alert'>
              Mark updated successfully!
            </p>
          )}
          <table className='table table-responsive'>
            <thead className='table-dark'>
              <tr>
                <th>Name</th>
                <th className='ms-5 w-25'>Total Mark</th>
                <th className='ms-5 w-25'>Obtain Mark</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>

              {
                student2.map((user) => {
                  const markData = filteredMarkData.find((data) => data.userId === user.id);
                  return (
                    <>
                      <tr>
                        <td>
                          {user.name}

                        </td>

                        <td>
                          {markData.TotalMark}
                        </td>
                        <td >
                          {markData.score}
                        </td>
                        <td >
                          {markData.updatedAt}
                        </td>
                      </tr>
                    </>
                  )
                })
              }

            </tbody>
          </table>
        </div>
      </Box>
    </Box >
  )
}