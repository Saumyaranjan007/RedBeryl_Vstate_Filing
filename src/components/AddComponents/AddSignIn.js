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
import SignIn from '../../services/SignInServices';

export const AddSignIn = ({ visible1, setVisible1 }) => {


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
        let City = e.target.value
        if (City === '') {
            setcityErr('Please Enter City')

        }
        if (City && City.trim() !== '') {
            if (!/^[A-Za-z\s]*$/.test(City)) {
                setcityErr("Please Enter Valid City");
            }

        }
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
        // const actualdata = {
        //     id: 1,
        //     cityName: ingredient,
        //     isActive: checked
        // }

        const actualdata={
            email:ingredient,
            password:password
        }
        SignIn.signIn(actualdata)
        // navigate("/dashboard")
        console.log(actualdata)

        if (actualdata.cityName !== '' && cityErr === '') {


        }
        else {
            setcityErr('Please Enter Your City')
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
                <div className=" justify-content-center dialog-form-field-space ">
                    <div className="field">
                        <label htmlFor='' className='form-label font-fam-for-all'>User Name <span className='form-field-mandatory'>*</span></label>
                        <span className="p-float-label ">

                            <InputText
                                // className='dialog-form-input-field'
                                style={{ width: '565px', height: '40px' }}
                                maxLength={50} value={ingredient} onChange={handleCity} name='cityName'
                            />


                            {/* <p className='error-msg font-fam-for-all'>{cityErr}</p> */}
                        </span>

                    </div>
                </div>


                {/* <div className=" justify-content-center dialog-form-field-space">
                    <div className="field">
                        <label htmlFor='' className='form-label font-fam-for-all'>Email <span className='form-field-mandatory'>*</span></label>
                        <span className="p-float-label ">

                            <InputText
                                className='dialog-form-input-field'
                                maxLength={50} value={email} onChange={handleEmail} name='cityName'
                            />



                        </span>

                    </div>
                </div> */}

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

                {/* <div className='justify-content-centre mt-3'>
                    <label htmlFor="" className='form-label font-fam-for-all'>Confirmed</label>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div> */}






                <div className='flex justify-content-center'>
                    <Button type="submit" className="signup-btn font-fam-for-all" >Sign In</Button>
                    {/* <Button type='button' className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg bg-primary-reverse mr-2" onClick={cancelView} >Cancel</Button> */}
                </div>

                <div className='flex justify-content-center dialog-form-md-group-Btn mt-3'>
                    <span className='font-fam-for-all'>Dont Have An Account? <a href="/signup">Sign Up</a></span>
                </div>
            </form>

        </div>

    )
}


