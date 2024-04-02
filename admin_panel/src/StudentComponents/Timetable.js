import { React, useEffect, useState } from "react";
import Sidebar from "../StudentComponents/studentSidebar.tsx";
import { Box } from "@mui/material";
import Header from '../components/header.js';
import { useNavigate } from "react-router-dom";
import { getTimetable } from "../service/api.js"
function TimeTable() {
  const temp = localStorage.getItem('token');
  const std_id = localStorage.getItem('std_id')
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState([]);
  const [days, setDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]);

  useEffect(() => {
    console.log(temp);
    console.log(std_id);
    if (temp === null) {
      navigate('/');
    }
  }, [temp])


  const getData = async (id) => {
    var arr = { 'std_id': id };
    const response = await getTimetable(arr);
    setTimetable(response.data.data[0]);

  };

  useEffect(() => {
    getData(std_id)
  }, [])
  return (
    <>
      <Box sx={{ display: 'flex' }} >
        <Sidebar />
        <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
          <Box sx={{ flexGrow: 1 }}>
            <Header title="Timetable" />
          </Box>



          <div className="p-2 mt-5 shadow table-responsive bg-white">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">

                {
                  timetable.std=="10th"?
                  <tr>
                  <th>Day</th>
                  <th>{timetable.time1}</th>
                  <th>{timetable.time2}</th>
                  <th>{timetable.time3}</th>
                  <th>{timetable.time4}</th>

                  <th>STD</th>
                </tr>
                  :
                  <tr>
                  
                  <th>Day</th>
                  <th>{timetable.time1}</th>
                  <th>{timetable.time2}</th>
                  <th>{timetable.time3}</th>
                  <th>STD</th>
                </tr>
                }
              
              </thead>
              <tbody>

                {
                  days.map((day,index) => {

                    return (
                      timetable.std=="10th"?
                      <>
                      <tr>
                        <td >{day} </td>
                        <td>{ index==5 ||  index==4 && timetable.std=="10th" ? timetable.sub6: timetable.sub1}</td>
                        <td>{timetable.sub2}</td>
                        <td>{ timetable.sub3}</td>
                        <td>{ index==5 || index==4 && timetable.std=="10th" ?timetable.sub5:timetable.sub4}</td>
                        <td>{timetable.std}</td>
                      </tr>
                    </>
                      :

                     <>
                          <tr>
                            <td >{day} </td>
                            <td>{ index==4 || index==5  && timetable.std=="9th"?timetable.sub4 :timetable.sub1}</td>
                            <td>{timetable.sub2}</td>
                            <td>{ index==5 || index==4 && timetable.std=="9th"?timetable.sub4 : timetable.sub3}</td>
                            <td>{timetable.std}</td>
                          </tr>
                        </>
                      
                    )
                  })
                }



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