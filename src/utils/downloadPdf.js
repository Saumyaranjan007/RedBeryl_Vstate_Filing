import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router';
import ShiftsServices from '../services/demoServices';
import CreditCardServices from '../services/creditCardService';






const DownloadPdf = ({ visible, setVisible }) => {


    const [ingredient, setIngredient] = useState('');
    const toast = useRef(null);
    const [upload, setUpload] = useState('')
    const [selectedSkills, setSelectedSkills] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [cityErr, setCityErr] = useState('')
    const navigate = useNavigate()
    const [checked, setChecked] = useState(true)
    const [initData, setInitData] = useState(null)

    const [initData1, setInitData1] = useState(null)

    const [initData2, setInitData2] = useState(null)

    const [formData, setFormData] = useState({})

    const [creditAll, setCreditAll] = useState([])

    const [creditInfo, setCreditInfo] = useState(null)


    const [isChecked, setIsChecked] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false)
    const pdfRef = useRef();
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
        reset
    } = useForm('');

    useEffect(() => {
        ShiftsServices.getInit()
            .then((res) => {
                console.log(res.data)

                // const tempdata = res.data.data.contentTypes
                const tempdata = res.data.data
                if (tempdata.length > 0) {
                    const temp = tempdata.filter((val) => val.apiID === "llc")
                    const temp1 = tempdata.filter((val) => val.apiID === "llc-member")
                    const temp2 = tempdata.filter((val) => val.apiID === "credit-card-info")
                    console.log(temp2)
                    if (temp.length > 0) {
                        temp.map((val) => {
                            delete val.attributes.id
                        })
                        const temps = temp[0].attributes

                        setInitData(temps)
                    }
                    if (temp1.length > 0) {
                        temp1.map((val) => {
                            delete val.attributes.id
                        })
                        const temps = temp1[0].attributes

                        setInitData1(temps)
                    }
                    if (temp2.length > 0) {
                        temp2.map((val) => {
                            delete val.attributes.id
                        })
                        const temps = temp2[0].attributes

                        setInitData2(temps)
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })

        CreditCardServices.getCreditInfo()
            .then((res) => {
                console.log(res.data)
                setCreditAll(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    useEffect(() => {
        if (creditInfo !== null) {
            Object.keys(creditInfo).map((key, i) => {
                setValue(key, creditInfo[key])
            })

        }

    }, [setValue, creditInfo])


    console.log(initData2)



    const onCheckboxChange = (event) => {
        console.log(event.checked)
        setIsChecked1(false)
        setIsChecked(!isChecked)


    };

    const onCheckboxChange1 = (event) => {
        console.log(event.checked)
        setIsChecked(false)
        setIsChecked1(!isChecked1)


    };


    const dialogView = () => setVisible(false)
    const cancelView = () => {
        setVisible(false)
        setCityErr('')
        setCreditInfo(null)
        reset();
    }


    const handleCreditInfo = (e) => {
        setCreditInfo(e.target.value)
    }



    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        value: ''
    };



    const onSubmit = (e) => {
        e.preventDefault()

        console.log(formData)
        const actualData = {
            data: formData
        }
        ShiftsServices.createShifts(actualData)
            .then((res) => {
                console.log(res)
                setVisible(false)

            })
            .catch((err) => {
                console.log(err)
            })
        const input = pdfRef.current;
        // html2canvas(input).then((canvas) => {
        //     const imgData = canvas.toDataURL('image/png');
        //     const pdf = new jsPDF('p', 'mm', 'a4');
        //     const pdfWidth = pdf.internal.pageSize.getWidth();
        //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        //     pdf.save('document.pdf');



        // }).catch(error => {
        //     console.error('Error generating PDF:', error);
        // });



        const doc = new jsPDF("p", "pt", "legal");



        doc.html(input, {
            callback: function (doc) {

                doc.save('form.pdf');
            },
            margin: [10, 20, 30, 10],
            autoPaging: 'text',
            x: 0,
            y: 0,
            width: 500,
            windowWidth: 650
        });

    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="error-msg font-fam-for-all">{errors[name].message}</small> : <small className="error-msg "></small>;
    };


    const handleClick = () => {
        reset()
        setVisible(false)
    }

    const handleHeader = () => {
        return <>

            <div className='font-fam-for-all form-lg-heading form-sm-close-Btn' > <button className='form-close-Btn' onClick={handleClick}><i className='pi pi-times'></i></button></div>

        </>
    }

    const handleInputChange = (e, columnName) => {
        const value = e.target.value;
        setFormData({ ...formData, [columnName]: value });
    };


    const convertToTitleCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    }

    // const renderFormField = (column, key) => {

    //     switch (column.type) {
    //         case 'string':
    //             return <>
    //                 <div className=" justify-content-center dialog-form-field-space ml-2">
    //                     <div className="field">
    //                         <div className='d-flex download-form-field'>
    //                             <label htmlFor='' className=' font-fam-for-all' style={{ fontWeight: 'bold', fontSize: '12px' }}>{convertToTitleCase(key)} </label>


    //                             <InputText
    //                                 className='dialog-form-input-field-x'
    //                                 style={{ flexGrow: '1', fontSize: '12px', paddingLeft: '5px', paddingBottom: '5px' }}
    //                                 id={key} onChange={(e) => handleInputChange(e, key)} name='skillName'
    //                             />




    //                         </div>
    //                     </div>
    //                 </div></>;
    //         case 'number':
    //             return <input type="number" id={key} onChange={(e) => handleInputChange(e, key)} />;

    //         default:
    //             return null;
    //     }
    // };



    const renderFormField = (column, key) => {

        switch (column.type) {
            case 'string':
                return <>
                    <div className=" justify-content-center dialog-form-field-space ml-2">
                        <div className="field">
                            <div className='d-flex download-form-field'>
                                <label htmlFor='' className=' font-fam-for-all' style={{ fontWeight: 'bold', fontSize: '12px' }}>{convertToTitleCase(key)} </label>


                                <Controller name={key}
                                    control={control}

                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field}
                                            autoComplete={false}
                                            style={{ flexGrow: '1', paddingLeft: '10px', paddingBottom: '5px', fontWeight: 'bold' }}
                                            className='dialog-form-input-field-x'
                                            maxLength={50} />
                                    )} />




                            </div>
                        </div>
                    </div></>;
            case 'number':
                return <input type="number" id={key} onChange={(e) => handleInputChange(e, key)} />;

            default:
                return null;
        }
    };








    return (
        <div>
       
                <form id='myform' className='form-spacing' onSubmit={onSubmit}>

                    <Toast ref={toast} />
                    <div className=" justify-content-center dialog-form-md-field-space">
                        <div className="field">
                            <label htmlFor='' className='form-label font-fam-for-all'>Credit Info <span className='form-field-mandatory'>*</span></label>
                            <span className="p-float-label ">

                                <Dropdown
                                    value={creditInfo}
                                    options={creditAll}
                                    onChange={handleCreditInfo}
                                    optionLabel="CreditCardNo"
                                    placeholder="Select Credit Card"

                                    filter
                                    className='dialog-form-dropdown-field' required />


                            </span>
                        </div></div>
                    <div ref={pdfRef} className='font-fam-for-all' style={{ width: '750px', padding: '10px', backgroundColor: 'white', margin: 'auto', fontSize: '12px' }}>
                        <div className='ml-2'>
                            <p style={{ fontWeight: 'bold' }}>Accuracy of Information Disclaimer:</p>
                            <div className='grid pl-2'>
                                <p>This document (the "Document) is provided by "Provider, to the recipient, Interstate Filings LLC. hereinafter referred to as the 'Agent"</p>
                                <p>Accuracy of Information. The Provider hereby declares their knowledge and bellef at the time of its provision that all enformation contained in this Document is true and correct to the best of</p>
                                <p>No Liability for Emrs: While the Provider endeavors to ensure the accuracy of the information, errors or omissions may occur. The Agert shall not be held lable for rany inaccurades, emors or smissions in the information provided in This Document</p>
                                <p>Comections Updates, Modifications, Changes, and Revisions The Provider understands that if a conection, update, modification change, or revision of the information in the Document is required, as it relates to Entity information is the responsibility of te Entity andur Provider to notty Agent of the change. An amendment will be required with the fling State and an additional foe will apply No Legal or Professional Advies: The Agent moving this Document cannot provide any legal, financial, or professional advice. The

                                    Document prowa

                                    the Agent with the required Ently information for the sole purpose of fling the Articles of Incorporation</p>
                                <p>The The Provider should seekspropte penal advice tailored to their specific circumstances By accepting and using this Documents, the Provider agrees to the termes and covetions betloth in Pris Declamer</p>
                            </div>
                            {
                                initData1 !== null ? Object.keys(initData1).map((val, i) => {
                                    return (
                                        <>
                                            {
                                                renderFormField(initData1[val], val)
                                            }
                                        </>
                                    )
                                }) : ''
                            }

                            <div className='d-flex justify-content-center' style={{ marginTop: '100px', marginBottom: '350px' }}>
                                <p>( Continue to the next page for filling costs and payment authorization)</p>
                            </div>
                            <div className='card' style={{ height: '20px', marginBottom: '40px', backgroundColor: '#1e7ede', border: 'none' }}>

                            </div>
                        </div>





                        <div className='grid'>
                            <div className='col-12'>
                                <div className='d-flex justify-content-center'>
                                    <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>LLC Formation Fee Schedule</h5>

                                </div>
                            </div>
                            <div className='col-12 ml-2'>
                                <p>IMPORTANT: Plosse plece a check bellow for the services requested on behalf of the LLC</p>
                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $ 260.00
                                    </div>
                                    <div className='col-9'>
                                        State Filing Fee (Routne Service)
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $65.00
                                    </div>
                                    <div className='col-9'>
                                        24-hour Expedited Service
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $115.00
                                    </div>
                                    <div className='col-9'>
                                        Same Day Expedited Service
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $65.00
                                    </div>
                                    <div className='col-9'>
                                        24-hour Expedited Service
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $65.00
                                    </div>
                                    <div className='col-9'>
                                        Certified Copies
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $115.00
                                    </div>
                                    <div className='col-9'>
                                        Corponate K
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>

                                        $45.00
                                    </div>
                                    <div className='col-9'>
                                        EIN (Tax)
                                    </div>
                                </div>

                            </div>
                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $100.00
                                    </div>
                                    <div className='col-9'>
                                        Preparation of S Corp Election Forms (Form 2563 RS and CT 6er NY Dept. of Taxation & France)
                                    </div>
                                </div>

                            </div>

                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $59:00
                                    </div>
                                    <div className='col-9'>
                                        Beneficial Ownership Information (B00) with italing-after fing $59 (equr within 50 days of tamator)                                    </div>
                                </div>

                            </div>

                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>
                                    <div className='col-2'>
                                        $99.00
                                    </div>
                                    <div className='col-9'>
                                        Registered Agert service-PLEASE NOTE: Registered Agent requires annual renewat
                                    </div>
                                </div>

                            </div>

                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>

                                    </div>
                                    <div className='col-2'>

                                    </div>
                                    <div className='col-9'>
                                        <p>
                                            I, <input
                                                type="text"
                                                className='dialog-form-input-field-x'
                                                style={{ marginLeft: '5px', marginRight: '5px' }}
                                            />
                                            authonze Interstate Filings LLC to charge the credit card provided below an anual recurring fee of $09 for Registered Agent services. Non payment of the annual fee will result in Interstate Filings resignation as the corporation's Repotered Agent five additional terms and conditions of Regstered Agent services on Exhibit A, If a 3rd party will be responsible for subsequent Regemered Agent mouring charges, please emal name onders@erstatefings con with the entity and phone number Thank you
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className='col-12'>
                                <div className='d-flex justify-content-center'>
                                    <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>Credit Card Authorization</h5>

                                </div>
                            </div>

                            <div className='col-12 ml-2'>
                                <div className='grid'>
                                    <div className='col-1'>
                                        <Checkbox className='mb-1'></Checkbox>
                                    </div>

                                    <div className='col-11'>
                                        I havent with intense Filings and authorize thit charge to be billed to my account yet to app                                    </div>
                                </div>

                            </div>

                            <div className='col-12'>
                                <div className='d-flex justify-content-center'>
                                    <h6 style={{ textAlign: 'center', fontWeight: 'bold' }}>OR</h6>

                                </div>
                            </div>

                            <div className='col-12'>
                                <div className='grid'>


                                    {
                                        initData2 !== null ? Object.keys(initData2).map((val, i) => {
                                            console.log(val)
                                            if (val === "NameOfTheCreditCards") {
                                                return (
                                                    <>
                                                        <div className='col-12'>
                                                            {
                                                                renderFormField(initData2[val], val)
                                                            }
                                                        </div>

                                                    </>
                                                )
                                            }
                                            else {
                                                return (
                                                    <>
                                                        <div className='col-6'>
                                                            {
                                                                renderFormField(initData2[val], val)
                                                            }
                                                        </div>

                                                    </>
                                                )
                                            }
                                        }) : ''
                                    }
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className=" justify-content-center dialog-form-field-space ml-2">
                                    <div className="field">
                                        <div className='d-flex download-form-field'>
                                            <label htmlFor='' className=' font-fam-for-all' style={{ fontWeight: 'bold', fontSize: '12px' }}>Authorized Signature </label>


                                            <InputText
                                                className='dialog-form-input-field-x'
                                                style={{ flexGrow: '1', fontSize: '12px', paddingLeft: '5px', paddingBottom: '5px' }}
                                                name='skillName'
                                            />

                                            <label htmlFor='' className=' font-fam-for-all' style={{ fontWeight: 'bold', fontSize: '12px' }}>Date </label>


                                            <InputText
                                                className='dialog-form-input-field-x'
                                                style={{ flexGrow: '1', fontSize: '12px', paddingLeft: '5px', paddingBottom: '5px' }}
                                                name='skillName'
                                            />




                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 ml-2'>
                                <div className='card' style={{ height: '20px', marginBottom: '40px', backgroundColor: '#1e7ede', border: 'none' }}>

                                </div>
                            </div>


                        </div>






                        <div className='grid pl-0 ml-2'>
                            <div className='col-6 pl-0'>
                                <p style={{ fontWeight: 'bold' }}>State Of Formation : <span>NewYork</span></p>
                            </div>
                            <div className='col-6'>

                                <div className='grid'>
                                    <div className='col-4'>
                                        <p>Entity Type :</p>
                                    </div>
                                    <div className='col-8'>
                                        <Checkbox className='mb-1' checked={isChecked} onChange={(e) => onCheckboxChange(e)}></Checkbox>
                                        <span className='ml-1'>LLC</span>

                                        <Checkbox className='mb-1 ml-2' checked={isChecked1} onChange={(e) => onCheckboxChange1(e)}></Checkbox>
                                        <span className='ml-1'>PLLC</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="ml-2" style={{ fontWeight: 'bold' }}>Entity Information</p>
                        {
                            initData !== null ? Object.keys(initData).map((val, i) => {
                                return (
                                    <>
                                        {
                                            renderFormField(initData[val], val)
                                        }
                                    </>
                                )
                            }) : ''
                        }





                    </div>

                    <div className='flex justify-content-center dialog-form-md-group-Btn'>
                        <Button type="submit" className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg mr-3" >Submit</Button>
                        <Button type='button' className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg bg-primary-reverse mr-2" onClick={cancelView} >Cancel</Button>
                    </div>
                </form>
        
        </div>
    )
}

export default DownloadPdf