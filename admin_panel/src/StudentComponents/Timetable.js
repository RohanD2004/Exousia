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
                  <th>Day</th>
                  <th>2:00 - 2:45</th>
                  <th>2:45 - 3:30</th>
                  <th>3:30 - 4:15</th>
                  <th>4:15 - 5:00</th>
                  <th>5:00 - 5:45</th>
                  <th>5:45 - 6:30</th>
                  <th>6:30 - 7:15</th>
                  <th>STD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={6}>Monday <br></br>-<br></br> Thursday</td>
                  <td>Math</td>
                  <td>English</td>
                  <td>Science</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>5th</td>
                </tr>
                <tr>
                  <td>English</td>
                  <td>Science</td>
                <td>Math</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>6th</td>
                </tr>
                <tr>
                  <td>Science</td>
                <td>Math</td>
                  <td>English</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>7th</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Math</td>
                  <td>English</td>
                  <td>Science</td>
                  <td>-</td>
                  <td>8th</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>English</td>
                  <td>Science</td>
                <td>Math</td>
                  <td>-</td>
                  <td>9th</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Marathi</td>
                <td>Math</td>
                  <td>English</td>
                  <td>Science</td>
                  <td>10th</td>
                </tr>
                <tr>
                  <td rowSpan={6}>Friday <br></br>-<br></br> Saturday</td>
                  <td>Math</td>
                  <td>English</td>
                  <td>Science</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>5th</td>
                </tr>
                <tr>
                  <td>English</td>
                  <td>Science</td>
                <td>Math</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>6th</td>
                </tr>
                <tr>
                  <td>Science</td>
                <td>Math</td>
                  <td>English</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>7th</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>Sanskrut</td>
                  <td>Math</td>
                  <td>English</td>
                  <td>-</td>
                  <td>8th</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                <td>Math</td>
                  <td>English</td>
                  <td>Sanskrut</td>
                  <td>-</td>
                  <td>9th</td>
                </tr>
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>History/<br></br>Geography/<br></br>Civics</td>
                  <td>English</td>
                <td>Math</td>
                  <td>Sanskrut</td>
                  <td>10th</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-2 mt-5 shadow bg-white">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Math</td>
                  <td>Gajanan Phuke</td>
                </tr>
                <tr>
                  <td>English</td>
                  <td>Raosaheb Pungle</td>
                </tr>
                <tr>
                  <td>Science</td>
                  <td>Priyanka Chandanse</td>
                </tr>
                <tr>
                  <td>Marathi</td>
                  <td>Ashish Jadhav</td>
                </tr>
                <tr>
                  <td>Sanskrut</td>
                  <td>Priyanka Chandanse</td>
                </tr>
                <tr>
                  <td>History/Geography/Civics</td>
                  <td>Sandip Wagh</td>
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