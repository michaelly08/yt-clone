import React, {useState, useEffect} from 'react'
import Logo from "./img/youtubeLogo.png"
import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom"


const Navbar = ({selectedCategory, setSelectedCategory}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate= useNavigate();

    const searchShow = (e) => {
        if (searchTerm.length < 1) {
            document.querySelector(".navbar-container").classList.add("search-active")
            e.preventDefault()
        }

        if (searchTerm.length > 1) {
            document.querySelector(".navbar-container").classList.remove("search-active")
        }
    }

    const searchHide = (e) => {
        document.querySelector(".navbar-container").classList.remove("search-active")
    }




    const sidebarToggle = (e) => {
        document.querySelector("body").classList.toggle("sidebar-active")
    }


    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY) { 
            setShow(false); 
        } else { 
            setShow(true);  
        }
    
        setLastScrollY(window.scrollY); 
        }
    };


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
    
            return () => {
            window.removeEventListener('scroll', controlNavbar);
            };
        }
        }, [lastScrollY]);






    const handleSubmit = (e) => {
        e.preventDefault()
        if(searchTerm.length >= 1){
            navigate(`/search/${searchTerm}`)
            e.target.reset()
            setSearchTerm("")
            setTimeout(window.scrollTo({top: 0, behavior: 'smooth'}), 100)
        }
        
    }


    const logoClick = () => {
        setSelectedCategory("New")
        window.scrollTo({top: 0, behavior: 'smooth'})
    }


    return (
        <div className={`navbar-container ${!show && 'hidden'}`}>
            <div className="navbar-wrapper">
                
                    <div className="navbar-logo">
                        <i className='bx bx-menu menu-icon' onClick={sidebarToggle}></i>
                        <Link to="/" onClick={logoClick}>
                        <img src={Logo}></img>
                        </Link>
                    </div>

                <div className="navbar-box">
                    <div className="search-back" onClick={searchHide}><i className='bx bx-left-arrow-alt'></i></div>
                    <form className="navbar-box-form" onSubmit={handleSubmit} >
                        <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} onClick={searchShow}></input>
                        {/* onClick={searchShow} */}
                        <button type="submit" className="navbar-box-form-button" onClick={searchShow}><i className='bx bx-search'></i></button>
                    </form>
                    
                </div>

            </div>
        </div>
    )
}

export default Navbar