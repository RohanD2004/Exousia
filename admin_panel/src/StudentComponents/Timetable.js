import {React,useEffect} from "react";
import Sidebar from "../StudentComponents/studentSidebar.tsx";
import { Box } from "@mui/material";
import Header from '../components/header.js';
import { useNavigate } from "react-router-dom";
function TimeTable() {
  const temp= localStorage.getItem('token');
  const navigate= useNavigate();


  useEffect(() => {
    console.log(temp);
    if(temp ===null){
      navigate('/');
    }
  }, [temp])
  return (
    <>
      <Box sx={{ display: 'flex'}} >
        <Sidebar/>
        <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
        <Box sx={{ flexGrow: 1 }}>
        <Header title="Timetable"/>
        </Box>
        <div className="p-2 mt-5 shadow table-responsive bg-white">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Time</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>9:00 AM - 10:00 AM</td>
                  <td>Math</td>
                  <td>Science</td>
                  <td>English</td>
                  <td>History</td>
                  <td>Physical Education</td>
                </tr>
                <tr>
                  <td>10:00 AM - 11:00 AM</td>
                  <td>Science</td>
                  <td>Math</td>
                  <td>Geography</td>
                  <td>English</td>
                  <td>Art</td>
                </tr>
                <tr>
                  <td>11:00 AM - 12:00 PM</td>
                  <td>History</td>
                  <td>English</td>
                  <td>Math</td>
                  <td>Science</td>
                  <td>Music</td>
                </tr>
                <tr>
                  <td>12:00 PM - 1:00 PM</td>
                  <td>Lunch Break</td>
                  <td>Lunch Break</td>
                  <td>Lunch Break</td>
                  <td>Lunch Break</td>
                  <td>Lunch Break</td>
                </tr>
                <tr>
                  <td>1:00 PM - 2:00 PM</td>
                  <td>Physical Education</td>
                  <td>History</td>
                  <td>Science</td>
                  <td>Math</td>
                  <td>Geography</td>
                </tr>
                <tr>
                  <td>2:00 PM - 3:00 PM</td>
                  <td>Art</td>
                  <td>Geography</td>
                  <td>Music</td>
                  <td>Physical Education</td>
                  <td>Science</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </Box>
    </>
  );
          
}
export default TimeTable;