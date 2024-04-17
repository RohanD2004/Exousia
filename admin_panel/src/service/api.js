import axios from "axios";
import { tokenpassApi } from "../components/Login";
import { FaEyeDropper } from "react-icons/fa";
// const url = "http://localhost:8000";
 const url="https://erp-exousia.onrender.com"

export const Authenticate = async (logcred) => {
  try {
    return await axios.post(`${url}/`, logcred);
  } catch (error) {
    return error
  }
};

// export const SendMessageData = async () => {
//   try {
//     return await axios.get(`${url}/admin/mail`)

//   } catch (error) {
//     console.log("erroe sending sms", error)
//   }
// }

export const setFees = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${url}/admin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("error during counting total student", error);
    throw error;
  }
};

export const addpayFees = async (data) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.post(`${url}/admin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during add pai fees student", error);
  }
};
export const setMessageData = async (data) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.post(`${url}/admin/std/sendmsg`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during add pai fees student", error);
  }
};
export const getMessageData = async (data) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.post(`${url}/student/messages`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during add pai fees student", error);
  }
};
export const adminData = async (id) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.get(`${url}/admin/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during add pai fees student", error);
  }
};
export const updateAdminData = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.put(`${url}/admin/profile/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe update admin data", error);
  }
};

export const getTotalCount = async () => {
  const token = localStorage.getItem("token");
  try {
    return await axios.get(`${url}/admin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during counting total student", error);
  }
};
export const teacherCount = async () => {
  const token = localStorage.getItem("token");
  try {
    return await axios.get(`${url}/admin/teacherCount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during counting total student", error);
  }
};

export const totalFeesPaid = async () => {
  const token = localStorage.getItem("token");
  try {
    return await axios.get(`${url}/admin/feescount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during counting total student", error);
  }
};
//get data for paid fees
export const getData = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/`, id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("erroe during counting total student", error);
  }
};

export const GetFees = async () => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/student/admission`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring  get fees api called", error);
  }
};

export const getStandards = async (data) => {
  
  try {
    const token = localStorage.getItem("token");

    return await axios.post(`${url}/getstd`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring  get fees api called", error);
  }
};

export const AddStudent = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(`${url}/admin/student/admission`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const getStudent = async (stdno) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.get(`${url}/admin/classes/std/${stdno}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};
export const getclass = async () => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const getAllStudent = async () => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/student`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const viewStudent = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/student/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const getSingleStudentData = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/classes/std/edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const updateStudent = async (id, student) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.put(`${url}/admin/classes/std/edit/${id}`, student, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};
export const updatTeacher = async (id, teacher) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.put(`${url}/admin/teacher/view/edit/${id}`, teacher, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};
export const getTeacher = async (id) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.get(`${url}/admin/teacher/view/edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const deleterStudent = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.delete(`${url}/admin/classes/std/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};
// add teacher

export const AddTeacher = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(`${url}/admin/teacher/admission`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const getAllteacher = async () => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/teacher`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const viewTeacher = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/teacher/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const addFileData = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(`${url}/teacher/uploadefile`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};


export const viewTeacher2 = async (id) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.post(
      `${url}/teacher/exams/sub`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};


export const FillAttendence = async (data) => {
  try {
    const token = localStorage.getItem("token");
    return await axios.post(`${url}/teacher/attendence`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.delete(`${url}/admin/teacher/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const viewteacher = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.delete(`${url}/admin/teacher/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

//get all student for fees history from student collection

export const GetDataForFees = async () => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/feesdetails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring get data for fees api called", error);
  }
};

//get data for show history of student fees from feesdatas collection

export const feesHistory = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/feesdetails/history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring get data for fees api called", error);
  }
};

export const messaging = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(`${url}/admin/feesdetails/history/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring get data for fees api called", error);
  }
};
//get data for recipt
export const reciptdata = async () => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/admin/recipt`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring get data for fees api called", error);
  }
};

// student dashboard api start

export const getStudentprofile = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const Fees = async (id) => {
  try {
    const token = localStorage.getItem("token");
    console.log("fees token", token);

    return await axios.get(`${url}/student/feesdetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring get data for fees api called", error);
  }
};

export const GetStudentStd = async (marks) => {
  try {
    const token = localStorage.getItem("token");
    console.log("getStudent token", token);
    return await axios.post(`${url}/teacher/exams`, marks, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const updateMark = async (data) => {
  console.log(data);

  try {
    const token = localStorage.getItem("token");
    console.log("getStudent token", token);
    return await axios.post(`${url}/teacher/exams/updatemark`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const getTeacherMarkData = async (data) => {
  console.log(data);

  try {
    const token = localStorage.getItem("token");
    console.log("getStudent token", token);
    return await axios.post(`${url}/teacher/viewmark`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const getStudentMarkData = async (data) => {
  console.log(data);
  try {
    const token = localStorage.getItem("token");
    console.log("getStudent token", token);
    return await axios.post(`${url}/teacher/viewmark/student`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return error;
  }
};



export const getStudent2 = async (data) => {
  try {
    const token = localStorage.getItem("token");
    console.log("getStudent token", token);
    return await axios.post(`${url}/teacher/exams`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const getTeacherProfile = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.get(`${url}/teacher/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }
};

export const uploadFile = async (data) => {

  try {
    const token = localStorage.getItem("token");
    return await axios.post(`${url}/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error occur durring api called", error);
  }

};

export const getMarks = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/student/Assessment/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getMarks API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};


export const getSingleAttendence = async (id) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/student/attendence`,id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getAllAttendence = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/teacher/attendence/view`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getSortedAttandence = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/teacher/attendence/view/date`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getuploadFIle = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/teacher/getuploadFIle`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};


export const deleteFileFromdb = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/teacher/deletefile`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getFileForStudent = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/student/getuploadFIle`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getCancelStudent = async () => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/admin/cancel`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const changeYear = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/admin/chageyear`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getPreviousYearData = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/admin/feesdata/previous`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getTimetable = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/student/timetable`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};

export const getTimetableForTeacher = async (data) => {
  try {
    const token = localStorage.getItem("token");

    return await axios.post(
      `${url}/teacher/timetable`,data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("Error occurred during getSingleAttendence API call", error);
    throw error; // Rethrow the error so that the caller of this function can handle it
  }
};