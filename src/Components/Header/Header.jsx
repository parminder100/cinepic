import "../Header/Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import registered_logo from "../../asset/img/registered_logo.png";
import { useState } from "react";
import { useEffect } from "react";

const Header = () =>{
    const [headerScrolled, setHeaderScrolled] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

    useEffect(()=>{
        const headerScroll = () =>{
            if(window.scrollY > 50){
                setHeaderScrolled(true);
            }
            else{
                setHeaderScrolled(false)
            }
        }
        window.addEventListener('scroll', headerScroll);
        return() =>{
            window.removeEventListener('scroll', headerScroll);
        }
    },[]);

    const handleNavbar = () =>{
        setNavbarOpen(!navbarOpen);
    }
    return(
        <>
            <header className={headerScrolled ? 'header-scrolled' : ''}>
                <div className="container">
                    <div className="row align-items-center header-custom-row">
                        <div className="col-sm-6 header-left-col">
                            <img className="logo" src={registered_logo} alt="registered_logo" />
                        </div>
                        <div className="col-sm-6 header-right-col">
                            <nav className="navbar navbar-expand-lg custom-navbar">
                                <div>
                                    <button 
                                        className="navbar-toggler custom-navbar-btn" 
                                        type="button" 
                                        data-bs-toggle="collapse"
                                        onClick={handleNavbar}
                                        data-bs-target="#navbarSupportedContent" 
                                        aria-controls="navbarSupportedContent" 
                                        aria-expanded="false" 
                                        aria-label="Toggle navigation"
                                        >
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className={`collapse navbar-collapse navbar-item-container ${navbarOpen ? 'show' : ''}`}>
                                        <ul className="navbar-nav custom-navbar-items navbar-list-items mb-2 mb-lg-0">
                                            <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/aboutus">About Us</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/contactus">Contact Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;