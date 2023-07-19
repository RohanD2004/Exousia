

import React, { useState, useEffect } from 'react'
import { reciptdata } from "../service/api"

import { useNavigate } from 'react-router-dom';


const date = new Date();
let currentDay = String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
let currentYear = date.getFullYear();
// we will display the date as DD-MM-YYYY
let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;







export default function Recipt() {
    
    const navigate= useNavigate();
    const temp= localStorage.getItem('token');

    const [feesrecipt, setRecipt] = useState([]);
    const [invoiceno, setno] = useState(null);

    function printReciept() {
        window.print();
        navigate('/admin');
    
    }


    

    const getdatafrorecipt = async () => {
        geninvoiceno();
        const response = await reciptdata();
        setRecipt(response?.data.data);

    }

    const geninvoiceno = () => {


        const newRandomNumber = Math.floor(Math.random() * 100000) + 1;
        setno(newRandomNumber)
        console.log(newRandomNumber);
    }
    useEffect(() => {
        console.log(temp);
        if(temp ===null){
          navigate('/');
        }
      }, [temp])

      useEffect(() => {
        getdatafrorecipt();
    }, [])

    return (
        <>

        <div className='row'>

        <div className='col mb-4 mt-4'>
                
                <button type='button' id='printbtn' style={{marginLeft:'15vw'}}   onClick={printReciept}>Print</button>

            </div>
            <div className='col-lg-10'>
            <div className='container-fluid' id='Receipt' style={{
                borderBottom: '12px solid #333333',
                borderTop: '12px solid #002147',
                width: '610px',
                height: '700px'
            }}>
                <header className='mt-3'>
                    <div className='d-flex justify-content-center'>
                        <p className='h3'>Exousia Academy</p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <p><strong>Address: </strong>Sadhya Address Nahi</p>
                    </div>
                </header>

                
                
                <div className='row py-2' style={{ background: '#eee' }}>

                  
                 
                    <div className='col'>
                        <div className='flex-column'>
                            <p className='h5'><strong>{ feesrecipt.name}</strong></p>
                            <p><strong>Contact No: </strong>+91 {feesrecipt.contact}</p>
                            <p><strong>User Id: </strong>{feesrecipt.feesId}</p>
                            <p><strong>Standard: </strong>{feesrecipt.std}</p>
                        </div>
                    </div>
                    <div className='col d-flex align-items-center'>
                        <span className='align-middle h4'>INVOICE NO:{invoiceno} </span>
                    </div>
                </div>
                <div className='row mt-5 px-3'>
                    <table className='table table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Fees
                                </td>
                                <td>
                                {feesrecipt.Amount}
                                </td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <th>{feesrecipt.Amount}/-</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='row mt-3 mb-5'>
                    <div className='col'>
                        <p><b>Date:</b> {currentDate}</p>
                    </div>
                    <div className='col'>
                        <strong>STAMP</strong>
                    </div>
                </div>
                 
            </div>

            </div>

           

        </div>
        
        </>
    )
}
