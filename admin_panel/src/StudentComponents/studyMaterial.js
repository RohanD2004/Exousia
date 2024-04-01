import 'bootstrap';
import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../StudentComponents/studentSidebar.tsx';
import Header from '../components/header.js';
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFileForStudent } from "../service/api.js";
import moment from "moment";
export default function StudyMaterial() {
  document.body.style.backgroundColor = "#EFEFEF"
  const [FileData, setfileData] = useState([]);

  const temp = localStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    if (temp === null) {
      navigate('/');
    }
  }, [temp])

  const getData = async () => {
    const std_id = localStorage.getItem('std_id');
    var arr = { "std_id": std_id };

    const response = await getFileForStudent(arr);
    setfileData(response.data.data);
  }

  useEffect(() => {
    getData();
  },[])
  return (
    <div>
      <Box sx={{ display: 'flex' }} >
        <Sidebar />
        <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >

          <Header title="Study Material" />

          <div className=" mt-5  table-responsive">
            <table class=" shadow table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Subject</th>
                  <th scope="col">File Description</th>
                  <th scope="col">Download</th>
                </tr>
              </thead>
              <tbody>

                {
                  FileData.map((data) => {
                    return (
                      <>
                        <tr>
                          <td>{ moment(data.createdAt).format('MMMM Do, YYYY')}</td>
                          <td>{data.sub}</td>
                          <td>{data.description}</td>

                          <td>
                          <IconButton aria-label="download" color="primary">
                              <a href={data.file_url} download>
                                <DownloadForOfflineIcon />
                              </a>
                            </IconButton>
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
      </Box>
    </div>
  );
}
