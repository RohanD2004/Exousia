import {React,useEffect,useState} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import 'bootstrap';
import InputLabel from '@mui/material/InputLabel';
import { useForm } from "react-hook-form";
import { AddTeacher } from "../service/api.js";
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import Swal from "sweetalert2";
import Header from './header.js';
import { useNavigate } from 'react-router-dom';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




// For database entry
const initialValue = {
  name: '',
  dob: '',
  stdassigned: '',
  contactno: '',
  alternateno: '',
  address: '',
  email: '',
  uname: '',
  pass: '',
  languageknown: '',
  experties: '',
  experience: '',
  subjects: ''
}

const textstyle = {
  color: 'white'
}
var password = document.getElementById("password");

const ValidateMobileNumber = (event, id) => {
  var mobileNumber = event.target.value
  // var mobileNumber1 = id
  // console.log(mobileNumber1);

  var expr = /^(0|91)?[6-9][0-9]{9}$/;
  if (!expr.test(mobileNumber)) {
    document.getElementById(id).style.color = 'red'
  }
  else {
    document.getElementById(id).style.color = 'black'
  }
}
const names = ["Marathi", "HIndi", "English"];


function getStyles(name, language, theme) {
  return {
    fontWeight:
      language.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}


function getStylesstd(name, standard, theme) {
  return {
    fontWeight:
      standard.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const standards = [
  '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
];

function getStylesstd2(name, theme) {
  return {
    fontWeight:
      gender.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const gender = [
  'male',
  'female',
  'other',
];

export default function Admission() {

  const navigate = useNavigate();
  const temp = localStorage.getItem('token');


  const theme = useTheme();
  var password = "";
  const [standard, setstandard] = useState([]);
  const [gen, setgen] = useState([]);

  const handleChangestd = (event) => {
    const {
      target: { value },
    } = event;
    setstandard(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  }

  const handleChangegen = (event) => {

    setgen(
      event.target.value
    );

  }

  function genPassword() {
    var chars = "0123456789";
    var passwordLength = 5;
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    document.getElementById("password").value = password;
    setteacher({ ...teacher, ["pass"]: password })

  }

  const handleChange = (event) => {
    setStd(event.target.value);
    setteacher({ ...teacher, [event.target.name]: event.target.value })

  };
  const [Std2, setStd] = useState('');
  const [open, setOpen] = useState(false);
  const [username, Setuname] = useState('');

  const [teacher, setteacher] =useState(initialValue);
  const { name, dob, stdassigned, contactno, alternateno, address, email, uname, pass, languageknown, experties, experience, subjects } = teacher;
  // setteacher({std:Std})

  const onValueChange2 = (event, id) => {
    var mobileNumber = event.target.value
    // var mobileNumber1 = id
    // console.log(mobileNumber1);

    var expr = /^(0|91)?[6-9][0-9]{9}$/;
    if (!expr.test(mobileNumber)) {
      document.getElementById(id).style.color = 'red'
    }
    else {
      document.getElementById(id).style.color = 'black'
    }
    setteacher({ ...teacher, [event.target.name]: event.target.value })
    console.log(teacher);

  }

  const onValueChange = (event) => {

    // setteacher({ ...teacher, [event.target.name]: event.target.value })
    // console.log(teacher);
  }

  function submit() {
    console.log(teacher);
  }
  const emailfilled = (event) => {
    Setuname(event.target.value);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleShift = (event) => {
    const {
      target: { value },
    } = event;

    
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {


    try {
      const response = await AddTeacher(data);
      if (response.status == 200) {
        Swal.fire({
          title: "Success",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });


      } else {
        Swal.fire({
          title: "Error",
          text: "something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

    } catch (error) {
      Swal.fire({
        title: 'Error !',
        text: error,
        icon: 'error',
      });
    }
  }
  useEffect(() => {
    console.log(temp);
    if (temp === null) {
      navigate('/');
    }
  }, [temp])
  return (

    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >

        <Box>
          <Header title="Teacher Admission" />
        </Box>

        <div class=" container-fluid mt-5">

          <div class="row">
            <div class="col-sm-12">


              <form className="container row " onSubmit={handleSubmit(onSubmit)}>
                {/* Name Input */}
                <div className="col-12 col-sm-4 mt-3 ">
                  <TextField fullWidth label="Name" variant="outlined" style={textstyle}
                
                    {...register("name", { required: true })}
                  />
                  <p className='text-danger'>
                    {errors.name?.type === "required" && "Name is required"}
                  </p>

                </div>

                {/* Birth date input */}
                <div className='col-12 col-sm-4 mt-3'>
                  <FormControl fullWidth>
                    {/* <FormHelperText >Date of Birth</FormHelperText> */}

                    <TextField type='date' name='dob' variant='outlined'
                      {...register("dob", { required: true })}
                    />
                    <p className='text-danger'>
                      {errors.dob?.type === "required" && "DOB is required"}
                    </p>
                  </FormControl>
                </div>

                {/* Known Language */}

                <div class="col-12 col-sm-4 mt-3 ">
                  <div class="form-group local-forms w-100">
                    <FormControl style={{ width: '100%' }}>
                      <InputLabel id="demo-multiple-name-label2">Gender</InputLabel>
                      <Select className=' select'
                        labelId="demo-multiple-name-label2"
                        id="demo-multiple-name"
                        value={gen}
                        {...register("gen", { required: true })}
                        onChange={handleChangegen}
                        input={<OutlinedInput label="Gender" />}
                        MenuProps={MenuProps}
                      >
                        <p className='text-danger'>
                          {errors.gen?.type === "required" && "Gender is required"}
                        </p>
                        {gender.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStylesstd2(name, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                  </div>
                </div>


                <div className='col-12 col-sm-4  mt-3 '>
                  <FormControl style={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-name-label">Assigned Classes</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={standard}
                      {...register("Asignclass", { required: true })}
                      onChange={handleChangestd}
                      input={<OutlinedInput label="Assigned Classes" />}
                      MenuProps={MenuProps}
                    >
                      <p className='text-danger'>
                        {errors.Asignclass?.type === "required" && "Asignclass is required"}
                      </p>
                      {standards.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStylesstd(name, standard, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>



                <div className='col-12 col-sm-4  mt-3 '>
                  <TextField fullWidth variant='outlined' name='experties' id='experties' label="Experties" className='d-block'
                    {...register("Experties", { required: true })}

                  />
                  <p className='text-danger'>
                    {errors.Experties?.type === "required" && "Experties is required"}
                  </p>
                </div>

                <div className='col-12 col-sm-4 mt-3'>
                  <TextField fullWidth variant='outlined' name='experience' id='experience' label="Experience" className='d-block' inputProps={{ inputMode: 'numeric' }}
                    {...register("Experience", { required: true })}

                  />
                  <p className='text-danger'>
                    {errors.Experience?.type === "required" && "Experience is required"}
                  </p>
                </div>

                <div className='col-12 col-sm-4 mt-3 '>
                  <TextField fullWidth variant='outlined' name='subjects' id='subjects' label="subjects" className='d-block' inputProps={{ inputMode: 'string' }}
                    {...register("subjects", { required: true })}

                  />
                  <p className='text-danger'>
                    {errors.subjects?.type === "required" && "subjects is required"}
                  </p>
                </div>

                <div className="col-12 col-sm-4 mt-3 ">
                  <TextField fullWidth variant='outlined' name='contactno' id='contactno1' label="Contact No" className='d-block' inputProps={{ inputMode: 'numeric' }}

                    {...register("ContactNo", { required: true })}
                  />
                  <p className='text-danger'>
                    {errors.ContactNo?.type === "required" && "Contact No is required"}
                  </p>
                </div>

                <div className="col-12 col-sm-4 mt-3  ">
                  <TextField fullWidth variant='outlined' name='alternateno' id='contactno2' label="Alternate No"
                    {...register("Alternateno", { required: false })}
                  />
                </div>


                <div className='col-12 col-sm-4 mt-3'>
                  <TextField fullWidth variant='outlined' name='address' id='address' label='Address' className=' ' multiline maxRows={4}
                    {...register("Address", { required: true })}

                  ></TextField>
                  <p className='text-danger'>
                    {errors.Address?.type === "required" && "Address  is required"}
                  </p>
                </div>


                <div className="col-12 col-sm-4  mt-3 ">
                  <div className="input-group  ">
                    <TextField fullWidth variant='outlined' id='Email' label="Email" placeholder='example123@gmail.com' className='d-block' inputProps={{ inputMode: 'string' }}
                      {...register("Email", { required: true })}

                    />
                    <p className='text-danger'>
                      {errors.Email?.type === "required" && "Email No is required"}
                    </p>
                  </div>

                </div>
                <div className="col-12 col-sm-4  mt-3">
                  <div className="input-group  ">
                    <TextField fullWidth variant='outlined' id='uname' label="Username" className='d-block' inputProps={{ inputMode: 'string' }}
                      {...register("Username", { required: true })}

                    />
                    <p className='text-danger'>
                      {errors.Username?.type === "required" && "Username  is required"}
                    </p>
                  </div>
                </div>


                <div className='col-12 col-sm-4  mt-3 '>
                  <div className=''>
                    <TextField
                      name='pass'
                      id="password"
                      label="Password"
                      fullWidth

                      {...register("Password", { required: true })}


                      variant="outlined"
                    />
                    <p className='text-danger'>
                      {errors.Password?.type === "required" && "Password  is required"}
                    </p>
                  </div>

                </div>

                <div>

                  {/* <TextField className="btn btn-primary text-white" type="submit" /> */}
                  <button type='submit' className='btn btn-primary mt-2' style={{width:'7rem',height:'2.5rem'}}>Submit</button>

                </div>
              </form>
            </div>
          </div>
        </div>

      </Box>
    </Box>
  )
}