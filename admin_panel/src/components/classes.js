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
let Stdno;



function getStd(std) {
  Stdno = std;
}

export function passStd() {
  return Stdno;
}







function TextLinkExample() {
  const temp= localStorage.getItem('token');

  const [classes, setlayout] = useState([]);


  const gettotallayout = async () => {
    let response = await getclass()
    setlayout(response?.data);
  }
  let ct = "Class Teacher:";
  let history = useNavigate();

  useEffect(() => {
    console.log(temp);
    if(temp ===null){
      history('/');
    }
  }, [temp])

  useEffect(() => {
    gettotallayout();
  }, []);


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
          <div className="container list-group listgroup">


            {classes.map((user) => (

              <>

                <div className="card">
                  <div className="card-header">
                    <b>{ct}</b> shubham kahdekar

                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{user.std} standard</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <Link to={`/admin/classes/std/${user._id}`} style={{ color: 'white', textDecoration: 'none' }} > <button className="btn btn-primary" href="#data" onClick={() => getStd(user._id)} >checkout </button> </Link>
                  </div>
                </div >
                <br />
              </>

            ))}
            {/* <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">2nd standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/2" style={{ color: 'white', textDecoration: 'none' }}>  <button className="btn btn-primary"   href="#data" onClick={() => getStd(2)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">3rd standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/3" style={{ color: 'white', textDecoration: 'none' }}>  <button className="btn btn-primary"   href="#data" onClick={() => getStd(3)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">4th standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/4" style={{ color: 'white', textDecoration: 'none' }}>  <button className="btn btn-primary"   href="#data" onClick={() => getStd(4)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">5th standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/5" style={{ color: 'white', textDecoration: 'none' }}>  <button className="btn btn-primary"   href="#data" onClick={() => getStd(5)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">6th standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/6" style={{ color: 'white', textDecoration: 'none' }}><button className="btn btn-primary"   href="#data"onClick={() => getStd(6)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">7th standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/7" style={{ color: 'white', textDecoration: 'none' }}><button className="btn btn-primary"   href="#data" type='button' onClick={() => getStd(7)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">8th standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/8" style={{ color: 'white', textDecoration: 'none' }}><button className="btn btn-primary"   href="#data" type='button' onClick={() => getStd(8)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">9th standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/9" style={{ color: 'white', textDecoration: 'none' }}> <button className="btn btn-primary"   href="#data" type='button' onClick={() => getStd(9)}> checkout </button></Link>
              </div>
            </div>
            <br />
            <div className="card">
              <div className="card-header">
                <b>{ct}</b> shubham kahdekar
              </div>
              <div className="card-body">
                <h5 className="card-title">10th standard</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="std/10" style={{ color: 'white', textDecoration: 'none' }}> <button className="btn btn-primary"   href="#data" type='button' onClick={() => getStd(10)}> checkout </button> </Link>
              </div>
            </div> */}
            <br />
          </div>
          {/* <div class="modal fade modal-lg ms-5" id="data" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <button 
                    onClick={()=>history("/classes")}
                    type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                </div>
                <div class="modal-body">
                  <Routes>
                    <Route path="std/:std?" element={<Std />}>
                    </Route>

                  </Routes>
                </div>
              </div>
            </div>
          </div> */}
        </Box>
      </Box>
    </>
  );
}
export default TextLinkExample;

