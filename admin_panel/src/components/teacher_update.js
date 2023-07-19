import { React, useEffect, useState } from 'react';
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
import { updatTeacher, getTeacher } from "../service/api.js";
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import Swal from "sweetalert2";
import Header from './header.js';
import { useNavigate, useParams } from 'react-router-dom';


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


export default function EditTeacher() {

    const navigate = useNavigate();
    const temp = localStorage.getItem('token');
    const [TeacherData, setTeacherData] = useState([]);


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

        setTeacherData({ ...TeacherData, [event.target.name]: event.target.value })

    }

    const handleChangegen = (event) => {

        setgen(
            event.target.value
        );
        setTeacherData({ ...TeacherData, [event.target.name]: event.target.value })

    }



    

    const { id } = useParams();
    useEffect(() => {
        getTeacherData();
    }, []);

    const getTeacherData = async () => {
        const response = await getTeacher(id);
        setTeacherData(response?.data.data[0]);
        console.log(TeacherData)
        setgen(response?.data.data[0].gen);
        setstandard(response?.data.data[0].Asignclass)
    }



    useEffect(() => {
        console.log(temp);
        if (temp === null) {
            navigate('/');
        }
    }, [temp])


     const senddata= async()=>{

        console.log(TeacherData);
        try {
            const response = await updatTeacher(id,TeacherData);
            if (response?.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(`/admin/teacher/view/${TeacherData._id}`)
                    } else if (result.isDenied) {
                      Swal.fire('Nothing to display')
                    }
                  })


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

    return (

        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} >

                <Box>
                    <Header title="Edit Teacher" />
                </Box>

                <div class=" container-fluid mt-5">

                    <div class="row">
                        <div class="col-sm-12">


                            <form className="container row ">
                                {/* Name Input */}
                                <div className="col-12 col-sm-4 mt-3 ">
                                    <TextField fullWidth label="Name"  variant="outlined" value={TeacherData.name} style={textstyle} focused
                                       
                                        onChange={(e)=> setTeacherData({
                                            ...TeacherData,
                                            name:e.target.value
                                        })}
                                    />
                                  

                                </div>

                                {/* Birth date input */}
                                <div className='col-12 col-sm-4 mt-3'>
                                    <FormControl fullWidth>
                                        {/* <FormHelperText >Date of Birth</FormHelperText> */}

                                        <TextField type='date' name='dob' variant='outlined' focused
                                            value={TeacherData.dob}
                                            onChange={(e)=> setTeacherData({
                                                ...TeacherData,
                                                dob:e.target.value
                                            })}
                                        />
                                     
                                    </FormControl>
                                </div>

                                {/* Known Language */}

                                <div class="col-12 col-sm-4 mt-3">
                                    <div class="form-group local-forms w-100">
                                        <FormControl style={{ width: '100%' }}>
                                            <InputLabel id="demo-multiple-name-label2">Gender</InputLabel>
                                            <Select className=' select'
                                                labelId="demo-multiple-name-label2"
                                                id="demo-multiple-name"
                                                focused
                                                value={gen}
                                                name='gen'
                                                onChange={handleChangegen}
                                                input={<OutlinedInput label="Gender" />}
                                                MenuProps={MenuProps}
                                            >
                                                
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
                                            focused
                                            id="demo-multiple-name"
                                            multiple
                                            name='Asignclass'
                                            value={standard}
                                            onChange={handleChangestd}
                                            input={<OutlinedInput label="Assigned Classes" />}
                                            MenuProps={MenuProps}
                                        >
                                           
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
                                    <TextField fullWidth variant='outlined' name='Experties' id='experties' focused label="Experties" className='d-block'
                                        value={TeacherData.Experties}

                                        onChange={(e)=> setTeacherData({
                                            ...TeacherData,
                                            Experties:e.target.value
                                        })}

                                    />
                                  
                                </div>

                                <div className='col-12 col-sm-4 mt-3'>
                                    <TextField fullWidth variant='outlined' name='Experience' id='experience' focused label="Experience" className='d-block' inputProps={{ inputMode: 'numeric' }}
                                        value={TeacherData.Experience}

                                        onChange={(e)=> setTeacherData({
                                            ...TeacherData,
                                            Experience:e.target.value
                                        })}

                                    />
                                  
                                </div>

                                <div className='col-12 col-sm-4 mt-3 '>
                                    <TextField fullWidth variant='outlined' name='subjects' id='subjects' focused label="subjects" className='d-block' inputProps={{ inputMode: 'string' }}
                                        value={TeacherData.subjects}

                                        onChange={(e)=> setTeacherData({
                                            ...TeacherData,
                                            subjects:e.target.value
                                        })}

                                    />

                                </div>

                                <div className="col-12 col-sm-4 mt-3 ">
                                    <TextField fullWidth variant='outlined' name='ContactNo' id='contactno1' focused label="Contact No" className='d-block' inputProps={{ inputMode: 'numeric' }}
                                       value={TeacherData.ContactNo}
                                       onChange={(e)=> setTeacherData({
                                        ...TeacherData,
                                        ContactNo:e.target.value
                                    })}
                                    />
                                   
                                </div>

                                <div className="col-12 col-sm-4 mt-3  ">
                                    <TextField fullWidth variant='outlined' name='Alternateno' id='contactno2' focused label="Alternate No"
                                    value={TeacherData.Alternateno}
                                    onChange={(e)=> setTeacherData({
                                        ...TeacherData,
                                        Alternateno:e.target.value
                                    })}
                                    />
                                </div>


                                <div className='col-12 col-sm-4 mt-3'>
                                    <TextField fullWidth variant='outlined' name='Address' id='address' label='Address' focused className=' ' multiline maxRows={4}
                                    value={TeacherData.Address}

                                    onChange={(e)=> setTeacherData({
                                        ...TeacherData,
                                        Address:e.target.value
                                    })}

                                    ></TextField>
                                 
                                </div>


                                <div className="col-12 col-sm-4  mt-3 ">
                                    <div className="input-group  ">
                                        <TextField fullWidth variant='outlined' name="Email" id='Email' label="Email" focused placeholder='example123@gmail.com' className='d-block' inputProps={{ inputMode: 'string' }}
                                        value={TeacherData.Email}
                                          
                                        onChange={(e)=> setTeacherData({
                                            ...TeacherData,
                                            Email:e.target.value
                                        })}

                                        />
                                      
                                    </div>

                                </div>
                                <div className="col-12 col-sm-4  mt-3">
                                    <div className="input-group  ">
                                        <TextField fullWidth variant='outlined' id='uname' name="Username" label="Username" focused className='d-block' inputProps={{ inputMode: 'string' }}
                                        value={TeacherData.Username}
                                           
                                        onChange={(e)=> setTeacherData({
                                            ...TeacherData,
                                            Username:e.target.value
                                        })}

                                        />
                                       
                                    </div>
                                </div>


                                <div className='col-12 col-sm-4  mt-3 '>
                                    <div className=''>
                                        <TextField
                                            name='pass'
                                            id="password"
                                            label="Password"
                                            focused
                                            fullWidth
                                        value={TeacherData.Password}


                                        onChange={(e)=> setTeacherData({
                                            ...TeacherData,
                                            Password:e.target.value
                                        })}
                                            variant="outlined"
                                        />
                                      
                                    </div>

                                </div>

                                <div>

                                    <Button className='btn bg-primary text-white  mt-2' style={{ width: '7rem', height: '2.5rem' }} onClick={()=>senddata()} >Submit</Button>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </Box>
        </Box>
    )
}