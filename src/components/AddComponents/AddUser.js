import React, { useEffect } from 'react'
import { useState, useRef, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { RadioButton } from "primereact/radiobutton";
import { Message } from 'primereact/message'
import { useForm, Controller } from "react-hook-form";
import { classNames } from 'primereact/utils';

import { Password } from 'primereact/password';
import { useNavigate } from 'react-router';

import Switch from '@mui/material/Switch';
import CreditCardServices from '../../services/creditCardService';

export const AddUser = ({ visible1, setVisible1 }) => {


    const [value, setValue] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [cityErr, setcityErr] = useState('')
    const toast = useRef(null);
    const [upload, setUpload] = useState('')
    const [selectedSkills, setSelectedSkills] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false)
    const navigate = useNavigate()
    const [checked, setChecked] = useState(true)

    const [firstName, setFirstName] = useState("")

    const [lastName, setLastName] = useState("")

    const [website, setWebsite] = useState("")

    const [company, setCompany] = useState("")

    const [phone, setPhone] = useState("")

    const [address, setAddress] = useState("")

    const [city, setCity] = useState("")

    const [state, setState] = useState("")

    const [zip, setZip] = useState("")

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };






    const dialogView = () => setVisible1(false)
    const cancelView = () => {
        setcityErr('')
        setVisible1(false)

    }

    let newObject = window.localStorage.getItem("user");
    let updatedUser = Object.assign({}, JSON.parse(newObject));


    useEffect(() => {


    }, [])

    const handleCity = (e) => {
        setcityErr('')

        setIngredient(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }





    const handleSubmit = (e) => {
        e.preventDefault()
        const actualdata = {
            properties:
                [{ property: 'firstname', value: firstName },
                { property: 'lastname', value: lastName },
                { property: 'website', value: website },
                { property: 'company', value: company },
                { property: 'phone', value: phone },
                { property: 'address', value: address },
                { property: 'city', value: city },
                { property: 'state', value: state },
                { property: 'zip', value: zip }]
        }

        const userdata = {
            blocked
                :
                false,
            confirmed
                :
                checked,
            email
                :
                email,
            password
                :
                password,
            username
                :
                ingredient,
            firstName: firstName,
            lastName: lastName,
            city: city,
            website: website,
            company: company,
            phone: phone,
            address: address,
            state: state,
            zip: zip,
            prefix: null,
            user_id: null,
            fullName: `${firstName} ${lastName}`
        }

        console.log(actualdata)
        CreditCardServices.createUser(userdata)
            .then((res) => {
                console.log(res)
                navigate("/signin")
            })
            .catch((err) => {
                console.log(err)
            })



        if (isSuccessful) {
            navigate('/city')
        }

    }


    const handleClick = () => {
        setcityErr('')
        setVisible1(false)
    }

    // handle header form
    const handleHeader = () => {
        return <>

            <div className='font-fam-for-all form-sm-heading form-sm-close-Btn' >Update City<button className='form-close-Btn' onClick={handleClick}><i className='pi pi-times'></i></button></div>

        </>
    }


    return (
        <div>

            <form id='myform' onSubmit={handleSubmit}>
                <Toast ref={toast} />
                <div className='form-content-signup'>


                    <div className=" justify-content-center dialog-form-field-space ">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>User Name <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label ">

                                <InputText
                                    style={{ width: '565px', height: '40px' }}
                                    maxLength={50} value={ingredient} onChange={handleCity} name='cityName'
                                />


                                {/* <p className='error-msg font-fam-for-all'>{cityErr}</p> */}
                            </span>

                        </div>
                    </div>

                    <div className=" justify-content-center dialog-form-field-space">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Password <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label demo-class">

                                <Password

                                    toggleMask
                                    value={password}
                                    onChange={handlePassword}
                                    autoComplete={false}
                                    // className='dialog-form-input-field'
                                    style={{ width: '565px', height: '40px' }}
                                />



                            </span>

                        </div>
                    </div>





                    <div className='grid'>
                        <div className='col-6'>
                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>First Name <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'
                                            style={{ height: '40px' }}
                                            maxLength={50} value={firstName} onChange={(e) => setFirstName(e.target.value)} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>

                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>Email <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'

                                            style={{ height: '40px' }}
                                            maxLength={50} value={email} onChange={handleEmail} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>Last Name <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'
                                            style={{ height: '40px' }}
                                            maxLength={50} value={lastName} onChange={(e) => setLastName(e.target.value)} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>

                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>Phone <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'
                                            style={{ height: '40px' }}
                                            maxLength={50} value={phone} onChange={(e) => setPhone(e.target.value)} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>


                    <div className=" justify-content-center dialog-form-field-space">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Company <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label ">

                                <InputText
                                    // className='dialog-form-input-field'
                                    style={{ width: '565px', height: '40px' }}
                                    maxLength={50} value={company} onChange={(e) => setCompany(e.target.value)} name='cityName'
                                />



                            </span>

                        </div>
                    </div>


                    <div className=" justify-content-center dialog-form-field-space">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Website <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label ">

                                <InputText
                                    // className='dialog-form-input-field'
                                    style={{ width: '565px', height: '40px' }}
                                    maxLength={50} value={website} onChange={(e) => setWebsite(e.target.value)} name='cityName'
                                />



                            </span>

                        </div>
                    </div>



                    <div className='grid'>
                        <div className='col-6'>
                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>Address <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'
                                            style={{ height: '40px' }}
                                            maxLength={50} value={address} onChange={(e) => setAddress(e.target.value)} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>

                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>City <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'
                                            style={{ height: '40px' }}
                                            maxLength={50} value={city} onChange={(e) => setCity(e.target.value)} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>
                        </div>
                        <div className='col-6'>

                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>State <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'
                                            style={{ height: '40px' }}
                                            maxLength={50} value={state} onChange={(e) => setState(e.target.value)} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>

                            <div className=" justify-content-center dialog-form-field-space">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>Zip <span className='form-field-mandatory'>*</span></label>
                                    <span className="p-float-label ">

                                        <InputText
                                            // className='dialog-form-input-field'
                                            style={{ height: '40px' }}
                                            maxLength={50} value={zip} onChange={(e) => setZip(e.target.value)} name='cityName'
                                        />



                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>





                   




                </div>

                <div className='justify-content-centre mt-3'>
                        <label htmlFor="" className='form-label font-fam-for-all'>Confirmed</label>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>

                <div className='flex justify-content-center'>
                    <Button type="submit" className="signup-btn font-fam-for-all" >Create New User</Button>
                    {/* <Button type='button' className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg bg-primary-reverse mr-2" onClick={cancelView} >Cancel</Button> */}
                </div>
                <div className='flex justify-content-centre mt-3 dialog-form-md-group-Btn'>
                    <span className='font-fam-for-all'>Already Have An Account ? <a href="/signin" className='font-fam-for-all'> Sign In </a></span>
                </div>
            </form>

        </div>

    )
}


