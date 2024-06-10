
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



export default function City() {
    const [cities, setcities] = useState([]);


    // handling filters
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        DocNumber: { value: null, matchMode: FilterMatchMode.IN },
        // cityName: { value: null, matchMode: FilterMatchMode.EQUALS },

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

    const downloadop =useRef(null)

    // handling toggle dialog box
    const dialogView = () => setVisible(false)
    const cancelView = () => setVisible(false)

    // fetch all data
    useEffect(() => {
        ShiftsServices.getInvoice()
            .then((val) => {
                setcities(val.data.QueryResponse.Invoice)
                setShowSkeleton(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // DataTable columns
    const cols = [
        
        { field: 'DocNumber', header: 'Invoice No' },
        { field: 'TotalAmt', header: 'Billed Ammount (In USD)' },
        { field: 'Balance', header: 'Due Ammount (In USD)' },
        { field: 'DueDate', header: 'Due Date' },

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
                doc.save('Invoices.pdf');
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

            saveAsExcelFile(excelBuffer, 'Invoices');
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

        // setId(data.id)
        console.log(data.id)
        // setOpen1(true)
        setVisible1(true)

    }

    // handling delete functionality
    const dlt = (rowdata) => {

        // setId(rowdata.id)
        // setOpen1(true)
        setVisible3(true)
    }


    // body icon
    const iconBodyTemplate = (rowdata) => {
        return (
            <>
                <button className="pi pi-pencil image-btn-icon" data-toggle="tooltip" data-placement="bottom" title="Edit" onClick={() => handleEdit(rowdata)}></button>
                <button className="pi pi-trash image-btn-icon-delete" data-toggle="tooltip" data-placement="bottom" title="Delete" onClick={() => dlt(rowdata)}></button>
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

    const statusTemplate = (data) => {
        console.log(data)
        const dueDate = new Date(data.DueDate)
        console.log(dueDate)
        const currentDate = new Date()
        console.log(currentDate)

        const timeDifference = dueDate - currentDate;

        const daysDifference = timeDifference / (1000 * 3600 * 24);
        console.log(daysDifference)
        if (data.Balance === 0) {
            return (
                <>
                    <div>
                        <span> Paid</span>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div>
                        {daysDifference < 0 ? `Overdue ${Math.abs(daysDifference.toFixed())} Days` : `Due In ${daysDifference.toFixed()} Days`}
                    </div>
                </>
            )
        }

    }

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

    const priceTemplate2 = (data) => {
        const price = parseFloat(data.TotalAmt)
        return (
            <>
                <div>
                    {`$${price}`}
                </div>
            </>
        )
    }

    const usaDate = (data) => {
        let d = new Date(data.DueDate);

        // Extract the month, day, and year from the date
        let month = ('0' + (d.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns month index starting from 0
        let day = ('0' + d.getDate()).slice(-2);
        let year = d.getFullYear();

        // Format the date in MM/DD/YYYY
        console.log(`${month}/${day}/${year}`)
        return (
            <div>
                {`${month}/${day}/${year}`}
            </div>
        )
    }


    // isActive icon template
    const activeTemplate = (val) => {
        const bol = val.isActive

        return bol ? "Active" : "InActive"
    }

    const items = Array.from({ length: 5 }, (v, i) => i);

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
                                                <div className='text-header1'>Orders</div>
                                                <div className='text-header2'>Track Your Order Here</div>
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
                                            <span className="p-input-icon-left" >
                                                <i className="pi pi-search" />
                                                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" className='keyword-search' />
                                            </span>

                                        </div>
                                        <div className='action-group-header'>
                                            <button className="  form-Btn1 form-Btn-Label font-fam-for-all text-center  form-label" onClick={(e) => downloadop.current.toggle(e)}  ><i className='pi pi-align-center'></i> <span className='pl-2'>Export</span></button>
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
                                    <div className="card p-fluid" style={{ minWidth: '1290px' }}>

                                        {
                                            showSkeleton ?
                                                <DataTable value={cities} ref={toast} editMode="row" dataKey="id"
                                                    paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='datatable-sm font-fam-for-all'
                                                    filters={filters}
                                                    globalFilterFields={['DocNumber', 'cityName', 'id',]} emptyMessage={error}  >
                                                    <Column body={bodyTemplate} className='datatable-body-icon'></Column>
                                                    <Column field="DocNumber" className='data-table-row-font datatable-sm-col' header="Invoice No" sortable ></Column>
                                                    <Column field="CustomerRef.name" header="Customer Name" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column field="TotalAmt" header="Billed Amount" body={priceTemplate2} className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column field="Balance" header="Due Balance" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={priceTemplate1} sortable ></Column>
                                                    <Column field="DueDate" header="DueDate" body={usaDate} className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column header="Status" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={statusTemplate} sortable ></Column>

                                                    <Column body={iconBodyTemplate}></Column>
                                                </DataTable> : <DataTable value={items} ref={toast} editMode="row" dataKey="id"
                                                    paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} className='datatable-sm font-fam-for-all'
                                                    filters={filters}
                                                    globalFilterFields={['name', 'cityName', 'id',]} emptyMessage={error}  >
                                                    <Column body={<Skeleton />} className='datatable-body-icon'></Column>
                                                    <Column field="cityName" header="Invoice No" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="cityName" header="Customer Name" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="isActive" className='data-table-row-font datatable-sm-col' header="Billed Amount" body={<Skeleton />} editor={(options) => skillEditor(options)} sortable ></Column>
                                                    <Column field="cityName" header="Due Balance" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="cityName" header="Due Date" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column field="cityName" header="Status" className='font-fam-for-all datatable-sm-col'
                                                        editor={(options) => skillEditor(options)} body={<Skeleton />} sortable ></Column>
                                                    <Column body={<Skeleton />}></Column>
                                                </DataTable>
                                        }
                                        <AddVendor visible={visible} setVisible={setVisible} />
                                        {/* <DownloadPdf visible4={visible4}  setVisible4={setVisible4} /> */}
                                        {/* <EditCity visible1={visible1} setVisible1={setVisible1} />
            <DeleteCity visible3={visible3} setVisible3={setVisible3} /> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>);
}

