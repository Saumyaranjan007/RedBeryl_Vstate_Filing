import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
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
import ShiftsServices from '../../services/demoServices';
import { Dropdown } from 'primereact/dropdown';



const AddVendor = ({ visible, setVisible }) => {

    const [value, setValue] = useState('');
    const [ingredient, setIngredient] = useState('');
    const toast = useRef(null);
    const [upload, setUpload] = useState('')
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [checked, setChecked] = useState(true)
    const [allCustomer,setAllCustomer]=useState([])
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm('');



    const dialogView = () => setVisible(false)
    const cancelView = () => {
        setVisible(false)
        reset();
    }

    useEffect(() => {
        ShiftsServices.getCustomer()
            .then((res) => {
                console.log(res)
                setAllCustomer(res.data.QueryResponse.Customer)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])




    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        value: ''
    };



    const onSubmit = (data) => {

        const actualdata = {
            vendorName: data.vendorName,
            contactPerson: data.contactPerson,
            cin: data.cin,
            gstn: data.gstn,
            address: data.address,
            isActive: true,
            contactNo: data.contactNo,
            altContactNo: data.altContactNo


        }
        console.log(actualdata)
        console.log(typeof (actualdata.isInternal))

        setVisible(false)

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="error-msg font-fam-for-all ">{errors[name].message}</small> : <small className="error-msg "></small>;
    };


    // handle header
    const handleClick = () => {
        reset()
        setVisible(false)
    }

    const handleHeader = () => {
        return <>

            <div className='font-fam-for-all form-sm-heading form-sm-close-Btn' ><button className='form-close-Btn' onClick={handleClick}><i className='pi pi-times'></i></button></div>

        </>
    }








    return (
        <div>
            <Dialog header={handleHeader} visible={visible} className='dialog-box' onHide={dialogView}  >
                <form id='myform' className='form-spacing' onSubmit={handleSubmit(onSubmit)}>

                    <Toast ref={toast} />
                    <div className=" justify-content-center dialog-form-md-field-space">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Invoice No <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label ">
                                <Controller name="vendorName"
                                    control={control}
                                    rules={{ required: 'Vendor Name Required.', pattern: { value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/, message: 'Please Enter Valid Vendor Name' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}

                                            className='dialog-form-input-field'
                                            maxLength={50} />
                                    )} />

                            </span>

                        </div>
                    </div>

                    <div className=" justify-content-center dialog-form-md-field-space " >
                        <label htmlFor='' className='form-label font-fam-for-all'>Customer <span className='form-field-mandatory'>*</span></label>
                        <span className="p-float-label">
                            <Controller name="contactPerson"
                                control={control}
                                rules={{ required: 'Contact Person Required.', pattern: { value: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/, message: 'Please Enter Valid Contact Person Name.' } }}
                                render={({ field, fieldState }) => (
                                   
                                    <Dropdown
                                    id={field.name} filter name="jd" value={field.value} onChange={(e) => field.onChange(e.value)} optionLabel="FullyQualifiedName" 
                                    options={allCustomer}
                                
                                    style={{ width: '100%', height: '47px' }}
                                    placeholder="Select Customer"

                                
                                    className='wizard-input mb-3' required />
                                )} />

                        </span>

                    </div>
                    <div className=" justify-content-center dialog-form-md-field-space">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Services <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label ">
                                <Controller name="contactNo"
                                    control={control}
                                    rules={{ required: 'Contact No Required.', pattern: { value: /^\d+$/, message: 'Please Enter Valid Contact' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}

                                            className='dialog-form-input-field'
                                            maxLength={10} />
                                    )} />

                            </span>

                        </div>
                    </div>
                    <div className=" justify-content-center dialog-form-md-field-space ">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Amounts </label>
                            <span className="p-float-label ">
                                <Controller name="altContactNo"
                                    control={control}
                                    rules={{ required: 'Alternate Contact No Required.', pattern: { value: /^\d+$/, message: 'Please Enter Valid Contact' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}

                                            className='dialog-form-input-field'
                                            maxLength={10} />
                                    )} />

                            </span>

                        </div>
                    </div>

                    <div className=" justify-content-center  dialog-form-md-field-space">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Address <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label ">
                                <Controller name="address"
                                    control={control}
                                    rules={{ required: 'Address Required.', }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}

                                            className='dialog-form-input-field'
                                            maxLength={50} />
                                    )} />

                            </span>

                        </div>
                    </div>


                    <div className='flex justify-content-center dialog-form-md-group-Btn'>
                        <Button type="submit" className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg mr-3" >Submit</Button>
                        <Button type='button' className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg bg-primary-reverse mr-2" onClick={cancelView} >Cancel</Button>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default AddVendor