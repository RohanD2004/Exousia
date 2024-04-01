import React from "react";
import { Box } from "@mui/material";
import Header from "../components/header";
import Sidebar from "../TeacherComponent/TeacherSidebar.tsx";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import app from "../firebase.js";
export default function uploadmaterial() {

  const fileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storage = getStorage(app);
      const storageRef = ref(storage, selectedFile.name);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
          });
        }
      );
    } else {
      console.log("no file selected");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        className="table-responsive"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Header title="Upload Material" />
        </Box>

        <div className="container-fluid mt-5 table-responsive bg-light shadow">
          {/* <div className='container shadow bg-light'> */}
          <div className="d-flex justify-content-center">
            <div>
              <CloudUploadIcon color="primary" className="w-100 h-100" />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <select class="form-select mb-2">
                <option selected>Select subject</option>
                <option>English</option>
                <option>Math</option>
              </select>
              <input
                class="form-control mb-2"
                type="file"
                multiple
                onChange={fileUpload}
              />
              <input
                class="form-control mb-2"
                placeholder="Enter file name"
                type="text"
              />
              <button className="btn btn-dark w-100 mb-5">Upload</button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </Box>
    </Box>
  );
}