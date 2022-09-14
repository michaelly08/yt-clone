import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import Navbar from "./components/Navbar"
import {Feed, FullSideBar} from "./components/Feed"
import VideoDetail from "./components/VideoDetail"
import ChannelDetail from "./components/ChannelDetail"
import SearchFeed from "./components/SearchFeed"
import {fetchData, options} from "./utils/fetchFromApi"


import "./styles.css"




const App = () => {
    const [selectedCategory, setSelectedCategory] = useState("New")
    const [videos, setVideos] = useState([])



    useEffect(()=> {
        const fetchVideos = async () => {
            let videosData= []
            videosData = await fetchData(`https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${selectedCategory}&maxResults=50`, options)


            setVideos(videosData.items)
        }
        fetchVideos()
    }, [selectedCategory])



    return (
        <BrowserRouter>
            <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div className="multipage-wrapper">
                
            <Routes>
                <Route path="/" exact element={<Feed selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} videos={videos} />}/>
                <Route path="/video/:id" element={<VideoDetail selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}/>
                <Route path="/channel/:id" element={<ChannelDetail selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}/>
                <Route path="/search/:searchTerm" element={<SearchFeed selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App