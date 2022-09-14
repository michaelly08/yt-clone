import React, {useState, useEffect} from 'react'
import {categories} from "../utils/constants"
import { Stack } from "@mui/material";
import Videos from "./Videos"
import { fetchData, options } from '../utils/fetchFromApi';
import {Link} from "react-router-dom"





export const Feed = ({selectedCategory, setSelectedCategory, videos}) => {





    return (
        <div className="feed-container">
            
            <div className="feed-wrapper">
                <FullSideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <div className="feed-box">
                    <div className="feed-title">{selectedCategory} <span>Videos</span></div>
                    <Videos videos={videos}/>
                </div>
            </div>
        </div>
        
    )
}








export const FullSideBar = ({selectedCategory, setSelectedCategory}) => {

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

    
    return (
        <div className={`fullsidebar-container ${!show && "hidden-2"}`}>
            <div className="fullsidebar-wrapper">
                <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <div className="fullsidebar-copyright">
                    <div>Copyright © 2022 Michael Media</div>
                </div>
            </div>
        </div>
    )
}










const SideBar = ({selectedCategory, setSelectedCategory}) => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-wrapper">
                {categories?.map((category) => (
                    <Link to={`/`} key={category.name} onClick={() => (window.scrollTo({top: 0, behavior: 'smooth'}))}>
                    <button className="sidebar-button"
                        style={{
                            backgroundColor: category.name === selectedCategory && "#FC1503"
                        }}
                        onClick={()=> setSelectedCategory(category.name)}
                        >
                        
                        <span style={{ color: category.name === selectedCategory ? "white" : "red"}}>
                            {category.icon}
                        </span>
                        <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>{category.name}</span>
                        
                    </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}


