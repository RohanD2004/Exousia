import {React,useState,useEffect} from "react";
import Sidebar from "../StudentComponents/studentSidebar.tsx";
import Header from "../components/header.js";
import { Box } from "@mui/material";
import { getMarks } from "../service/api.js";
import { useParams } from "react-router-dom";
import moment from 'moment';
export default function Assessment() {

  const {id}= useParams();
  const[test,setTest]= useState([])
  const temp=localStorage.getItem('user_id');
  
  
  const getMarkData = async ()=>{
 
     const response=await getMarks(temp)
     setTest(response?.data.data)
  }

  useEffect(()=>{
    getMarkData()
  },[])
  return (
    <Box sx={{ display: 'flex'}} >
           <Sidebar />
           <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
           <Box sx={{ flexGrow: 1 }}>
        <Header title="Assessment "/>
      </Box>
      <div className="container-fluid mt-4 p-0">
      
      <div className="card shadow bg-light">
        <div className="card-body"> 
        <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{position: 'relative'}}>

        <table className="table table-hover">
         <thead className="table-dark">
          <tr className="text-uppercase">
           <th scope="col">Date</th>
           <th scope="col">Test</th>
           <th scope="col">Subject</th>
           <th scope="col">Total</th>
           <th scope="col">Obtained</th>
          </tr>
         </thead>

         <tbody className="table-success">

          {
            test?.map((test)=>{
               return(
                <>
           <tr>
            <td>{ moment(test.date).format('MMMM Do, YYYY')}</td>
            <td>{test.testName}</td>
            <td>{test.sub}</td>
            <td>{test.TotalMark}</td>
            <td>{test.score}</td>
           </tr> 
                </>
               )
            })
          }
         </tbody>
        </table>
        </div>
        </div>
      </div>

      </div>
    

 </Box>
    </Box>
    
  );
}
