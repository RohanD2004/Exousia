import axios from 'axios';
import { tokenpassApi } from '../components/Login';
const url="http://localhost:8000"


export const Authenticate =async (logcred)=>{
  try {
       return await axios.post( `${url}/`,logcred)
  } catch (error) {
     console.log("erroe during login  student",error)
  }
}

export const setFees = async (data) => {

  try {
    const token =localStorage.getItem('token');
    
    const response = await axios.put(`${url}/admin`, data,{

      headers:{
        Authorization: `Bearer ${token}`
       }

    });
    return response.data;
  } catch (error) {
    console.log("error during counting total student", error);
    throw error;
  }
};

export const addpayFees =async (data)=>{
  try {
    const token =localStorage.getItem('token');
    return await axios.post( `${url}/admin`,data,{

      headers:{
        Authorization: `Bearer ${token}`
       }

    })
  } catch (error) {
    console.log("erroe during add pai fees student",error)
  }
}

export const getTotalCount =async ()=>{
  
  const token =localStorage.getItem('token');
   try {
        return await axios.get( `${url}/admin/`,{
         headers:{
          Authorization: `Bearer ${token}`
         }
        })
   } catch (error) {
      console.log("erroe during counting total student",error)
   }
 }
 //get data for paid fees
 export const getData =async (id)=>{
   try {
    const token =localStorage.getItem('token');

        return await axios.get( `${url}/admin/`,id,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
   } catch (error) {
      console.log("erroe during counting total student",error)
   }
 }

 export const GetFees= async ()=>{
 
   try{
    const token =localStorage.getItem('token');

         return await axios.get(`${url}/admin/student/admission`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
   }catch(error)
   {
       console.log("Error occur durring  get fees api called",error)
   }
 }

  export const AddStudent= async (data)=>{

    try{
    const token =localStorage.getItem('token');

          return await axios.post(`${url}/admin/student/admission`,data,{

            headers:{
              Authorization: `Bearer ${token}`
             }
      
          })
    }catch(error)
    {
        console.log("Error occur durring api called",error)
    }
}


export const getStudent= async (stdno)=>{

  try{
    const token =localStorage.getItem('token');
        return await axios.get(`${url}/admin/classes/std/${stdno}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}
export const getclass= async ()=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.get(`${url}/admin/classes`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const getAllStudent= async ()=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.get(`${url}/admin/student`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const viewStudent= async (id)=>{
  try{
    const token =localStorage.getItem('token');

        return await axios.get(`${url}/admin/student/view/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const getSingletudentData= async (id)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.get(`${url}/admin/classes/std/edit/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
      }catch(error)
      {
        console.log("Error occur durring api called",error)
      
  }
}

export const updateStudent= async (id,student)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.put(`${url}/admin/classes/std/edit/${id}`,student,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
      }catch(error)
      {
        console.log("Error occur durring api called",error)
      
  }

}
export const updatTeacher= async (id,teacher)=>{

  try{
    const token =localStorage.getItem('token');
        return await axios.put(`${url}/admin/teacher/view/edit/${id}`,teacher,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
      }catch(error)
      {
        console.log("Error occur durring api called",error)
      
  }

}
export const getTeacher= async (id)=>{

  try{
    const token =localStorage.getItem('token');
        return await axios.get(`${url}/admin/teacher/view/edit/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
      }catch(error)
      {
        console.log("Error occur durring api called",error)
      
  }

}



export const deleterStudent= async (id)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.delete(`${url}/admin/classes/std/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
      }catch(error)
      {
        console.log("Error occur durring api called",error)
      
  }
}
// add teacher


export const AddTeacher= async (data)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.post(`${url}/admin/teacher/admission`,data,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}


export const getAllteacher= async ()=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.get(`${url}/admin/teacher`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const viewTeacher= async (id)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.get(`${url}/admin/teacher/view/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const deleteTeacher= async (id)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.delete(`${url}/admin/teacher/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const viewteacher= async (id)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.delete(`${url}/admin/teacher/view/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}


//get all student for fees history from student collection

 export const GetDataForFees = async()=>{

  try {
    const token =localStorage.getItem('token');


     return await axios.get(`${url}/admin/feesdetails`,{

      headers:{
        Authorization: `Bearer ${token}`
       }

    })
    
  } catch (error) {
    console.log("Error occur durring get data for fees api called",error)
  }
 }


 //get data for show history of student fees from feesdatas collection


 export const feesHistory = async(id)=>{

  try {
    const token =localStorage.getItem('token');

     return await axios.get(`${url}/admin/feesdetails/history/${id}`,{

      headers:{
        Authorization: `Bearer ${token}`
       }

    })
    
  } catch (error) {
    console.log("Error occur durring get data for fees api called",error)
  }
}

 export const messaging = async(id,data)=>{

  try {
    const token =localStorage.getItem('token');

     return await axios.post(`${url}/admin/feesdetails/history/${id}`,data,{

      headers:{
        Authorization: `Bearer ${token}`
       }

    })
    
  } catch (error) {
    console.log("Error occur durring get data for fees api called",error)
  }
}
  //get data for recipt
   export const reciptdata = async()=>{
  try {
    const token =localStorage.getItem('token');

     return await axios.get(`${url}/admin/recipt`,{

      headers:{
        Authorization: `Bearer ${token}`
       }

    })
    
  } catch (error) {
    console.log("Error occur durring get data for fees api called",error)
  }

 }


 // student dashboard api start

 export const getStudentprofile= async (id)=>{

  try{
  const token =localStorage.getItem('token');

        return await axios.get(`${url}/student/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const Fees = async(id)=>{

  try {
    const token =localStorage.getItem('token');
    console.log("fees token",token);

     return await axios.get(`${url}/student/feesdetails/${id}`,{

      headers:{
        Authorization: `Bearer ${token}`
       }

    })
    
  } catch (error) {
    console.log("Error occur durring get data for fees api called",error)
  }
}

export const GetStudentStd= async (marks)=>{

  try{
    const token =localStorage.getItem('token');
    console.log("getStudent token",token);
        return await axios.post(`${url}/teacher/exams`,marks,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}
export const updateMark= async (data)=>{
  console.log(data);

  try{
    const token =localStorage.getItem('token');
    console.log("getStudent token",token);
        return await axios.post(`${url}/teacher/exams/updatemark`,data,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}
export const getStudent2= async (data)=>{

  try{
    const token =localStorage.getItem('token');
    console.log("getStudent token",token);
        return await axios.post(`${url}/teacher/exams`,data,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}

export const getTeacherProfile= async (id)=>{

  try{
    const token =localStorage.getItem('token');

        return await axios.get(`${url}/teacher/${id}`,{

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring api called",error)
  }
}
export const getMarks= async (id)=>{

  try{
    const token =localStorage.getItem('token');
        return await axios.post(`${url}/student/Assessment/${id}`, {

          headers:{
            Authorization: `Bearer ${token}`
           }
    
        })
  }catch(error)
  {
      console.log("Error occur durring  getMarks api called",error)
  }
}


