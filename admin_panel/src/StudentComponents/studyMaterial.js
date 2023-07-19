import 'bootstrap';
import { React,useEffect} from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../StudentComponents/studentSidebar.tsx';
import Header from '../components/header.js';
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function StudyMaterial() {
  document.body.style.backgroundColor = "#EFEFEF"


  const temp= localStorage.getItem('token');
  const navigate= useNavigate();


  useEffect(() => {
    if(temp ===null){
      navigate('/');
    }
  }, [temp])
  return (
    <div>
      <Box sx={{ display: 'flex'}} >
      <Sidebar />
      <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >
      <Box sx={{ flexGrow: 1 }}>
        <Header title="Study Material"/>
      </Box>
      <div className="shadow mt-5">
          <table class="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">PDF</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hindi</td>
                <td>
                  <IconButton aria-label="download" color="primary">
                    <DownloadForOfflineIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <td>English</td>
                <td>
                  <IconButton aria-label="download" color="primary">
                    <DownloadForOfflineIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <td>Science</td>
                <td>
                  <IconButton aria-label="download" color="primary">
                    <DownloadForOfflineIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <td>Mathematics</td>
                <td>
                  <IconButton aria-label="download" color="primary">
                    <DownloadForOfflineIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <td>History</td>
                <td>
                  <IconButton aria-label="download" color="primary">
                    <DownloadForOfflineIcon />
                  </IconButton>
                </td>
              </tr>
              <tr>
                <td>Geography</td>
                <td>
                  <IconButton aria-label="download" color="primary">
                    <DownloadForOfflineIcon />
                  </IconButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
      </Box>
    </div>
  );
}
