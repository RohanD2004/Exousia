import {React,useEffect,useState} from "react";
import Sidebar from "../TeacherComponent/TeacherSidebar.tsx";
import { Box } from "@mui/material";
import Header from '../components/header.js';
import { useNavigate } from "react-router-dom";
import {getTimetableForTeacher} from "../service/api.js"

function TeacherTimeTable() {
  const temp= localStorage.getItem('token');
  const navigate= useNavigate();
 const stdids= localStorage.getItem('std_ids').split(',');
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
    if(temp ===null){
      navigate('/');
    }
  }, [temp])

  const getData=async()=>{
    const response= await getTimetableForTeacher(stdids);
    setTimetable(response.data.data);
  }

  useEffect(() => {
   getData();
  }, [])
  return (
    <>
      <Box sx={{ display: 'flex'}} >
        <Sidebar/>
        <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
        <Box sx={{ flexGrow: 1 }}>
        <Header title="Timetable"/>
        </Box>

        {
          timetable.map((data)=>{

            return(
              <>
  <div className="p-2 mt-5 shadow table-responsive bg-white">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
              {
                  data.std=="10th"?
                  <tr>
                  <th>Day</th>
                  <th>{data.time1}</th>
                  <th>{data.time2}</th>
                  <th>{data.time3}</th>
                  <th>{data.time4}</th>

                  <th>STD</th>
                </tr>
                  :
                  <tr>
                  
                  <th>Day</th>
                  <th>{data.time1}</th>
                  <th>{data.time2}</th>
                  <th>{data.time3}</th>
                  <th>STD</th>
                </tr>
                }
              </thead>
              <tbody>
              {
                  days.map((day,index) => {

                    return (
                      data.std=="10th"?
                      <>
                      <tr>
                        <td >{day} </td>
                        <td>{ index==5 ||  index==4 && data.std=="10th" ? data.sub6: data.sub1}</td>
                        <td>{data.sub2}</td>
                        <td>{ data.sub3}</td>
                        <td>{ index==5 || index==4 && data.std=="10th" ?data.sub5:data.sub4}</td>
                        <td>{data.std}</td>
                      </tr>
                    </>

                      :

                     <>
                       {
                        data.std=="9th"?
<tr>
                            <td >{day} </td>
                            <td>{ index==4 || index==5 ?data.sub4 : data.sub1}</td>
                            <td>{data.sub2}</td>
                            <td>{ index==5 || index==4 ?data.sub4 : data.sub3}</td>
                            <td>{data.std}</td>
                          </tr>

                        :
                        <tr>
                            <td >{day} </td>
                            <td>{ data.sub1}</td>
                            <td>{data.sub2}</td>
                            <td>{ data.sub3}</td>
                            <td>{data.std}</td>
                          </tr>

                       }
                          

                        </>
                      
                    )
                  })
                }
          
              </tbody>
            </table>
          </div>
              </>
            )
          })
        }
      

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
export default TeacherTimeTable;