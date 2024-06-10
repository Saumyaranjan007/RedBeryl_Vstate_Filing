import React from 'react'
import { AddUser } from './AddComponents/AddUser'
import Pic1 from "../Assets/Images/undraw_setup_wizard_re_nday 1.png"
import Navbar from '../common/Navbar'
import Pic2 from "../Assets/Images/new_onboardding_image.png"
import Logo from "../Assets/Images/New_logo.png"

const UserSignUp = () => {
    return (
        <>
            {/* <Navbar /> */}
            <div className='signup-user-container'>
                <div className='signin-user-main'>
                <div className='signup-content1-container'>
                        <div className='signin-header-container'>
                            <div className='signin-header-frame'>
                                <img src={Logo} alt="logo" className='signin-logo' />
                            </div>
                        </div>

                        <div className='signin-hero-container'>
                            <div className='signin-hero-main'>
                                <div className='signin-hero-header'>
                                    <div className='signin-hero-header-text1'>
                                        One platform for all your legal needs
                                    </div>
                                    <div className='signin-hero-header-text2'>
                                        Apply for legal documents, handle compliance and get legal support instantly.
                                        Reduce stress, save time and enhance business efficiency.
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <img src={Pic2} alt="logo" />
                            </div>
                        </div>

                        <div className='signin-hero-footer-container'>
                            <div className='signin-hero-footer-text1'>
                                © vState Filings 2024
                            </div>
                            <div className='signin-hero-footer-text-main'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.6667 4C14.6667 3.26666 14.0667 2.66666 13.3334 2.66666H2.66671C1.93337 2.66666 1.33337 3.26666 1.33337 4M14.6667 4V12C14.6667 12.7333 14.0667 13.3333 13.3334 13.3333H2.66671C1.93337 13.3333 1.33337 12.7333 1.33337 12V4M14.6667 4L8.00004 8.66666L1.33337 4" stroke="#E9D7FE" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <div className='signin-hero-footer-text2'>
                                help@vstatefilings.com
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='signup-content2-container'>
                        <div className='signup-content2-main' style={{height:'1175px',overflowY:'auto'}}>
                            <div className='signup-content-main1 '>
                                <div className='signup-content-main2 '>
                                    <div className='signup-card-container'>
                                        <div className='signup-card-header'>
                                            <div className='signup-card-header-text1'>
                                                Sign up
                                            </div>
                                            <div className='signup-card-header-text2'>
                                                Lets get you onboard real quick!
                                            </div>
                                        </div>

                                        <div className='signup-card-header'>
                                            <AddUser />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserSignUp