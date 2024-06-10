
import React, { useState, useRef, useContext, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';
import { Skeleton } from 'primereact/skeleton';
import ShiftsServices from '../services/demoServices';
import AddCity from './AddComponents/AddProduct';
import DownloadPdf from '../utils/downloadPdf';
import AddVendor from './AddComponents/AddInvoice';
import SideBarMenu from '../common/Sidebar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useForm, Controller } from "react-hook-form";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from 'primereact/dropdown';
import { createSearchParams } from 'react-router-dom';

export default function Customers() {
    const [cities, setcities] = useState([]);



    // handling filters
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        FullyQualifiedName: { value: null, matchMode: FilterMatchMode.IN },
        CompanyName: { value: null, matchMode: FilterMatchMode.EQUALS },

    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const dt = useRef(null);
    const [df, setDf] = useState(true)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const toast = useRef(null)
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [visible4, setVisible4] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)

    const [id, setId] = useState(0)


    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
        watch,
        reset
    } = useForm('');


    const [modelName, setModelName] = useState("")

    const [enityName, setEntityName] = useState("")

    const [state, setState] = useState(null)

    const [allState, setAllState] = useState([
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
        "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
        "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ])

    // handling toggle dialog box
    const dialogView = () => setVisible(false)
    const cancelView = () => setVisible(false)

    const downloadop = useRef(null)

    // fetch all data
    // useEffect(() => {
    //     ShiftsServices.getCustomer()
    //         .then((res) => {

    //             setcities(res.data.QueryResponse.Customer)
    //             setShowSkeleton(true)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             setShowSkeleton(true)
    //         })
    // }, [])


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
                        setModelName(firstData)
                        ShiftsServices.getAllModelData(firstData)
                            .then((res) => {
                                console.log(res)
                                setcities(res.data)
                                setShowSkeleton(true)
                            })
                            .catch((err) => {
                                console.log(err)
                                setShowSkeleton(true)
                            })
                    }
                }
                else {
                    setShowSkeleton(true)
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }, [enityName, state])

    // DataTable columns
    const cols = [
        { field: 'FullyQualifiedName', header: 'Company Name' },
        // { field: 'PrimaryPhone.FreeFormNumber', header: 'Phone' },
        { field: 'Balance', header: 'Due Balance' },

    ];


    // handling filter
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    // Export DataTable data
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, cities);
                doc.save('Customers.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(cities);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'Customers');
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + EXCEL_EXTENSION);
            }
        });
    };


    // Table Header
    const renderHeader = () => {
        return (
            <div >
                <div className="flex align-items-center justify-content-end gap-2">

                </div>
                <div className="flex align-items-center justify-content-end gap-2">
                    <span className="p-input-icon-left" >
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className='keyword-search' />
                    </span>
                    <Button
                        type="button"
                        icon="pi pi-plus"
                        onClick={() => { setVisible(true) }}

                        className="mr-0 panel-Btn panel-Btn-Label" tooltip="Create New City" tooltipOptions={{ position: 'bottom' }}
                    ></Button>

                    <Button
                        type="button"
                        icon="pi pi-eye"
                        onClick={() => { setVisible4(true) }}

                        className="mr-0 panel-Btn panel-Btn-Label" tooltip="Create New City" tooltipOptions={{ position: 'bottom' }}
                    ></Button>

                    <Button
                        type="button"
                        icon="pi pi-file-excel"
                        onClick={exportExcel}
                        disabled={cities.length > 0 ? false : true}
                        className="mr-0 panel-Btn panel-Btn-Label" data-pr-tooltip="Download XLS" tooltip="Create A New User" tooltipOptions={{ position: 'bottom' }}
                    ></Button>
                    <Button
                        type="button"
                        icon="pi pi-file-pdf"
                        onClick={exportPdf}
                        disabled={cities.length > 0 ? false : true}
                        className="mr-0 panel-Btn panel-Btn-Label" data-pr-tooltip="Download PDF" tooltip="Create A New User" tooltipOptions={{ position: 'bottom' }}
                    ></Button>

                </div>
            </div>
        );
    };


    const header = renderHeader();

    // Edit row data 
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const skillEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;;
    };


    const handleEdit = (data) => {

        setId(data._id)

        // setOpen1(true)
        navigate({
            pathname: "/edit/llc",
            search: createSearchParams({
                id: data._id,
                model: modelName,
                state: state,
                entityName: enityName
            }).toString()
        });
        // setVisible1(true)

    }

    // handling delete functionality
    const dlt = (rowdata) => {

        setId(rowdata._id)

        setVisible3(true)
    }


    // body icon
    const iconBodyTemplate = (rowdata) => {
        return (
            <>
                <button className="pi pi-pencil image-btn-icon" data-toggle="tooltip" data-placement="bottom" title="Edit" onClick={() => handleEdit(rowdata)}></button>
                {/* <button className="pi pi-trash image-btn-icon-delete" data-toggle="tooltip" data-placement="bottom" title="Delete" onClick={() => dlt(rowdata)}></button> */}
            </>
        )
    }

    // body icon >
    const bodyTemplate = () => {
        return (
            <>
                <i className='pi pi-angle-right'></i>
            </>
        )
    }


    // isActive icon template
    const activeTemplate = (val) => {
        const bol = val.isActive

        return bol ? "Active" : "InActive"
    }

    const items = Array.from({ length: 5 }, (v, i) => i);

    console.log(cities)

    const priceTemplate1 = (data) => {
        const price = parseFloat(data.Balance)
        return (
            <>
                <div>
                    {`$${price}`}
                </div>
            </>
        )
    }

    // Extract keys dynamically
    const extractKeys = (data) => {
        if (data.length === 0) return [];
        return Object.keys(data[0]).filter(key => key !== '_id' && key !== '__v' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'published_at');
    };

    const keys = extractKeys(cities);


    const toTitleCase = (str) => {
        return str
          .split('_')  // Split the string by underscores
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
          .join(' ');  // Join the words with spaces
      };


    return (
        <>
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
                                                <div className='text-header1'>Companies</div>
                                                <div className='text-header2'>Manage Your Legal Entity Here</div>
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
                                        <div className='mt-3'>
                                            {/* <span className="p-input-icon-left" >
                                                <i className="pi pi-search" />
                                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className='keyword-search' />
                                            </span> */}
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
                                        <div className='action-group-header mt-3'>
                                            <button className="  form-Btn1 form-Btn-Label font-fam-for-all text-center  form-label" onClick={(e) => downloadop.current.toggle(e)} ><i className='pi pi-align-center'></i> <span className='pl-2'>Export</span></button>
                                            <button className="  form-Btn1 form-Btn-Label font-fam-for-all text-center  form-label"  ><i className='pi pi-align-center'></i> <span className='pl-2'>Filter</span></button>

                                        </div>
                                        <OverlayPanel ref={downloadop} closeOnEscape dismissable={false} className='download-op'>
                                            <div className="flex align-items-center justify-content-end gap-2">
                                                <Button
                                                    type="button"
                                                    icon="pi pi-file-excel"
                                                    onClick={exportExcel}
                                                    disabled={cities.length > 0 ? false : true}
                                                    className="mr-0 panel-Btn panel-Btn-Label" data-pr-tooltip="Download XLS" tooltip="Create A New User" tooltipOptions={{ position: 'bottom' }}
                                                ></Button>
                                                <Button
                                                    type="button"
                                                    icon="pi pi-file-pdf"
                                                    onClick={exportPdf}
                                                    disabled={cities.length > 0 ? false : true}
                                                    className="mr-0 panel-Btn panel-Btn-Label" data-pr-tooltip="Download PDF" tooltip="Create A New User" tooltipOptions={{ position: 'bottom' }}
                                                ></Button>
                                            </div>
                                        </OverlayPanel>
                                    </div>
                                </div>
                            </div>

                            <div className='dashboard-data-header'>

                                <div className='dashboard-data-sub-header'>

                                    {/* <div className="card p-fluid" style={{ minWidth: '1290px' }}>

                                        {
                                            showSkeleton ?
                                                <DataTable value={cities} ref={toast} editMode="row" dataKey="id"
                                                    paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='datatable-sm font-fam-for-all'
                                                    filters={filters}
                                                    globalFilterFields={['FullyQualifiedName', 'CompanyName', 'Balance',]} emptyMessage={error}  >
                                                    <Column body={bodyTemplate} className='datatable-body-icon'></Column>
                                                    <Column field="FullyQualifiedName" className='data-table-row-font datatable-sm-col' header="Name" sortable ></Column>
                                                    <Column field="CompanyName" header="Company Name" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column field="PrimaryPhone.FreeFormNumber" header="Phone" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column field="Balance" header="Due Balance" body={priceTemplate1} className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} sortable ></Column>


                                                    <Column body={iconBodyTemplate}></Column>
                                                </DataTable> : <DataTable value={items} ref={toast} editMode="row" dataKey="id"
                                                    paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='datatable-sm font-fam-for-all'
                                                    filters={filters}
                                                    globalFilterFields={['name', 'cityName', 'id',]} emptyMessage={error}  >
                                                    <Column body={<Skeleton />} className='datatable-body-icon'></Column>
                                                    <Column field="cityName" header="Name" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="cityName" header="Company Name" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="isActive" className='data-table-row-font datatable-sm-col' header="Phone" body={<Skeleton />} editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column field="cityName" header="Due Balance" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>

                                                    <Column body={<Skeleton />}></Column>
                                                </DataTable>
                                        }
                                        <AddVendor visible={visible} setVisible={setVisible} />

                                    </div> */}


                                    <div className="card p-fluid" style={{ minWidth: '1290px' }}>

                                        {
                                            showSkeleton ?
                                                <DataTable value={cities} globalFilterFields={['CompanyName', 'cityName', 'id',]} className='font-fam-for-all'>
                                                    {keys.map((key) => (
                                                        <Column key={key} field={key} header={toTitleCase(key)} body={(rowData) => {
                                                            const fieldData = rowData[key];
                                                            console.log(fieldData)
                                                            if (typeof fieldData === 'object' && !Array.isArray(fieldData)) {
                                                                return Object.entries(fieldData).map(([nestedKey, nestedValue], i) => (
                                                                    <div key={nestedKey}>
                                                                        {/* <strong>{nestedKey}:</strong> {nestedValue} */}
                                                                        {
                                                                            i === 1 ? <p>{nestedValue}</p> : ''
                                                                        }
                                                                    </div>
                                                                ));
                                                            }
                                                            else if (Array.isArray(fieldData)) {
                                                                const temp = fieldData.map((val, index) => {
                                                                    return Object.entries(val)[1][1]
                                                                });


                                                                return <p>{temp.toString()}</p>;
                                                            }
                                                            return fieldData;
                                                        }} />
                                                    ))}
                                                    <Column body={iconBodyTemplate}></Column>
                                                </DataTable> : <DataTable value={items} ref={toast} editMode="row" dataKey="id"
                                                    paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='datatable-sm font-fam-for-all'
                                                    filters={filters}
                                                    globalFilterFields={['name', 'cityName', 'id',]} emptyMessage={error}  >
                                                    <Column body={<Skeleton />} className='datatable-body-icon'></Column>
                                                    <Column field="cityName" header="Name" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="cityName" header="Company Name" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="isActive" className='data-table-row-font datatable-sm-col' header="Phone" body={<Skeleton />} editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column field="cityName" header="Due Balance" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>

                                                    <Column body={<Skeleton />}></Column>
                                                </DataTable>
                                        }
                                        <AddVendor visible={visible} setVisible={setVisible} />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>);
}

