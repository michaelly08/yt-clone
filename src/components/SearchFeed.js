import React, {useState, useEffect} from 'react'
import {categories} from "../utils/constants"
import { Stack } from "@mui/material";
import Videos from "./Videos"
import { fetchData, options } from '../utils/fetchFromApi';
import {Link} from "react-router-dom"
import {FullSideBar} from "./Feed"
import {useParams} from "react-router-dom"



export const SearchFeed = ({selectedCategory, setSelectedCategory}) => {
    const [videos, setVideos] = useState([])
    const {searchTerm} = useParams()


    useEffect(()=> {
        const fetchVideos = async () => {
            let videosData= []
            videosData = await fetchData(`https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${searchTerm}&maxResults=50`, options)
            setVideos(videosData.items)
        }
        fetchVideos()
    }, [searchTerm])




    return (
        <div className="feed-container">
            
            <div className="feed-wrapper">
                <FullSideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <div className="feed-box">
                    <div className="searchfeed-title">Results for <span>{searchTerm}</span></div>
                    <Videos videos={videos}/>
                </div>
            </div>
        </div>
        
    )
}

export default SearchFeed