import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import CreditCardServices from '../../services/creditCardService';
import AddCity from './AddProduct';
import DownloadPdf from '../../utils/downloadPdf';
import SideBarMenu from '../../common/Sidebar';
import ShiftsServices from '../../services/demoServices';
import { Checkbox } from 'primereact/checkbox';
import { TabView, TabPanel } from 'primereact/tabview';
import { useForm, Controller } from "react-hook-form";
import { Dialog } from 'primereact/dialog';
import SuccessImage from "../../Assets/Images/icons8-success-96.png"
import ErroImage from "../../Assets/Images/error-icon.png"
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';


const DemoLLC = () => {


    const [allState, setAllState] = useState([
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
        "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
        "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ])

    const [creditAll, setCreditAll] = useState([])

    const [creditInfo, setCreditInfo] = useState(null)

    const [enityName, setEntityName] = useState("")

    const [state, setState] = useState(null)

    const [inputValue, setInputValue] = useState('');
    const [isAvailable, setIsAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [llcMember, setLLCMember] = useState([])

    const [llc, setLlc] = useState(null)

    const [allLLC, setAllLLC] = useState([])

    const [llcName, setLLCName] = useState(null)

    const [visible, setVisible] = useState(false)

    const [selectCheckBoxData, setSelectedCheckBoxData] = useState([])

    const [IsChecked1, setIsChecked1] = useState(false)

    const [IsChecked2, setIsChecked2] = useState(false)

    const [IsChecked3, setIsChecked3] = useState(false)

    const [IsChecked4, setIsChecked4] = useState(false)

    const [IsChecked5, setIsChecked5] = useState(false)

    const [IsChecked6, setIsChecked6] = useState(false)

    const [IsChecked7, setIsChecked7] = useState(false)

    const [IsChecked8, setIsChecked8] = useState(false)

    const [IsChecked9, setIsChecked9] = useState(false)

    const [IsChecked10, setIsChecked10] = useState(false)

    const [IsChecked11, setIsChecked11] = useState(false)

    const [currentTab, setCurrentTab] = useState(0)


    const [closeProgresbar, setCloseProgresbar] = useState(false)

    const [closeProgresbar1, setCloseProgresbar1] = useState(false)

    const [dba, setDba] = useState("")

    const [name, setName] = useState("")

    const [AlternateName, setAlternateName] = useState("")

    const [llcAddress, setLLCAddress] = useState("")

    const [mailingAddress, setMailingAddress] = useState("")

    const [initData, setInitData] = useState(null)

    const [initData1, setInitData1] = useState(null)

    const [initData2, setInitData2] = useState(null)

    const [allInitData, setAllInitData] = useState([])

    const [inputFormData, setInputFormData] = useState([])

    const [allModels, setAllModels] = useState([])

    const [modelData, setModelData] = useState([])

    const [modelData1, setModelData1] = useState([])


    const [IsSuccessful, setIsSuccessFul] = useState(false)

    const [modelName, setModelName] = useState(null)

    const [currentStep, setCurrentStep] = useState(1);





    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset
    } = useForm('');



    useEffect(() => {

        const data = watch()
        console.log(data)
        if (initData !== null && initData1 !== null && initData2 !== null) {

            const filteredLLCDetails = Object.keys(initData).reduce((acc, key) => {
                if (key in data) {
                    acc[key] = data[key];
                }
                return acc;
            }, {});

            const temps = allModels.map((val) => {
                return Object.keys(val.attributes).reduce((acc, key) => {
                    if (key in data) {
                        acc[key] = data[key];
                    }
                    return acc;
                }, {});
            })




            const filteredLLCMember = Object.keys(initData1).reduce((acc, key) => {
                if (key in data) {
                    acc[key] = data[key];
                }
                return acc;
            }, {});


            const filteredCreditInfo = Object.keys(initData2).reduce((acc, key) => {
                if (key in data) {
                    acc[key] = data[key];
                }
                return acc;
            }, {});

            const tem = allModels.map((val) => {
                const temps = Object.keys(data).reduce((acc, key) => {
                    if (Object.keys(val.attributes).some((ele) => ele === key)) {
                        acc[key] = data[key];
                    }
                    return acc;
                }, {});

                const convertdata = val.apiID

                return {
                    model: (convertdata).replace(/-/g, "_"),
                    data: temps
                };
            });

            const tempsData = allModels.map((val) => {
                const temps = Object.keys(data).reduce((acc, key) => {
                    if (Object.keys(val.attributes).some((ele) => ele === key)) {
                        acc[key] = data[key];
                    }
                    return acc;
                }, {});

                const convertdata = val.apiID

                return {
                    model: convertdata,
                    data: temps
                };
            });

            console.log(tem);

            setModelData(tem)
            setModelData1(tempsData)

            setLLCName(filteredLLCDetails)
            setLlc(filteredLLCMember)
            setCreditInfo(filteredCreditInfo)
            console.log(filteredCreditInfo)
            console.log(filteredLLCDetails)
            console.log(filteredLLCMember)
        }
    }, [getValues, setValue, currentTab])



    useEffect(() => {
        ShiftsServices.getInit()
            .then((res) => {
                console.log(res.data)

                // const tempdata = res.data.data.contentTypes
                const tempdata = res.data.data
                console.log(tempdata)
                setAllInitData(tempdata)

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

    function flattenArray(array) {
        return array.map(item => {
            const result = {};
            for (const key in item) {
                if (Array.isArray(item[key])) {
                    result[key] = item[key].flat();
                }
            }
            return result;
        });
    }


    // function reorderAttributes(a, b) {
    //     const aObj = a[0];

    //     return b.map(item => {
    //         const apiID = item.apiID;
    //         if (aObj[apiID]) {
    //             const order = aObj[apiID].map(attr => attr.name);
    //             const newAttributes = {};


    //             order.forEach(key => {
    //                 if (item.attributes[key]) {
    //                     newAttributes[key] = item.attributes[key];
    //                 }
    //             });


    //             for (const key in item.attributes) {
    //                 if (!newAttributes[key]) {
    //                     newAttributes[key] = item.attributes[key];
    //                 }
    //             }


    //             item.attributes = newAttributes;
    //         }

    //         return item;
    //     });
    // }

    function reorderAttributes(a, b) {
        console.log(a)

        const temp = b.map(item => {
            for (let i = 0; i < a.length; i++) {
                const aObj = a[i];
                console.log(aObj)
                const apiID = item.apiID;
                console.log(aObj[apiID])
                if (aObj[apiID]) {
                    const order = aObj[apiID].map(attr => attr.name);
                    const newAttributes = {};


                    order.forEach(key => {
                        if (item.attributes[key]) {
                            newAttributes[key] = item.attributes[key];
                        }
                    });


                    for (const key in item.attributes) {
                        if (!newAttributes[key]) {
                            newAttributes[key] = item.attributes[key];
                        }
                    }


                    item.attributes = newAttributes;
                }

               
            }
            return item;
        });

        console.log(temp)
        return temp;


    }

    useEffect(() => {
        ShiftsServices.getAllFormInfo()
            .then((response) => {
                console.log(response.data)
                const formData = response.data.filter((ele) => ele.companyType === enityName && ele.state === state)
                if (formData.length > 0) {
                    console.log(formData)
                    const firstData = formData[0].formFieldCollection
                    if (firstData !== "") {




                        console.log(firstData)
                        console.log(allInitData)
                        setModelName(firstData)
                        const tempFieldArr = allInitData.filter((val) => val.apiID === firstData)
                        console.log(tempFieldArr)
                        if (tempFieldArr.length > 0) {
                            const tempAtributes = tempFieldArr[0].attributes

                            const temps = Object.keys(tempAtributes).map((key, i) => {
                                return tempAtributes[key].model
                            })

                            const tempsFormData = temps.filter((val) => val !== undefined)
                            console.log(tempsFormData)

                            const tempsFormDataType = allInitData.filter((val) => {
                                return tempsFormData.some((ele) => val.apiID === ele)
                            })

                            console.log(tempsFormDataType)

                            setAllModels(tempsFormDataType)

                            const tempd = tempsFormDataType.map(async (val) => {

                                const response = await CreditCardServices.getConfiguration(`application::${val.apiID}.${val.apiID}`)



                                const tempdata = val.apiID
                                console.log(response)

                                if (response.data !== undefined) {
                                    return {
                                        [tempdata]: response.data.data.contentType.layouts.edit !== undefined ? response.data.data.contentType.layouts.edit : {}
                                    }
                                }

                            })

                            console.log(tempd)

                            Promise.all(tempd).then((results) => {
                                console.log(results);

                                const flatArr = flattenArray(results)
                                console.log(flatArr)
                                console.log(tempsFormDataType)

                                const updatedB = reorderAttributes(flatArr, tempsFormDataType);
                                console.log(updatedB)
                                const tempsFormDataTypeAtribute = updatedB.map((val) => {
                                    return val.attributes
                                })

                                const finalData = tempsFormDataTypeAtribute.map((val) => {
                                    delete val.id
                                    return val;
                                })

                                console.log(finalData)
                                setInputFormData(finalData)
                                console.log(JSON.stringify(updatedB, null, 2));


                            }).catch((err) => {
                                console.log(err);
                            });


                        }

                    }
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }, [enityName, state])


    const checkAvailability = async (value) => {
        setLoading(true);
        setError('');
        try {
            // const response = await axios.get(`https://api.example.com/check-availability?value=${value}`);
            // setIsAvailable(response.data.isAvailable);
        } catch (err) {
            setError('Error checking availability');
        }
        setLoading(false);
    };
    // Current tab is set to be the first tab (0)
    useEffect(() => {
        showTab(currentTab);
    }, [currentTab])

    useEffect(() => {
        CreditCardServices.getCreditInfo()
            .then((res) => {
                console.log(res.data)
                setCreditAll(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        CreditCardServices.getLLCmember()
            .then((res) => {
                console.log(res.data)
                setLLCMember(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        CreditCardServices.getLLC()
            .then((res) => {
                console.log(res.data)
                setAllLLC(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        ShiftsServices.getCustomer()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [])


    const getFormErrorMessage = (name) => {

        return errors[name] ? <small className="error-msg font-fam-for-all ">{errors[name].message}</small> : <small className="error-msg "></small>;
    };


    const renderFormField = (column, key) => {

        switch (column.type) {
            case 'string':
                return <>
                    <div className='input-fields-container'>
                        <div className='input-fields-main'>
                            <div className=" justify-content-center dialog-form-field-space ">
                                <div className="field">
                                    <label htmlFor='' className='form-label font-fam-for-all'>{convertToTitleCase(key)} {column.required !== undefined && column.required === true ? <span className='form-field-mandatory'>*</span> : ''}</label>
                                    <span className="p-float-label ">

                                        <Controller name={key}
                                            control={control}
                                            rules={column.required !== undefined && column.required === true ? { required: `${convertToTitleCase(key)} Required.` } : {}}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field}
                                                    autoComplete={false}
                                                    style={{ flexGrow: '1', paddingLeft: '10px', paddingBottom: '5px', fontWeight: 'bold' }}
                                                    className='dialog-form-input-field-wizard'
                                                    maxLength={50} />
                                            )} />



                                    </span>
                                    {getFormErrorMessage(key)}
                                </div>
                            </div>

                        </div>

                    </div>
                </>;
            case 'number':
                return <input type="number" id={key} />;

            default:
                return null;
        }
    };


    const renderFormField1 = (column, key) => {

        switch (column.type) {
            case 'string':
                return <>
                    <div className='input-fields-container'>
                        <div className='input-fields-main'>
                            <div className=" justify-content-center dialog-form-field-space ">
                                <div className="">
                                    <label htmlFor='' className='form-label font-fam-for-all'>{convertToTitleCase(key)} {column.required !== undefined && column.required === true ? <span className='form-field-mandatory'>*</span> : ''}</label>
                                    <span className="p-float-label ">

                                        <Controller name={key}
                                            control={control}
                                            rules={column.required !== undefined && column.required === true ? { required: `${convertToTitleCase(key)} Required.` } : {}}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field}
                                                    autoComplete={false}
                                                    style={{ flexGrow: '1', paddingLeft: '10px', paddingBottom: '5px', fontWeight: 'bold', width: '435px', height: '40px' }}

                                                    maxLength={50} />
                                            )} />



                                    </span>
                                    {getFormErrorMessage(key)}
                                </div>
                            </div>

                        </div>

                    </div>
                </>;
            case 'number':
                return <input type="number" id={key} />;

            default:
                return null;
        }
    };

    console.log(selectCheckBoxData)

    function showTab(n) {
        // This function will display the specified tab of the form...
        var x = document.getElementsByClassName("tab");
        console.log(x)
        if (x.length > 0) {
            if (x[n] !== undefined) {
                x[n].style.display = "block";
            }

            //... and fix the Previous/Next buttons:
            if (n == 0) {
                document.getElementById("prevBtn").style.display = "none";
            } else {
                document.getElementById("prevBtn").style.display = "flex";
            }
            if (n == (x.length - 1) && inputFormData.length > 0) {
                // document.getElementById("nextBtn").innerHTML = "Submit";
                document.getElementById("nextBtn").style.display = "none"
                document.getElementById("submitBtn").style.display = "flex"

            } else {
                document.getElementById("nextBtn").innerHTML = "Next";
                document.getElementById("nextBtn").style.display = "flex"
                document.getElementById("submitBtn").style.display = "none"

            }
            //... and run a function that will display the correct step indicator:
            fixStepIndicator(n)
        }

    }

    const nextPrev = (n) => {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        if (n === 1) {
            if (currentStep < inputFormData.length + 5) {
                setCurrentStep(currentStep + 1);
            }
        }

        if (n === -1) {
            if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
            }
        }

        // Exit the function if any field in the current tab is invalid:
        console.log(n)
        if (x.length > 0) {
            if (n == 1 && !validateForm()) return false;
            // Hide the current tab:
            console.log(currentTab)
            if (x[currentTab] !== undefined) {
                x[currentTab].style.display = "none";
            }

            // Increase or decrease the current tab by 1:
            const newTab = currentTab + n;

            console.log(newTab)
            setCurrentTab(newTab)
            // if you have reached the end of the form...
            if (newTab >= x.length) {
                // ... the form gets submitted:
                // document.getElementById("regForm").submit();
                // return false;
            }
            // Otherwise, display the correct tab:
            showTab(newTab);


        }
        document.getElementById('nextBtn').addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll
            });
        });
    }

    const stepLabels = Array.from({ length: inputFormData.length + 5 }, (_, i) => `Step ${i + 1} of ${inputFormData.length + 5}`);

    console.log(currentTab)

    function validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        if (x.length > 0) {

        }
        if (x[currentTab] !== undefined) {
            y = x[currentTab].getElementsByTagName("input");
        }

        // A loop that checks every input field in the current tab:
        // for (i = 0; i < y.length; i++) {
        //     // If a field is empty...
        //     if (y[i].value == "") {
        //         // add an "invalid" class to the field:
        //         y[i].className += " invalid";
        //         // and set the current valid status to false
        //         valid = false;
        //     }
        // }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            if (document.getElementsByClassName("step")[currentTab] !== undefined) {
                document.getElementsByClassName("step")[currentTab].className += " finish";
            }

        }
        return valid; // return the valid status
    }

    function fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class on the current step:
        if (x[n] !== undefined) {
            x[n].className += " active";
        }

    }


    const handleComapnyName = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Only check availability if the input is not empty
        if (value) {
            checkAvailability(value);
        } else {
            setIsAvailable(null);
        }
    }

    const handleLLCMember = (e) => {
        setLlc(e.target.value)
    }

    console.log(modelData)



    const onSubmit = (data) => {

        console.log(data)




        const customerBody = {
            "FullyQualifiedName": data.LLCName,
            "PrimaryEmailAddr": {
                "Address": data.LLCContactEmail
            },
            "DisplayName": data.LLCName,
            "Suffix": "Jr",
            "Title": "Mr",
            "MiddleName": "B",
            "Notes": "Here are other details.",
            "FamilyName": "",
            "PrimaryPhone": {
                "FreeFormNumber": data.LLCContactPhone
            },
            "CompanyName": data.LLCName,
            "BillAddr": {
                "CountrySubDivisionCode": data.state,
                "City": data.City,
                "PostalCode": "94042",
                "Line1": "123 Main Street",
                "Country": "USA"
            },
            "GivenName": data.NameOfPersonPreparingThisForm
        }
        console.log(customerBody)

        const temps = modelData1.map(async (val) => {

            const response = await CreditCardServices.createModeldata(val.data, val.model)


            const tempdata = (val.model).replace(/-/g, "_")
            console.log(response)
            return {
                [tempdata]: response.data !== undefined ? response.data : {}
            }
        })

        console.log(temps)

        Promise.all(temps).then((results) => {
            console.log(results);
            const result = results.reduce((acc, obj) => {

                const key = Object.keys(obj)[0];

                acc[key] = obj[key];
                return acc;
            }, {});
            console.log(result)
            CreditCardServices.createAlabamaLLC(result, modelName)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err);
        });






        ShiftsServices.createCustomer(customerBody)
            .then((res) => {
                console.log(res)
                const actualdata = {
                    "Line": [
                        {
                            "DetailType": "SalesItemLineDetail",
                            "Amount": totalAmount,
                            "SalesItemLineDetail": {
                                "ItemRef": {
                                    "name": "Services",
                                    "value": "1"
                                }
                            }
                        }
                    ],
                    "CustomerRef": {
                        "value": res.data.Customer.Id
                    }
                }

                const paydata = {
                    "TotalAmt": totalAmount,
                    "CustomerRef": {
                        "value": res.data.Customer.Id
                    }
                }
                ShiftsServices.createInvoice(actualdata)
                    .then((res) => {
                        console.log(res)
                        const tempActualData = {
                            InvoiceNo: res.data.Invoice.DocNumber,
                            CustomerName: res.data.Invoice.CustomerRef.name,
                            TotalAmt: res.data.Invoice.TotalAmt,
                            Balance: res.data.Invoice.Balance,
                            DueDate: res.data.Invoice.DueDate
                        }
                        ShiftsServices.createCompanyInvoice(tempActualData)
                            .then((res) => {
                                console.log(res)
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        CreditCardServices.createPayment(paydata)
                            .then((res) => {
                                console.log(res)
                                setCloseProgresbar(true)
                            })
                            .catch((err) => {
                                console.log(err)
                                setCloseProgresbar1(true)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                        setCloseProgresbar1(true)
                    })
            })
            .catch((err) => {
                console.log(err)
                setCloseProgresbar1(true)
            })

    }


    const convertToTitleCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    }


    const handleChecked1 = (e, data, checkboxIndex) => {
        const { checked } = e.target;

        if (checked) {
            // Add data to selectedCheckBoxData
            setSelectedCheckBoxData((prev) => [...prev, data]);
        } else {
            // Remove data from selectedCheckBoxData
            setSelectedCheckBoxData((prev) =>
                prev.filter((item) => item.service !== data.service)
            );
        }

        // Update individual checkbox state
        if (checkboxIndex === 1) {
            setIsChecked1(checked);
        }
        else if (checkboxIndex === 2) {
            setIsChecked2(checked);
        }
        else if (checkboxIndex === 3) {
            setIsChecked3(checked)
        }
        else if (checkboxIndex === 4) {
            setIsChecked4(checked)
        }
        else if (checkboxIndex === 5) {
            setIsChecked5(checked)
        }
        else if (checkboxIndex === 6) {
            setIsChecked6(checked)
        }
        else if (checkboxIndex === 7) {
            setIsChecked7(checked)
        }
        else if (checkboxIndex === 8) {
            setIsChecked8(checked)
        }
        else if (checkboxIndex === 9) {
            setIsChecked9(checked)
        }
        else if (checkboxIndex === 10) {
            setIsChecked10(checked)
        }


    }



    const totalAmount = selectCheckBoxData.reduce((total, item) => {
        // Remove the dollar sign and convert the string to a number
        const amount = parseFloat(item.amount.replace('$', ''));
        return total + amount;
    }, 0);



    return (
        <div className='grid font-fam-for-all'>


            <div className='col-2' style={{ backgroundColor: '#ffff' }}>
                <SideBarMenu />
            </div>
            <div className='col-10' style={{ backgroundColor: '#ffff' }}>
                <div className='card-container-wizard font-fam-for-all card'>
                    <div className='wizard-header'>
                        <div className='wizard-header-container'>
                            <div className='page-wizard-header'>
                                <div className='page-wizard-content'>
                                    <div className='page-text-header'>
                                        <div className='page-text-header-p'>
                                            Form an LLC
                                        </div>
                                        <div className='page-text-header-p1'>
                                            Register your company online in minutes. Complete the following steps to get started.
                                        </div>
                                    </div>
                                    <div className='page-text-content'>
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
                        </div>

                        <div className='wizard-content-container'>
                            <div className='wizard-content-main'>
                                <div className='wizard-content-frame'>
                                    <div className='wizard-content-card'>
                                        {/* <div className='wizard-content-card-header'>
                                            <div className='section-header-card'>
                                                <div className='section-header-card-frame'>
                                                    <Button icon='pi pi-arrow-left' id="prevBtn" onClick={() => nextPrev(-1)}></Button>
                                                </div>
                                            </div>
                                           
                                        </div> */}
                                        <div className='wizard-form-card-header-container'>
                                            <div className='wizard-form-card-header-actiob-container'>
                                                <div className='wizard-form-card-frame'>
                                                    {inputFormData.length > 0 ? <div className='wizard-form-card-header-text1'>
                                                        {`Step ${currentStep} of ${inputFormData.length + 5}`}
                                                    </div> : <div className='wizard-form-card-header-text1'>
                                                        {`Step 1 of 1`}
                                                    </div>}
                                                    {inputFormData.length > 0 ? <div className='wizard-form-card-header-text2'>
                                                        Total due today
                                                    </div> : ''}
                                                </div>
                                                <div className='wizard-form-card-frame'>
                                                    <div className='wizard-form-card-header-text3'>
                                                        Entity Details
                                                    </div>
                                                    {inputFormData.length > 0 ? <div className='wizard-form-card-header-text4'>
                                                        {`$${totalAmount}`}
                                                    </div> : ''}
                                                </div>
                                            </div>
                                        </div>



                                        <div style={{ marginTop: '12px', textAlign: 'center', marginBottom: '10px', display: 'flex', width: '100%' }}>
                                            <span class="step"><div className='mt-2'></div></span>
                                            {
                                                inputFormData.map((val) => (
                                                    <span class="step"><div className='mt-2'></div></span>
                                                ))
                                            }

                                            {/* <span class="step"><div className='mt-2'></div></span> */}
                                            {
                                                inputFormData.length > 0 ? <>

                                                    <span class="step"><div className='mt-2'></div></span>
                                                    <span class="step"><div className='mt-2'></div></span>
                                                    <span class="step"><div className='mt-2'></div></span>
                                                    <span class="step"><div className='mt-2'></div></span>

                                                </> : ''}
                                        </div>





                                        <div className='wizard-main-content'>
                                            <div className='wizard-main-sub-content'>


                                                <form className='form-wizard' onSubmit={handleSubmit(onSubmit)}>

                                                    <div className="tab">
                                                        <div className='wizard-content-sub-card-header mb-3' id="header">
                                                            <div className='wizard-content-sub-card-text-frame'>
                                                                <div className='wizard-content-sub-card-text'>
                                                                    Select State & Entity
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='wizard-form-header' style={{ fontWeight: 'bold' }}>
                                                            Select Entity Type

                                                            <div className='entity-radio-content'>
                                                                <RadioButton inputId="ingredient1" name="pizza" value="LLC" onChange={(e) => setEntityName(e.value)} checked={enityName === 'LLC'} />
                                                                <label htmlFor="ingredient1" className="ml-2 mb-0">LLC</label>
                                                            </div>
                                                            <div className='entity-radio-content'>
                                                                <RadioButton inputId="ingredient2" name="pizza" value="PLLC" onChange={(e) => setEntityName(e.value)} checked={enityName === 'PLLC'} />
                                                                <label htmlFor="ingredient2" className="ml-2 mb-0">PLLC</label>
                                                            </div>
                                                        </div>

                                                        <div className='input-fields-main'>
                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                <div className="field">
                                                                    <label htmlFor='' className='form-label font-fam-for-all'>State of formation <span className='form-field-mandatory'>*</span></label>
                                                                    <span className="p-float-label ">

                                                                        <Controller
                                                                            name="state"
                                                                            control={control}

                                                                            render={({ field }) =>
                                                                                <Dropdown
                                                                                    value={field.value}
                                                                                    id={field.name}
                                                                                    options={allState}
                                                                                    onChange={(e) => {
                                                                                        field.onChange(e.value)
                                                                                        setState(e.value)
                                                                                    }


                                                                                    }
                                                                                    style={{ width: '100%', height: '47px' }}
                                                                                    placeholder="Select State"

                                                                                    filter
                                                                                    className='dialog-form-input-field-wizard' required />}
                                                                        />


                                                                    </span>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>


                                                    {
                                                        inputFormData.map((value, i) => (
                                                            <div className="tab" key={i}>
                                                                <div className='wizard-content-sub-card-header mb-3' id="header">
                                                                    <div className='wizard-content-sub-card-text-frame'>
                                                                        <div className='wizard-content-sub-card-text'>
                                                                            To comply with state filling requirements, please provide following details
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                <div className='grid'>
                                                                    {
                                                                        Object.keys(value).map((val, i) =>


                                                                        (
                                                                            <>

                                                                                <div className='col-6'>
                                                                                    {
                                                                                        renderFormField(value[val], val)
                                                                                    }
                                                                                </div>





                                                                            </>
                                                                        )
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))

                                                    }


                                                    {inputFormData.length > 0 ? <> <div class="tab">
                                                        <div className='wizard-content-sub-card-header mb-3' id="header">
                                                            <div className='wizard-content-sub-card-text-frame'>
                                                                <div className='wizard-content-sub-card-text'>
                                                                    Registered Agent Service                                                                </div>
                                                            </div>
                                                        </div>





                                                        <div className='wizard-card-checkbox-container'>
                                                            <div className='wizard-card-checkbox-main'>
                                                                <div className='wizard-card-checkbox-text-main'>
                                                                    <div className='wizard-card-checkbox-text-sub-main'>
                                                                        <div className='wizard-card-checkbox-text-container'>
                                                                            <div className='wizard-card-checkbox-text1'>
                                                                                Check here if you would like vState Fillings to act as your Registered Agent (Annual renewal applied)
                                                                            </div>
                                                                            <div className='wizard-card-checkbox-text2'>
                                                                                $99
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className='wizard-card-checkbox-action-container'>
                                                                        <Checkbox className='mt-2' checked={IsChecked10} onChange={(e) => handleChecked1(e, { "service": "Registered Agent Service", "amount": "$99" }, 10)}></Checkbox>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {IsChecked10 === false ? <><div className='input-fields-container'>
                                                            <div className='input-fields-main'>
                                                                <div className=" justify-content-center dialog-form-field-space ">
                                                                    <div className="field">
                                                                        <label htmlFor='' className='form-label font-fam-for-all'>Name of Registered Agent <span className='form-field-mandatory'>*</span></label>
                                                                        <span className="p-float-label ">
                                                                            <InputText
                                                                                className='dialog-form-input-field-wizard'

                                                                                maxLength={50} name='cityName'
                                                                            />



                                                                        </span>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className='input-fields-main'>
                                                                <div className=" justify-content-center dialog-form-field-space ">
                                                                    <div className="field">
                                                                        <label htmlFor='' className='form-label font-fam-for-all'>Address Registered Agent <span className='form-field-mandatory'>*</span></label>
                                                                        <span className="p-float-label ">

                                                                            <InputText
                                                                                className='dialog-form-input-field-wizard'

                                                                                maxLength={50} name='cityName'
                                                                            />



                                                                        </span>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                            <div className='wizard-content-checkbox-container'>
                                                                <div>
                                                                    <Checkbox className='mt-2' checked={IsChecked11} onChange={(e) => setIsChecked11(!IsChecked11)}></Checkbox>
                                                                </div>
                                                                <div className='wizard-content-checkbox-text'>
                                                                    Autorize Vstate Fillings LLC to charge the credit
                                                                    card provided below an annual recurring fee of $99 for Registered Agent services. Non-payment of the
                                                                    annual fee will result in Interstate Filings' resignation as the corporation’s Registered Agent.
                                                                </div>
                                                            </div></> : ''}


                                                    </div>

                                                        <div class="tab">


                                                            <div className='wizard-content-sub-card-header mb-3' id="header">
                                                                <div className='wizard-content-sub-card-text-frame'>
                                                                    <div className='wizard-content-sub-card-text'>
                                                                        LLC Formation Fee Schedule                                                                </div>
                                                                </div>
                                                            </div>

                                                            <div className='wizard-card-checkbox-container mb-4'>
                                                                <div className='wizard-card-checkbox-main'>
                                                                    <div className='wizard-card-checkbox-text-main'>
                                                                        <div className='wizard-card-checkbox-text-sub-main'>
                                                                            <div className='wizard-card-checkbox-text-container'>
                                                                                <div className='wizard-card-checkbox-text1'>
                                                                                    State Filling Fee
                                                                                </div>
                                                                                <div className='wizard-card-checkbox-text2'>
                                                                                    $230
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className='wizard-card-checkbox-action-container'>
                                                                            <Checkbox className='mt-2' checked={IsChecked1} onChange={(e) => handleChecked1(e, { "service": "State Filling Fee", "amount": "$230" }, 1)}></Checkbox>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='wizard-card-radio-container mb-4'>
                                                                <div className='wizard-card-radio-main'>
                                                                    <div className='wizard-card-radio-main1'>
                                                                        <div className='wizard-card-radio'>
                                                                            <div className='wizard-card-content'>
                                                                                <div className='wizard-card-radio-sub-content'>
                                                                                    <div className='wizard-card-radio-text-main'>
                                                                                        <div className='wizard-card-radio-text1'>
                                                                                            24-hour Expedited Service
                                                                                        </div>
                                                                                        <div className='wizard-card-radio-text2'>
                                                                                            $50
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <Checkbox className='mt-2' checked={IsChecked7} onChange={(e) => handleChecked1(e, { "service": "24-hour Expedited Service", "amount": "$50" }, 7)}></Checkbox>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='wizard-card-radio-main'>
                                                                    <div className='wizard-card-radio-main1'>
                                                                        <div className='wizard-card-radio'>
                                                                            <div className='wizard-card-content'>
                                                                                <div className='wizard-card-radio-sub-content'>
                                                                                    <div className='wizard-card-radio-text-main'>
                                                                                        <div className='wizard-card-radio-text1'>
                                                                                            Same Day Service
                                                                                        </div>
                                                                                        <div className='wizard-card-radio-text2'>
                                                                                            $360
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <Checkbox className='mt-2' checked={IsChecked8} onChange={(e) => handleChecked1(e, { "service": "Same Day Service", "amount": "$360" }, 8)}></Checkbox>                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='wizard-card-radio-main'>
                                                                    <div className='wizard-card-radio-main1'>
                                                                        <div className='wizard-card-radio'>
                                                                            <div className='wizard-card-content'>
                                                                                <div className='wizard-card-radio-sub-content'>
                                                                                    <div className='wizard-card-radio-text-main'>
                                                                                        <div className='wizard-card-radio-text1'>
                                                                                            2-hour Service
                                                                                        </div>
                                                                                        <div className='wizard-card-radio-text2'>
                                                                                            $660
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <Checkbox className='mt-2' checked={IsChecked9} onChange={(e) => handleChecked1(e, { "service": "2-hour Service", "amount": "$660" }, 9)}></Checkbox>                                                                        </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>



                                                            <div className='wizard-card-checkbox-container mb-4'>
                                                                <div className='wizard-card-checkbox-main'>
                                                                    <div className='wizard-card-checkbox-text-main'>
                                                                        <div className='wizard-card-checkbox-text-sub-main'>
                                                                            <div className='wizard-card-checkbox-text-container'>
                                                                                <div className='wizard-card-checkbox-text1'>
                                                                                    Certified Copies                                                                            </div>
                                                                                <div className='wizard-card-checkbox-text2'>
                                                                                    $230
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className='wizard-card-checkbox-action-container'>
                                                                            <Checkbox className='mt-2' checked={IsChecked2} onChange={(e) => handleChecked1(e, { "service": "Certified Copies", "amount": "$230" }, 2)}></Checkbox>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='wizard-card-checkbox-container mb-4'>
                                                                <div className='wizard-card-checkbox-main'>
                                                                    <div className='wizard-card-checkbox-text-main'>
                                                                        <div className='wizard-card-checkbox-text-sub-main'>
                                                                            <div className='wizard-card-checkbox-text-container'>
                                                                                <div className='wizard-card-checkbox-text1'>
                                                                                    EIN (Tax ID #)                                                                            </div>
                                                                                <div className='wizard-card-checkbox-text2'>
                                                                                    $45
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className='wizard-card-checkbox-action-container'>
                                                                            <Checkbox className='mt-2' checked={IsChecked3} onChange={(e) => handleChecked1(e, { "service": "EIN (Tax ID #)", "amount": "$45" }, 3)}></Checkbox>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='wizard-card-checkbox-container mb-4'>
                                                                <div className='wizard-card-checkbox-main'>
                                                                    <div className='wizard-card-checkbox-text-main'>
                                                                        <div className='wizard-card-checkbox-text-sub-main'>
                                                                            <div className='wizard-card-checkbox-text-container'>
                                                                                <div className='wizard-card-checkbox-text1'>
                                                                                    Preparation of S Corp Election Form (Form 2553 for IRS)                                                                            </div>
                                                                                <div className='wizard-card-checkbox-text2'>
                                                                                    $100
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className='wizard-card-checkbox-action-container'>
                                                                            <Checkbox className='mt-2' checked={IsChecked4} onChange={(e) => handleChecked1(e, { "service": "Preparation of S Corp Election Form (Form 2553 for IRS)", "amount": "$100" }, 4)}></Checkbox>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='wizard-card-checkbox-container mb-4'>
                                                                <div className='wizard-card-checkbox-main'>
                                                                    <div className='wizard-card-checkbox-text-main'>
                                                                        <div className='wizard-card-checkbox-text-sub-main'>
                                                                            <div className='wizard-card-checkbox-text-container'>
                                                                                <div className='wizard-card-checkbox-text1'>
                                                                                    BOI (Beneficial Ownership Information) with initial filling - after filling $99 (Required within 90 days of formation)                                                                            </div>
                                                                                <div className='wizard-card-checkbox-text2'>
                                                                                    $59
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className='wizard-card-checkbox-action-container'>
                                                                            <Checkbox className='mt-2' checked={IsChecked5} onChange={(e) => handleChecked1(e, { "service": "BOI (Beneficial Ownership Information) with initial filling - after filling $99 (Required within 90 days of formation)", "amount": "$59" }, 5)}></Checkbox>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <div className='wizard-card-checkbox-container mb-4'>
                                                            <div className='wizard-card-checkbox-main'>
                                                                <div className='wizard-card-checkbox-text-main'>
                                                                    <div className='wizard-card-checkbox-text-sub-main'>
                                                                        <div className='wizard-card-checkbox-text-container'>
                                                                            <div className='wizard-card-checkbox-text1'>
                                                                                Registered Agent Service                                                                            </div>
                                                                            <div className='wizard-card-checkbox-text2'>
                                                                                $99
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='wizard-card-checkbox-action-container'>
                                                                        <Checkbox className='mt-2' checked={IsChecked6} onChange={(e) => handleChecked1(e, { "service": "Registered Agent Service", "amount": "$99" }, 6)}></Checkbox>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        </div>

                                                        <div class="tab">




                                                            <div className='wizard-content-sub-card-header mb-3' id="header">
                                                                <div className='wizard-content-sub-card-text-frame'>
                                                                    <div className='wizard-content-sub-card-text'>
                                                                        What's included in your package                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div className='wizard-checkout-container'>
                                                                <div className='wizard-checkout-main'>
                                                                    <div className='wizard-checkout-header'>
                                                                        <div className='wizard-checkout-text-main'>
                                                                            <div className='wizard-checkout-text'>
                                                                                CART SUMMARY
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <i className='pi pi-pencil'></i>
                                                                        </div>
                                                                    </div>

                                                                    <div className='wizard-checkout-body'>
                                                                        {
                                                                            selectCheckBoxData.map((val) => (
                                                                                <>
                                                                                    <div className='wizard-checkout-content-main'>
                                                                                        <div className='wizard-checkout-content-price-main'>
                                                                                            <div className='wizard-price-content1'>
                                                                                                {val.service}
                                                                                            </div>
                                                                                            <div className='wizard-price-content2'>
                                                                                                {val.amount}
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className='wizard-card-devider'>

                                                                                    </div>
                                                                                </>
                                                                            )

                                                                            )
                                                                        }




                                                                    </div>

                                                                    <div className='wizard-checkout-footer'>
                                                                        <div className='wizard-checkout-text-footer'>
                                                                            <div className='wizard-checkout-footer-txt'>
                                                                                TOTAL (TAX DEDUCTABLE)
                                                                            </div>
                                                                        </div>
                                                                        <div className='wizard-total-price'>
                                                                            {`$${totalAmount}`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className='tab'>


                                                            <div className='wizard-content-sub-card-header mb-3' id="header">
                                                                <div className='wizard-content-sub-card-text-frame'>
                                                                    <div className='wizard-content-sub-card-text'>
                                                                        Make Payment                                                              </div>
                                                                </div>
                                                            </div>
                                                            <div className='wizard-checkout-container'>
                                                                <div className='wizard-checkout-main'>
                                                                    <div className='wizard-checkout-header'>
                                                                        <div className='wizard-checkout-text-main' style={{ flex: "1 0 0" }}>
                                                                            <div className='wizard-checkout-footer-txt'>
                                                                                TOTAL (TAX DEDUCTABLE)
                                                                            </div>
                                                                        </div>
                                                                        <div className='wizard-total-price'>
                                                                            {`$${totalAmount}`}
                                                                        </div>
                                                                    </div>

                                                                    <div className='wizard-checkout-body'>
                                                                        <TabView>
                                                                            <TabPanel header="Credit Card">
                                                                                <div className='wizard-payment-container'>


                                                                                    <div className='grid'>
                                                                                        {
                                                                                            initData2 !== null ? Object.keys(initData2).map((val, i) => {

                                                                                                return (
                                                                                                    <>

                                                                                                        <div className='col-6'>
                                                                                                            {
                                                                                                                renderFormField1(initData2[val], val)
                                                                                                            }
                                                                                                        </div>





                                                                                                    </>
                                                                                                )
                                                                                            }) : ''
                                                                                        }

                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>
                                                                            <TabPanel header="Debit Card">
                                                                                <div className='wizard-payment-container'>

                                                                                    <div className='input-fields-container'>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>Name on card <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">
                                                                                                        <InputText

                                                                                                            style={{ width: '435px', height: '40px' }}
                                                                                                            maxLength={50} name='cityName'
                                                                                                        />



                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>Card number <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">




                                                                                                        <span className="p-input-icon-left" >

                                                                                                            <i className="pi pi-credit-card" />
                                                                                                            <InputText

                                                                                                                style={{ width: '435px', height: '40px' }}
                                                                                                                maxLength={50} name='cityName'
                                                                                                            />
                                                                                                        </span>

                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>


                                                                                    <div className='input-fields-container'>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>Expiry Date <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">
                                                                                                        <InputText

                                                                                                            style={{ width: '435px', height: '40px' }}
                                                                                                            maxLength={50} name='cityName'
                                                                                                        />



                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>CVC <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">

                                                                                                        <InputText

                                                                                                            style={{ width: '435px', height: '40px' }}
                                                                                                            maxLength={50} name='cityName'
                                                                                                        />



                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className='input-fields-container'>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>Billing Address <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">
                                                                                                        <InputText

                                                                                                            style={{ width: '435px', height: '40px' }}
                                                                                                            maxLength={50} name='cityName'
                                                                                                        />



                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>City <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">

                                                                                                        <InputText

                                                                                                            style={{ width: '435px', height: '40px' }}
                                                                                                            maxLength={50} name='cityName'
                                                                                                        />



                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className='input-fields-container'>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>Billing phone <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">
                                                                                                        <InputText

                                                                                                            style={{ width: '435px', height: '40px' }}
                                                                                                            maxLength={50} name='cityName'
                                                                                                        />



                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        <div className='input-fields-main'>
                                                                                            <div className=" justify-content-center dialog-form-field-space ">
                                                                                                <div className="">
                                                                                                    <label htmlFor='' className='form-label font-fam-for-all'>Billing email <span className='form-field-mandatory'>*</span></label>
                                                                                                    <span className="p-float-label ">

                                                                                                        <InputText

                                                                                                            style={{ width: '435px', height: '40px' }}
                                                                                                            maxLength={50} name='cityName'
                                                                                                        />



                                                                                                    </span>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </TabPanel>
                                                                        </TabView>

                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="tab">
                                                            <div className='wizard-content-sub-card-header mb-3' id="header">
                                                                <div className='wizard-content-sub-card-text-frame'>
                                                                    <div className='wizard-content-sub-card-text'>
                                                                        To comply with state filling requirements, please provide following details
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {modelData1.map((val) => (
                                                                <div className='col-12'>

                                                                    <div className='grid'>
                                                                        <div className='col-3'></div>
                                                                        <div className='col-6 text-center table-cand'>
                                                                            {val.model}
                                                                        </div>
                                                                        <div className='col-3'>

                                                                        </div>
                                                                    </div>

                                                                    {val.data !== null ? Object.keys(val.data).map((key, i) => {

                                                                        return (
                                                                            <div className='grid mt-2'>
                                                                                <div className='col-4 ml-4 cand-text table-cand'>
                                                                                    {convertToTitleCase(key)} :
                                                                                </div>
                                                                                <div className='col-7 cand-text'>
                                                                                    {val.data[key]}
                                                                                </div>


                                                                            </div>
                                                                        )
                                                                    }) : ''
                                                                    }


                                                                </div>
                                                            ))

                                                            }


                                                            <div className='flex justify-content-center'>

                                                                <Button type='button' className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg justify-content-center" style={{ borderRadius: '8px', height: '40px', width: '100%' }} onClick={() => setVisible(true)} >Preview</Button>

                                                            </div>

                                                        </div>


                                                    </> : ''
                                                    }




                                                    <div className='flex justify-content-center'>

                                                        <Button type='button' id="nextBtn" className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg justify-content-center" style={{ borderRadius: '8px', height: '40px', width: '100%' }} onClick={() => nextPrev(1)} >Next</Button>

                                                    </div>

                                                    <div className='flex justify-content-center'>

                                                        <Button type='submit' id="submitBtn" className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg justify-content-center" style={{ borderRadius: '8px', height: '40px', width: '100%' }}  >Submit</Button>

                                                    </div>

                                                    <div className='flex justify-content-center'>

                                                        <Button type='button' id="prevBtn" onClick={() => nextPrev(-1)} className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center bg-primary-reverse text-lg justify-content-center" style={{ borderRadius: '8px', height: '40px', width: '100%' }}  >Back</Button>

                                                    </div>

                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <AddCity visible={visible} setVisible={setVisible} credit={creditInfo} llc={llc} state={state} enityName={enityName} llcDetails={llcName} modelData={modelData} />
            <Dialog visible={closeProgresbar} modal={false} onHide={() => setCloseProgresbar(false)} className='font-fam-for-all'>
                <p className="m-0 p-3">
                    <div className='d-flex align-items-center'>
                        <img src={SuccessImage} width='60px' height='60px' />
                        {/* <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> */}
                        <p className='font-fam-for-all successMessage-font'>Invoice Created Successfully</p>
                    </div>
                    <div className='flex justify-content-end dialog-form-md-group-Btn'>
                        <Button type='button' className="mt-2 form-Btn form-Btn-Label font-fam-for-all  text-lg  mr-2" onClick={() => setCloseProgresbar(false)} >Ok</Button>
                    </div>
                </p>
            </Dialog>


            <Dialog visible={closeProgresbar1} modal={false} onHide={() => setCloseProgresbar1(false)} className='font-fam-for-all'>
                <p className="m-0 p-3">
                    <div className='d-flex align-items-center'>
                        <img src={ErroImage} width='60px' height='60px' />
                        {/* <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> */}
                        <p className='font-fam-for-all successMessage-font'>Invoice Failed</p>
                    </div>
                    <div className='flex justify-content-end dialog-form-md-group-Btn'>
                        <Button type='button' className="mt-2 form-Btn form-Btn-Label font-fam-for-all  text-lg  mr-2" onClick={() => setCloseProgresbar1(false)} >Ok</Button>
                    </div>
                </p>
            </Dialog>
        </div>

    )
}

export default DemoLLC