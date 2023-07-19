

import { React, useState, useEffect } from 'react'
import { feesHistory } from '../service/api'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidenav from "../components/sidebar.tsx"
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { messaging } from '../service/api';
import moment from 'moment'

let totalfees;
let feesPaid;
let Remaining;
let mobilenumber;
export default function Feesdetails() {
    const navigate = useNavigate();
    const temp = localStorage.getItem('token');
    const { id } = useParams();
    const [history, setHistory] = useState([]);
    const [msg, setMsg] = useState([]);





    const getFeesHistory = async (id) => {

        totalfees = 0;
        feesPaid = 0;
        Remaining = 0;
        mobilenumber=0;

        try {
            const response = await feesHistory(id);
            mobilenumber=response.data.data[0].user_groups[0].contact
            setMsg({ ...msg,"mobilenumber" :mobilenumber })
            totalfees = response.data.data[0].user_groups[0].stdfeesinfo[0].total_fees
            feesPaid = response.data.data[0].user_groups[0].feesPaid
            Remaining = totalfees - feesPaid;
            if (response.status == 422) {

                Swal.fire({
                    title: 'Error !',
                    text: 'Student fees history is not found',
                    icon: 'error',
                });

            } else {

                setHistory(response?.data.data)

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

    useEffect(() => {

        getFeesHistory(id);


    }, [])

    // const onchangevalue=(event)=>{
    //     setMsg()
    //     setMsg({ ...msg, [event.target.name]: event.target.value })
    //     console.log(event.target.value);
    // }

    // const sendMsg= async ()=>{

    //     console.log(msg);
    //     try {
            
    //         await messaging(id,msg)
            
    //     } catch (error) {

    //         console.log("error occure",error);
            
    //     }

    // }



    return (

        <Box sx={{ display: 'flex' }}>


            <Sidenav />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>

                < table class=" table-striped  table table-bordered" id='paid' >
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Contact</th>
                        </tr>



                    </thead>
                    {/* Unpaid */}
                    <tbody id='paid'>
                        {
                            history.map((user, index) => {

                                return <tr>


                                    <th scope="row"  >{moment(user.createdAt).format('MMMM Do, YYYY')}</th>
                                    <td >{user.Amount}</td>
                                    <td >{user.contact}</td>

                                </tr>

                            })}

                    </tbody>

                </table>

                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">Paid</th>
                            <th scope="col">Total</th>
                            <th scope="col">Remaining</th>
                        </tr>



                    </thead>

                    <tbody>
                        {
                            history.map((user, index) => {

                                return (
                                    
                                    index === 0 &&
                                    <>
                                        <tr>


                                            <td >{user.user_groups[0].feesPaid}</td>
                                            <td >{user.user_groups[0].stdfeesinfo[0].total_fees}</td>
                                            <td >{user.user_groups[0].stdfeesinfo[0].total_fees - user.user_groups[0].feesPaid}</td>


                                        </tr>
                                        {/* <div className='d-flex'>


                                        <input name='message' onChange={(event)=>onchangevalue(event)} placeholder='Enetr the message'></input>
                                        <button  className='btn bg-primary text-white btn-primary ms-5 ' type='submit' onClick={()=> sendMsg()}/>
                                        </div> */}
                                    </>
                                )

                            })}
                    </tbody>
                </table>
            </Box>
        </Box>

    )
}
