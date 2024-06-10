

import { Dialog } from 'primereact/dialog';
import React, {useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SideBarMenu from '../common/Sidebar';

// import '../Assets/CSS/User.css'




function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function Subscription() {
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = React.useState(0);
    const [data, setData] =React.useState([])
    const [showForm , setShowForm] = React.useState(false)
    const [updateData , setUpdateData] = React.useState(null)
    const [isTrue , setIsTrue] = React.useState(false)
    const [baseData, setBaseData] = React.useState([])
    const [dueData,setDueData] = React.useState([])
    const [isTrue1 , setIsTrue1] = React.useState(false)


    useEffect(()=>{
   
},[]);

    const handleActive =()=>{
        setIsLoading(true);
        const filteredDataActive = baseData.filter(item => item.notificationMuteFlag);
            processData(filteredDataActive)
                .then((res) => {
                    console.log(res.data);
                    setData(res.data);
                    setDueData(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });

    }


    const handleInActive=()=>{
        setIsLoading(true);
        const filteredDataInActive = baseData.filter(item => !item.notificationMuteFlag);
        processData(filteredDataInActive)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                setDueData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    const handleAll=()=>{
        setIsLoading(false);
        setData(baseData)
        setDueData(baseData);
    }

    const handleDue=()=>{
        setIsLoading(true);
        const handleDueFilter = baseData.filter(item => item.notificationMuteFlag);
        console.log(handleDueFilter);
        processData(handleDueFilter)
            .then((res) => {
                console.log(res.data);
              const tempData=  res.data.filter((val)=>{
                    let a =  new  Date(val.subscriptionExpiryDate)
                    let b = new Date()
                    // Calculate the difference in milliseconds
                    const differenceInMilliseconds = b - a;
                    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                    console.log(`Difference in days: ${differenceInDays}`);
                    if (differenceInDays <= val.notificationBeforeExpiry){
                      return val;
                    }
                })
                setData(tempData)
                setDueData(tempData);
                setIsLoading(false);
                console.log(tempData)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const processData = async (filteredData) => {
        // Simulate an async operation, such as an API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulating a response from an API
                resolve({ data: filteredData });
            }, 1000);
        });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSearch = (event) => {
        let input = event.target.value;
        console.log(dueData)
        if (input !== "") {
            console.log(data)
            const tempData = data.filter((val) => {
                for (let key in val) {
                    if (val.hasOwnProperty(key)) {
                        const propertyValue = val[key];
                        // Check if the property is a string and perform a case-insensitive search
                        if (typeof propertyValue === 'string' && propertyValue.toLowerCase().includes(input.toLowerCase())) {
                            return true;
                        }
                        const numericInput = Number(input); // Convert input to a number for numeric comparison
                        // Check if the property is a number and perform an exact match
                        if (typeof propertyValue === 'number' && propertyValue === numericInput) {
                            return true;
                        }

                    }
                }
                return false;
            });
            setData(tempData)
            console.log(tempData);
        }
        else {
            setData(dueData)
        }
    };

    const handleNewSubscription =(data,isTrue) =>{
        if (isTrue) {
            setUpdateData(data)
            setShowForm(true)
            console.log(data)
            setIsTrue(true)
            window.location.reload(false)
        }else{
            setUpdateData(data)
            setShowForm(true)
            setIsTrue(false)

        }
    }
    console.log(updateData)

    const handleDelete =(id)=>{
        console.log(id)
       
    }

    function handleRemainder(val,e) {
        // val.notificationMuteFlag(false)
        console.log(e.target.checked)
        val["notificationMuteFlag"] = e.target.checked
        console.log(val)
        
    }

    console.log(data)

    return (
        <div className="outer-container-subscription font-fam-for-all">
           <SideBarMenu/>
            <div className="right-container-subscription">
                <div className="right-container-subscription-header">
                    <div className="right-container-subscription-header-container">
                        <div className="right-container-subscription-header-title">
                            <div className="right-container-subscription-header-title-container">
                                <div className="right-container-subscription-header-title-text-container">
                                    <p className="right-container-subscription-header-title-text">Subscription List</p>
                                    <p className="right-container-subscription-header-title-support">Your list of
                                        subscription items, including active, inactive, due, overdue.</p>
                                </div>
                                <div className="left-container-subscription-header-title-search-container">
                                    <div className="left-container-subscription-header-title-search">
                                        <div className="left-container-subscription-header-title-search-icon-container">
                                            <div
                                                className="left-container-subscription-header-title-search-icon-container-1">
                                                <div
                                                    className="left-container-subscription-header-title-search-icon-container-2">
                                                    <div
                                                        className="left-container-subscription-header-title-search-icon-container-3">
                                                        <div
                                                            className="left-container-subscription-header-title-search-icon-container-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                 height="20" viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                                                                    stroke="#667085" stroke-width="1.66667"
                                                                    stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <input onChange={handleSearch}
                                                            className="left-container-subscription-header-title-search-icon-container-5"
                                                            placeholder="Search">
                                                        </input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="left-container-subscription-header-title-search-container">
                                    <div className="left-container-subscription-add-container">
                                        <button className="left-container-subscription-add-container-1"
                                                onClick={()=>handleNewSubscription(null,false)}>
                                            <div className="left-container-subscription-add-container-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2"
                                                          stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                                <text className="left-container-subscription-add-container-text">Add new
                                                    subscription
                                                </text>
                                        </button>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-container-header-nav-container">
                        <div className="right-container-header-nav-bar">
                            <div className="right-container-header-nav-tabs-container">
                                <div className="right-container-header-nav-tabs-container-1">
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab onClick={handleAll}  label="All" {...a11yProps(0)} />
                                                <Tab onClick={handleActive} label="Active"  {...a11yProps(1)} />
                                                <Tab onClick={handleInActive}label="InActive" {...a11yProps(2)} />
                                                <Tab onClick={handleDue}label="Due" {...a11yProps(3)} />
                                            </Tabs>
                                        </Box>
                                    </Box>
                                </div>

                                {/*<div className="apply-filters-container">*/}
                                {/*    <div className="apply-filters-container-1">*/}
                                {/*        <div className="apply-filters-container-2">*/}
                                {/*            <div className="apply-filters-container-logo">*/}
                                {/*                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
                                {/*                     viewBox="0 0 20 20" fill="none">*/}
                                {/*                    <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#344054"*/}
                                {/*                          stroke-width="1.67" stroke-linecap="round"*/}
                                {/*                          stroke-linejoin="round"/>*/}
                                {/*                </svg>*/}
                                {/*            </div>*/}
                                {/*            <button className="apply-filters-container-text">Apply filter</button>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="right-container-body" id="dashboard1">
                    <div className="right-continer-body-1">
                        <div className="right-continer-body-2">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="table-1" scope="col">Product</th>
                                    <th className="table-1" scope="col">Category</th>
                                    <th className="table-1" scope="col">Purchase Date</th>
                                    <th className="table-1" scope="col">Expiry Date</th>
                                    <th className="table-1" scope="col">Days Left</th>
                                    <th className="table-1" scope="col">Additional Comment</th>
                                    <th className="table-1" scope="col" style={{paddingLeft: 18}}>Remainder</th>
                                    <th className="table-1" scope="col"></th>
                                    <th className="table-1" scope="col"></th>
                                </tr>
                                </thead>
                                <tbody style={{width: '100%'}}>
                                {
                                    isLoading ? (
                                    [...Array(5)].map((_, index) => (
                                    <tr key={index} style={{ height: 'fit-content', fontSize: 16 }}>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                </tr>
                                ))
                                ) : (
                                        data.map((val)=> (
                                        <tr style={{height: "fit-content", fontSize: 16}}>
                                            <td>{val.subscriptionName}</td>
                                            <td>{val.category}</td>
                                            <td>{val.subscriptionStartDate}</td>
                                            <td>{val.subscriptionExpiryDate}</td>
                                            <td>{val.notificationBeforeExpiry}</td>
                                            <td>{val.additionalComments}</td>
                                            <td>
                                                <div  className="form-check form-switch" style={{paddingLeft:25}}>
                                                    <input className="form-check-input" type="checkbox" role="switch" onChange={(e)=>{
                                                        handleRemainder(val,e)
                                                    }}
                                                           id="flexSwitchCheckChecked" checked={val.notificationMuteFlag} style={{marginLeft:0,marginRight:1}}  />
                                                    <label className="form-check-label"
                                                           htmlFor="flexSwitchCheckChecked"></label>
                                                </div>
                                            </td>
                                            <td>
                                                <button className="edit" onClick={()=>handleNewSubscription(val,true)}>
                                                    <div className="edit-box">
                                                    <div className="edit-log">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                 height="20" viewBox="0 0 20 20" fill="none">
                                                                <g clip-path="url(#clip0_214_2463)">
                                                                    <path
                                                                        d="M14.1665 2.50005C14.3854 2.28118 14.6452 2.10756 14.9312 1.98911C15.2171 1.87066 15.5236 1.80969 15.8332 1.80969C16.1427 1.80969 16.4492 1.87066 16.7352 1.98911C17.0211 2.10756 17.281 2.28118 17.4998 2.50005C17.7187 2.71892 17.8923 2.97875 18.0108 3.26472C18.1292 3.55069 18.1902 3.85719 18.1902 4.16671C18.1902 4.47624 18.1292 4.78274 18.0108 5.06871C17.8923 5.35468 17.7187 5.61451 17.4998 5.83338L6.24984 17.0834L1.6665 18.3334L2.9165 13.75L14.1665 2.50005Z"
                                                                        stroke="#667085" stroke-width="1.66667"
                                                                        stroke-linecap="round" stroke-linejoin="round"/>
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_214_2463">
                                                                        <rect width="20" height="20" fill="white"/>
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="edit" onClick={() => handleDelete(val.id)}>
                                                    <div className="edit-box">
                                                        <div className="edit-log">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                 height="20" viewBox="0 0 20 20" fill="none">
                                                                <path
                                                                    d="M2.5 4.99996H4.16667M4.16667 4.99996H17.5M4.16667 4.99996V16.6666C4.16667 17.1087 4.34226 17.5326 4.65482 17.8451C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8451C15.6577 17.5326 15.8333 17.1087 15.8333 16.6666V4.99996H4.16667ZM6.66667 4.99996V3.33329C6.66667 2.89127 6.84226 2.46734 7.15482 2.15478C7.46738 1.84222 7.89131 1.66663 8.33333 1.66663H11.6667C12.1087 1.66663 12.5326 1.84222 12.8452 2.15478C13.1577 2.46734 13.3333 2.89127 13.3333 3.33329V4.99996M8.33333 9.16663V14.1666M11.6667 9.16663V14.1666"
                                                                    stroke="#667085" stroke-width="1.66667"
                                                                    stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </button>
                                            </td>
                                        </tr>
                                    )))
                                }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}