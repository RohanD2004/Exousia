import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Box from '@mui/material/Box'
import ToggleButton from '@mui/material/ToggleButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import './css/student.css'
import { Link, Route, Routes } from "react-router-dom";
import Sidenav from "../components/sidebar.tsx"
import Std from "../components/std.js"
import { useNavigate } from "react-router-dom"
import { getclass } from "../service/api"
import Header from "./header";
import Loading from './Loading.js';
let Stdno;



function getStd(std) {
  Stdno = std;
}

export function passStd() {
  return Stdno;
}







function TextLinkExample() {
  const temp = localStorage.getItem('token');

  const [classes, setlayout] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const gettotallayout = async () => {
    let response = await getclass()
    setlayout(response?.data);
  }
  let ct = "Class Teacher:";
  let history = useNavigate();

  useEffect(() => {
    console.log(temp);
    if (temp === null) {
      history('/');
    }
  }, [temp])

  useEffect(() => {
    setTimeout(() => {
      // Replace this with your actual API call
      gettotallayout();

      setIsLoading(false);
    }, 3000);
  }, []);


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
          <Header title="Classes " />

          {
            isLoading ? (
              <Loading />
            ) :
              (
                <div className="container list-group listgroup mt-4">
                  {
                    classes?.map((user) => (

                      <>

                        <div className="card">
                          <div className="card-header">
                            <b>{user.std} standard</b> 

                          </div>
                          <div className="card-body">
                      
                            <Link to={`/admin/classes/std/${user._id}`} style={{ color: 'white', textDecoration: 'none' }} > <button className="btn btn-primary" href="#data" onClick={() => getStd(user._id)} >checkout </button> </Link>
                          </div>
                        </div >
                        <br />
                      </>

                    ))}
                </div>

              )
          }
        </Box>
      </Box>
    </>
  );
}
export default TextLinkExample;

