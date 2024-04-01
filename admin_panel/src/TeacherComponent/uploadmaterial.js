import { Box } from '@mui/material';
import Header from '../components/header';
import Sidebar from '../TeacherComponent/TeacherSidebar.tsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect, useState } from 'react'; // <-- Import React and necessary hooks
import { viewTeacher2, uploadFile, getStandards, addFileData, getuploadFIle,deleteFileFromdb } from "../service/api";
import app from "../firebase.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { BallTriangle } from 'react-loader-spinner'
import Swal from "sweetalert2";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline"
import { IconButton, Button } from "@mui/material";
import moment from 'moment'
export default function UploadMaterial() { // <-- Rename function to UploadMaterial

  const temp = localStorage.getItem('user_id');
  const result = Number(temp);
  const [subject, setSubject] = useState('');
  const [standard, setStandard] = useState('');
  const [standard_data, setStandard_data] = useState([]);
  const [file_name, setFileName] = useState('');
  const [getFileData, setgetFileData] = useState([]);

  const [Sub, setSub] = useState([]);
  const [data, setData] = useState([]);
  const storage = getStorage(app);

  const [isLoading, setIsLoading] = useState(false);
  var arr = [];
  const handleChange = (event) => {
    setSubject(event.target.value);
    setData({ ...data, [event.target.name]: event.target.value })


  };

  const handleChange2 = (event) => {
    setStandard(event.target.value);
    setData({ ...data, [event.target.name]: event.target.value })

  };

  // const DeleteFile =  async (filename,id) => {
  //   const storageRef = ref(storage, filename);

  //   deleteObject(storageRef)
  //     .then(() => {
  //      removefile(id);
  //     })
  //     .catch((error) => {
  //       console.log("Error");
  //     });
  // }

  const DeleteFile = (filename,id) => {
    const storageRef = ref(storage, filename);

    deleteObject(storageRef)
      .then(() => {
        removefile(id);
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const removefile = async(id)=>{
    var arr={'id':id};
     const res= await deleteFileFromdb(arr);
     if(res.status==200)
     {
      Swal.fire({
        title: "Success",
        text: "File deleted Successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then((res)=>{
        if(res.isConfirmed)
        {
          window.location.reload();
        }
      })
     }
  }
  const namechange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  };

  const getTeacherData = async () => {
    try {
      const response = await viewTeacher2(result);
      if (response.status === 200) {
        const teacherData = response.data.data[0];
        getFileDate(response.data.data[0].name);
        setData({ ...data, ['teacher_name']: response.data.data[0].name });
        console.log(teacherData);
        setSub(teacherData);
        const stdids = response?.data.data[0].Asignclass;
        const response2 = await getStandards(stdids);
        console.log(stdids);
        console.log(response2.data);
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
        setStandard_data(list); // Set the teacher's data in 'Sub' state
      }
    } catch (error) {
      console.log(error);
      // Handle error if necessary
    }
  };

  const getFileDate = async (data) => {

    var arr = { 'name': data }
    console.log("Name of the teacher : ", arr);
    const response = await getuploadFIle(arr);
    setgetFileData(response.data.data);

  }


  const fileUpload = (event) => {
    const selectedFile = event.target.files[0];
    const fileName = selectedFile.name; // Store the file name in a variable
    setFileName(fileName); // Update the file name state

    if (selectedFile) {
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setIsLoading(true);
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          setIsLoading(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // Update the data state with the file name
            setData({ ...data, ['file_name']: fileName, ['file_url']: downloadURL });
          });
        }
      );
    } else {
      console.log("no file selected");
    }
  };


  const addData = async () => {

    const response = await addFileData(data);
    if (response.status == 200) {

      Swal.fire({
        title: "Success",
        text: "File upload Successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then((res)=>{
        if(res.isConfirmed)
        {
          window.location.reload();
        }
      })
    }





  }


  useEffect(() => {
    getTeacherData();
    getFileDate();
  }, [result])

  return (
    <>
      {isLoading && (
        <div className="loading-container">
          <BallTriangle
            height={80}
            width={80}
            radius={9}
            color="green"
            ariaLabel="loading"
          />
        </div>
      )}
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" className='table-responsive' sx={{ flexGrow: 1, p: 3 }} >

          <Box sx={{ flexGrow: 1 }}>
            <Header title="Upload Material" />
          </Box>
          <div className='container-fluid mt-5 table-responsive bg-light shadow'>
            <div className='d-flex justify-content-center'>
              <div>
                <CloudUploadIcon color='primary' className='w-100 h-100' />
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <div>
                <select className="form-select mb-2"
                  id="select-subject"
                  name='sub'
                  value={subject}
                  onChange={handleChange}
                >
                  {Sub && Sub.subjects && Sub.subjects.map((sub, index) => (
                    <option key={index} value={sub}>{sub}</option>
                  ))}
                </select>
                <select className="form-select mb-2"
                  id="select-standard"
                  name='std'
                  value={standard}
                  onChange={handleChange2}
                >
                  {standard_data.map((user) => (

                    <option value={user.value}>{user.text}</option>

                  ))}
                </select>

                <input className="form-control mb-2" type="file" multiple name="studymaterial" onChange={(e) => fileUpload(e)} />


                <input className="form-control mb-2" placeholder='Enter file name' type="text" name='description' onChange={namechange} />
                <button className='btn btn-dark w-100 mb-5' onClick={() => addData()}>Upload</button>
              </div>
            </div>
            <table className="table table-responsive">
              <thead className="table-dark">
                <tr>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Download</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>

                {
                  getFileData.map((data) => {

                    return (
                      <>
                        <tr>
                          <td>{data.description}</td>
                          <td>{moment(data.createdAt).format('MMMM Do, YYYY')}</td>
                          <td>
                            <IconButton aria-label="download" color="primary">
                              <a href={data.file_url} download>
                                <DownloadForOfflineIcon />
                              </a>
                            </IconButton>
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => DeleteFile(data.file_name,data._id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
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

    </>
  )
}
