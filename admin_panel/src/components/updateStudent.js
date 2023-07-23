import React from 'react'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import { getSingleStudentData, updateStudent } from "../service/api"
import { useForm } from "react-hook-form";
import { Input, Typography, styled, FormGroup } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { GetFees } from "../service/api"
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";
import Header from './header.js';
const textstyle = {
    color: 'Black'
}

const Container = styled(FormGroup)`
    & > div {
        margin-top: 20px;
        padding:5px;
`;

const Container2 = styled(FormGroup)`
    margin-top:2rem;
    `;
const initialValue = {
    name: '',
    dob: '',
    gen: '',
    std: '',
    contact: '',
    Alternet_contact: '',
    Address: '',
    email: '',
    username: '',
    password: ''
}

const ITEM_HEIGHT = 40;

const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const Admission = () => {
    const navigate = useNavigate();
    const temp = localStorage.getItem('token');
    const { id } = useParams();
    const theme = useTheme();
    const [student, setStudent] = useState(initialValue);
    const [student2, setStudent2] = useState([]);
    const [updatedvalue, setUpdateValue] = useState(initialValue);

    let { name, dob, std, contactno, alternateno, address, email, uname, pass } = student;


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const [feesstd, setfeesStd] = useState([])
    const [Std2, setStd] = useState('');
    const [open, setOpen] = useState(false);
    const [gen, setgen] = useState([]);

    const fees = async () => {
        try {
            const response = await GetFees();
            if (response.status === 200) {
                let list = response?.data;
                if (list && list.length) {
                    list = list.map((item) => {
                        return {
                            key: item._id,
                            text: item.std,
                            value: item._id,
                        };
                    });
                }
                setfeesStd(list);
            } else setfeesStd([]);
        } catch (error) {
            Swal.fire({
                title: 'Error !',
                text: error,
                icon: 'error',
            });
        }

    }

    const onsubmit = async () => {

        console.log(student2);
        try {

            const response = await updateStudent(id, student2);
            if (response?.status == 200) {

                Swal.fire({
                    title: "Success",
                    text: response?.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                });
                navigate(`/admin/student/view/${student2._id}`);

            } else {

                Swal.fire({
                    title: "Error",
                    text: response?.data.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });

            }

        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }



    const handleChange = (event) => {
        setStd(event.target.value);
        setStudent2({
            ...student2,
            std_id: event.target.value
        })

    };

    useEffect(() => {

        fees();
        getStudent();

    }, []);


    const getStudent = async () => {
        const response = await getSingleStudentData(id);
        setStudent2(response?.data);
        setgen(response.data.gen)
        setStd(response.data.std_id)
        console.log(response.data._id)
    }


    const handleChangegen = (event) => {

        setgen(
            event.target.value
        );
        setStudent2({
            ...student2,
                gen: event.target.value
        })

    }
    const gender = [
        'male',
        'female',
        'other',
    ];
    function getStylesstd2(name, theme) {
        return {
            fontWeight:
                gender.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const onValueChange = (e) => {
        setStudent2({ ...student, [e.target.name]: e.target.value })
    }

    const updateStudentDetails = async () => {
        console.log(student)
        await updateStudent(id, student);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    // const onSubmit = async (data) => await updateStudent(id, data);
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

            <Header title="Update Student"/>



                <div class="row mt-4  bg-white">
                    <div class="col-sm-12 p-3">

                        <form className="container row " >

                            <div className="col-12 col-sm-4 ">
                                <TextField fullWidth label="Name" variant="outlined" focused value={student2.name} className='mb-3' style={textstyle}
                                    onChange={(e) => setStudent2({
                                        ...student2,
                                        name: e.target.value
                                    })}
                                />

                            </div>

                            <div className='col-12 col-sm-4 '>
                                <FormControl fullWidth>
                                    <TextField type='date' className='datetimepicker' focused value={student2.dob} name='dob' variant='outlined' placeholder="DD-MM-YYYY  Date Of Birth" style={textstyle}
                                        onChange={(e) => setStudent2({
                                            ...student2,
                                            dob: e.target.value
                                        })}
                                    />

                                </FormControl>
                            </div>

                            <div class="col-12 col-sm-4 ">
                                <div class="form-group local-forms ">
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel id="demo-multiple-name-label">Gender</InputLabel>
                                        <Select className=' select'
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            value={gen}
                                            focused
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

                            <div className='col-12 col-sm-4 '>
                                <FormControl fullWidth className='mt-3'>
                                    <InputLabel id="demo-controlled-open-select-label1" >Std</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={Std2}
                                        label="Std"
                                        onChange={handleChange}
                                    >

                                        {feesstd.map((user) => (

                                            <MenuItem value={user.value}>{user.text}</MenuItem>

                                        ))}

                                    </Select>

                                </FormControl>
                            </div>

                            <div class="col-12 col-sm-4 ">
                                <TextField fullWidth variant='outlined' focused value={student2.contact} name='contact' id='contactno1' label="Contact No" className='d-block mt-3' inputProps={{ inputMode: 'numeric' }}
                                    onChange={(e) => setStudent2({
                                        ...student2,
                                        contact: e.target.value
                                    })}

                                />

                            </div>
                            <div class="col-12 col-sm-4 ">
                                <TextField fullWidth variant='outlined' focused value={student2.Alternet_contact} name='Alternet_contact' id='contactno2' label="Alternate No" className='mt-3 '
                                    onChange={(e) => setStudent2({
                                        ...student2,
                                        Alternet_contact: e.target.value
                                    })}
                                />

                            </div>


                            <div className='col-12 col-sm-4  mt-3'>
                                <TextField fullWidth variant='outlined' focused value={student2.Address} label='Address' multiline maxRows={4}
                                    onChange={(e) => setStudent2({
                                        ...student2,
                                        Address: e.target.value
                                    })}
                                />


                            </div>


                            <div className="col-12 col-sm-4 mt-3">
                                <div className="input-group  ">
                                    <TextField fullWidth variant='outlined' focused value={student2.email} id='Email' label="Email" placeholder='example123@gmail.com' className='d-block' inputProps={{ inputMode: 'string' }}
                                        onChange={(e) => setStudent2({
                                            ...student2,
                                            email: e.target.value
                                        })}
                                    />

                                </div>

                            </div>
                            <div className="col-12 col-sm-4 mt-3">
                                <div className="input-group  ">
                                    <TextField fullWidth variant='outlined' focused id='uname' value={student2.username} label="Username" className='d-block' inputProps={{ inputMode: 'string' }}
                                        onChange={(e) => setStudent2({
                                            ...student2,
                                            username: e.target.value
                                        })}
                                    />

                                </div>
                            </div>

                            <div className='col-12 col-sm-4 mt-3'>
                                <TextField
                                    name='pass'
                                    id="password"
                                    label="Password"
                                    fullWidth
                                    value={student2.password}
                                    focused
                                    variant="outlined"
                                    onChange={(e) => setStudent2({
                                        ...student2,
                                        password: e.target.value
                                    })}
                                />

                            </div>

                            {/* <div className='col-12 col-sm-4 mt-3'>
                                <TextField
                                    name='fes'
                                    id="fees"
                                    label="Fees Paid"
                                    fullWidth

                                    {...register("feesPaid", { required: false })}


                                    variant="outlined"
                                />
                             
                            </div> */}

                            <div>
                                <Button className="btn bg-primary text-white  mt-3" onClick={() => onsubmit()} style={{ width: '15%' }} type="Button">Submit</Button>
                            </div>
                        </form>

                    </div>
                </div>



            </Box>
        </Box>
    )
}

export default Admission;