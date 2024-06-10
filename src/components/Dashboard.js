import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
// import LineStylesDemo from './LineChart';
// import StackedBarDemo from './BarChart';
import { Badge } from 'primereact/badge';
import SideBarMenu from '../common/Sidebar';
import { useNavigate } from 'react-router-dom';

const DataDashboard = () => {


    const [number, setNumber] = useState(0);
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [number3, setNumber3] = useState(0);
    const [number4, setNumber4] = useState(0);
    const [number5, setNumber5] = useState(0);
    const [number6, setNumber6] = useState(0);
    const [number7, setNumber8] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            if (number < 200) {
                setNumber(prevNumber => prevNumber + 1);
            } else {
                clearInterval(interval);
            }
        }, 1);

        return () => clearInterval(interval);
    }, [number]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (number1 < 120) {
                setNumber1(prevNumber => prevNumber + 1);
            } else {
                clearInterval(interval);
            }
        }, 1);

        return () => clearInterval(interval);
    }, [number1]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (number2 < 80) {
                setNumber2(prevNumber => prevNumber + 1);
            } else {
                clearInterval(interval);
            }
        }, 1);

        return () => clearInterval(interval);
    }, [number2]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (number3 < 200) {
                setNumber3(prevNumber => prevNumber + 1);
            } else {
                clearInterval(interval);
            }
        }, 1);

        return () => clearInterval(interval);
    }, [number3]);


    return (
        <div className='grid'>
            <div className='col-2' style={{ backgroundColor: '#ffff' }}>
                <SideBarMenu />
            </div>
            <div className='col-10 card' style={{ backgroundColor: '#ffff' }}>
                <div className='dashboard-container font-fam-for-all'>
                    <div className='dashboard-main'>
                        <div className='dashboard-data-header'>
                            <div className='dashboard-data-sub-header'>
                                <div className='sub-header-css1'>
                                    <div className='header-content'>
                                        <div className='text-header-container'>
                                            <div className='text-header1'>Welcome back</div>
                                            <div className='text-header2'> Get an overview of your application updates, ongoing applications and apply for a new service.</div>
                                        </div>
                                        <div className='text-header-container1'>
                                            <div className='action-header-container'>
                                                <Button icon="pi pi-cog" className='header-button'></Button>
                                                {/* <Button icon="pi pi-bell" className='header-button1'></Button> */}
                                                <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '20px', marginTop: '10px' }}>
                                                    <Badge value="2"></Badge>
                                                </i>
                                            </div>
                                            <div className='avatar-header-container'>
                                                <Avatar icon="pi pi-user" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} shape="circle" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='sub-header-css2'>
                                    <div className='button-group-header'>

                                    </div>
                                    <div className='action-group-header'>
                                        {/* <button className="  form-Btn1 form-Btn-Label font-fam-for-all text-center  form-label"  ><i className='pi pi-align-center'></i> <span className='pl-2'>Select Client</span></button> */}
                                        <button className="  form-Btn1 form-Btn-Label font-fam-for-all text-center  form-label"  ><i className='pi pi-align-center'></i> <span className='pl-2'>Filter</span></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid' style={{ width: '1368px' }}>
                            <div className='col-8'>
                                <div className='card-section-dashbard'>
                                    <div className='card-section-container'>
                                        <div className='card-metrics-group'>
                                            <div className='card-metrics-items'>
                                                <div className='metrics-header'>
                                                    <div className='text-metrics-header'>
                                                        Documents fillings
                                                    </div>
                                                    <div className='text-icon-header'>
                                                        <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-ellipsis-v'></i></button>
                                                    </div>
                                                </div>
                                                <div className='metrics-number-card'>
                                                    <div className='metrics-number'>
                                                        <div className='metrics-number-text'>
                                                            {number}
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='card-metrics-items'>
                                                <div className='metrics-header'>
                                                    <div className='text-metrics-header'>
                                                        Compliances
                                                    </div>
                                                    <div className='text-icon-header'>
                                                        <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-ellipsis-v'></i></button>
                                                    </div>
                                                </div>
                                                <div className='metrics-number-card'>
                                                    <div className='metrics-number'>
                                                        <div className='metrics-number-text'>
                                                            {number1}
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='card-metrics-items'>
                                                <div className='metrics-header'>
                                                    <div className='text-metrics-header'>
                                                        Corporate Fillings
                                                    </div>
                                                    <div className='text-icon-header'>
                                                        <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-ellipsis-v'></i></button>
                                                    </div>
                                                </div>
                                                <div className='metrics-number-card'>
                                                    <div className='metrics-number'>
                                                        <div className='metrics-number-text'>
                                                            {number2}
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className='card-section-container'>
                                        <div className='card-metrics-group'>
                                            <div className='card-metrics-items'>
                                                <div className='metrics-header'>
                                                    <div className='text-metrics-header'>
                                                        Tax Registrations
                                                    </div>
                                                    <div className='text-icon-header'>
                                                        <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-ellipsis-v'></i></button>
                                                    </div>
                                                </div>
                                                <div className='metrics-number-card'>
                                                    <div className='metrics-number'>
                                                        <div className='metrics-number-text'>
                                                            90
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='card-metrics-items'>
                                                <div className='metrics-header'>
                                                    <div className='text-metrics-header'>
                                                        Registered Agents
                                                    </div>
                                                    <div className='text-icon-header'>
                                                        <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-ellipsis-v'></i></button>
                                                    </div>
                                                </div>
                                                <div className='metrics-number-card'>
                                                    <div className='metrics-number'>
                                                        <div className='metrics-number-text'>
                                                            24
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className='card-metrics-items'>
                                                <div className='metrics-header'>
                                                    <div className='text-metrics-header'>
                                                        Licensing
                                                    </div>
                                                    <div className='text-icon-header'>
                                                        <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-ellipsis-v'></i></button>
                                                    </div>
                                                </div>
                                                <div className='metrics-number-card'>
                                                    <div className='metrics-number'>
                                                        <div className='metrics-number-text'>
                                                            131
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='card'>
                                    <div className='checkout-card-header' style={{fontWeight:'bold'}}>
                                        Ongoing Orders
                                    </div>
                                    <div className='checkout-card-content'>
                                        <div className='card p-4'>
                                            <div className='grid'>
                                                <div className='col-6'>
                                                   <span className='cart-order-text1'>Processing</span> 
                                                </div>
                                                <div className='col-6'>
                                                    <span className='cart-order-text2'>View Orders <i className='pi pi-arrow-up-right ml-2'></i></span>
                                                </div>
                                            </div>
                                            <div className='grid'>
                                                <div className='col-12' style={{fontWeight:'bold'}}>
                                                    TX Holding LLC
                                                </div>
                                                
                                            </div>
                                            <div className='grid'>
                                                <div className='col-12'>
                                                    Delware
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className=' mt-4 pl-5'>
                            <div className='pl-5 pb-4' style={{fontWeight:'bold'}}>
                            Entity
                            </div>
                        </div>

                        <div className='chart-container'>
                            <div className='chart-container-main' onClick={()=>navigate("/llc")}>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        LLC Formation
                                                    </div>
                                                   
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

                            <div className='chart-container-main'>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        Form a Non-Profit
                                                    </div>
                                                   
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>


                            <div className='chart-container-main'>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        Obtain/Renew DBA
                                                    </div>
                                                   
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>


                            <div className='chart-container-main'>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        File Initial Report
                                                    </div>
                                                   
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='chart-container mt-4'>
                            <div className='chart-container-main'>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        Form an S-Corporation
                                                    </div>
                                                    
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>

                            <div className='chart-container-main'>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        Form an C-Corporation
                                                    </div>
                                                   
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>


                            <div className='chart-container-main'>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        Form an LP
                                                    </div>
                                                    
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>


                            <div className='chart-container-main'>
                                <div className='chart-card'>
                                    <div className='chart-card-content'>
                                        <div className='chart-header'>
                                            <div className='chart-header-content-main'>
                                                <div className='chart-header-content-text-main'>
                                                    <div className='chart-header-content-text1'>
                                                        Appoint Registered Agent
                                                    </div>
                                                   
                                                </div>
                                                <div className='action-chart-header'>
                                                    <button className='button-elipsis' style={{ border: 'none' }}><i className='pi pi-arrow-up-right cart-order-text2'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    )
}

export default DataDashboard