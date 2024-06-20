import React, { useRef } from 'react'
import Navbar from '../common/Navbar'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import BarLogoWashington from "../Assets/Images/bar-logo-washington-dc-150x100-e1633385745676.png.png"
import ABAVector from "../Assets/Images/ABA-Vector-Icon.png.png"
import BrandElement from "../Assets/Images/Brand-Elements_Logo_Marketing_NA_Florida_Associations-_Florida-Bar-Association_Approved-for-Distribution_Florida-Bar-Assocation-Logo-150x87.png.png"
import Nybasa from "../Assets/Images/nysba.png.png"
import CalifirniaBar from "../Assets/Images/california-bar.png.png"
import TexasStateBar from "../Assets/Images/state-bar-of-texas-3.png.png"
import { OverlayPanel } from 'primereact/overlaypanel'
import Chatbot from './ChatBot'
import { Avatar } from 'primereact/avatar';

const HomePage = () => {

    const navigate = useNavigate()
    const op = useRef(null)
    return (
        <div>
            <Navbar />
            <div className='homepage-container font-fam-for-all' style={{ marginTop: '90px' }}>
                <div className='hompage-hero-section-main'>
                    <div className='homepage-service-hero'>
                        <div className='homepage-service-hero-image-main'>
                            {/* <div className='homepage-hero-content-main'>
                            <div className='homepage-hero-content-header'> */}
                            <div className='homepage-hero-content-header-text'>
                                New filing requirement for every business entity as of January 1, 2024
                            </div>
                            <div className='homepage-hero-content-header-sub-text'>
                                vState Filings Can Help You Every Step of the Way!
                            </div>
                            <div className='homepage-hero-content-button'>

                                <div className='flex justify-content-center dialog-form-md-group-Btn'>
                                    <Button type="button" label='Registered Now' icon="pi pi-arrow-right" className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center bg-primary-reverse text-lg mr-3" iconPos="right" onClick={() => navigate("/signup")} ></Button>
                                    <Button type='button' label='Sign In' icon="pi pi-arrow-right" className="mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg  mr-2" iconPos="right" onClick={() => navigate("/signin")} ></Button>
                                </div>
                            </div>
                            {/* </div>
                        </div> */}
                        </div>

                    </div>

                    <div className='homepage-footer-container mt-5'>
                        <div className='homepage-footer-main'>
                            <div className='homepage-footer-header-main'>
                                <div className='homepage-footer-header-text-main'>
                                    <p>
                                        <span className='homepage-header-typography'>
                                            Approved by
                                        </span>
                                        <span className='hompage-header-number ml-3'>
                                            90+
                                        </span>
                                        <span className='homepage-header-typography ml-3'>
                                            associations & law societies
                                        </span>
                                    </p>
                                </div>

                            </div>
                            <div className='d-flex justify-content-center mt-2 gap-5 align-items-center'>

                                <img src={BarLogoWashington} alt="" className='' style={{ width: '85px', height: '87px', flexShrink: '0' }} />
                                <img src={ABAVector} alt="" style={{ width: '171px', height: '72px', flexShrink: '0' }} />
                                <img src={BrandElement} alt="" style={{ width: '139px', height: '81px', flexShrink: '0' }} />
                                <img src={Nybasa} alt="" style={{ width: '171px', height: '30px', flexShrink: '0' }} />
                                <img src={CalifirniaBar} alt="" style={{ width: '90px', height: '73px', flexShrink: '0' }} />
                                <img src={TexasStateBar} alt="" style={{ width: '171px', height: '68px', flexShrink: '0' }} />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className=" chat-overlay flex justify-content-end mb-5">

                <Button type="button" icon="pi pi-book" label="Chat With Us" className='mt-2 form-Btn form-Btn-Label font-fam-for-all text-center text-lg  mr-2' onClick={(e) => op.current.toggle(e)} />
                <OverlayPanel ref={op}  >
                    <div className="custom-header" style={{backgroundColor:'#1D305F'}}>
                    <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
                        <span style={{color:'#ffff'}}>Chat With Us</span>
                        <Button icon="pi pi-times" className="p-button-rounded p-button-text" onClick={() => op.current.hide()} />
                    </div>
                    {/* <img src={'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg'} alt="Bamboo Watch"></img> */}
                    <Chatbot />
                </OverlayPanel>
            </div>
        </div>
    )
}

export default HomePage