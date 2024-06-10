import React from 'react'
import { Link } from "react-router-dom";
// import '../style/Navbar.css'
import Logo from "../Assets/Images/vState Filings 2.png"


function Navbar() {

    window.onpopstate = function (e) { window.history.forward(1); }

    const title = {
        /* Our Services */
        // fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '501',
        fontSize: '19px',
        margin: '5px',
        textDecoration:'none',
        
        // lineHeight: '20px',
        /* identical to box height */
        TextAlign: 'Center',
        // TextColor: '#000000',
    };

    const listiteam = {
        fontStyle: 'normal',
        fontWeight: '370',
        fontSize: '19px',

    }


    const aboutus = {
        borderRadius: '28px',
        background: '1E1E1',
        padding: '10px',
        width: '110px',
        height: '45px',
        fontWeight: '501',
        fontSize: '19px',
        margin: '3px',
        textDecoration:'none',
        textAlign: 'Center',
    }
    return (

        <nav className="navbar navbar-expand-lg  fixed-top shadow p-3 mb-5  bg-white" >
            <div className="container">
            <img src={Logo} alt="logo" width={150} height={40}/>
                {/* <img src="../images/orglogo.jpeg" alt="org " style={{ width: '150px', height: '75px' }} /> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" >
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <Link className="nav-link active text-dark hover-underline-animation font-fam-for-all" aria-current="page" to="/" style={title}>Home</Link>
                        </li>

                        <li className="nav-item dropdown border-0">
                            <Link className="nav-link  text-dark hover-underline-animation font-fam-for-all" href="/product" role="button" aria-expanded="false" to='/features' style={title}>Services</Link>
                            {/* <ul className="dropdown-menu shadow  bg-body font-fam-for-all">
                                <li><a className="dropdown-item border-0" href="/product" style={listiteam} >IBS</a></li>
                                <li><a className="dropdown-item border-0" href="#" style={listiteam}>Optimus Prime </a></li>
                                <li><a className="dropdown-item border-0" href="#" style={listiteam}>Optimus Prime Lite</a></li>
                                <li><a className="dropdown-item border-0" href="#" style={listiteam} >HRMS Automation</a></li>
                            </ul> */}
                        </li>
                       
                        <li className="nav-item" >
                            <Link className="nav-link active text-dark hover-underline-animation font-fam-for-all" aria-current="page" to="/partner" style={title}>Registration Agent</Link>
                        </li>
                       

                        <li className="nav-item">
                            <Link className="nav-link active text-dark mt-1 hover-underline-animation font-fam-for-all" aria-current="page" to="/aboutus" style={aboutus}>About Us</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active text-dark hover-underline-animation font-fam-for-all" aria-current="page" to="/blog" style={title}>Contact Us</Link>
                        </li>

                        {/* <li className="nav-item">
                            <Link className="nav-link active text-dark mt-1 hover-underline-animation font-fam-for-all" aria-current="page" to="/signin" style={aboutus}>Sign In</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link active text-dark mt-1 hover-underline-animation font-fam-for-all" aria-current="page" to="/signup" style={aboutus}>Sign Up</Link>
                        </li> */}



                    </ul>

                </div>
            </div>
        </nav>

    );
}

export default Navbar;