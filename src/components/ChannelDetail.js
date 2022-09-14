import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import { fetchData, options } from '../utils/fetchFromApi';
import Videos from "./Videos"
import ChannelCard from "./ChannelCard"
import { FullSideBar } from './Feed';


const ChannelDetail = ({selectedCategory, setSelectedCategory}) => {
    const {id} = useParams();
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState(null);

    
    useEffect(()=> {
        const channelVideosData = async () => {
            
            let channelDetail= []
            channelDetail = await fetchData(`https://youtube-v31.p.rapidapi.com/channels?part=snippet&id=${id}`, options)
            setChannel(channelDetail?.items[0])
            // 


            let videosData= []
            videosData = await fetchData(`https://youtube-v31.p.rapidapi.com/search?channelId=${id}&part=snippet&maxResults=50&order=date`, options)
            setVideos(videosData?.items)
            
        }
        channelVideosData()


        
    }, [id])

    const filterVideos=videos?.filter((data) => {
        return (data?.id?.kind !== "youtube#playlist" && data?.id?.kind !== "youtube#channel" )
    })

    return (
        <div className="channeldetail-container">
            <FullSideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            <div className="channeldetail-wrapper">
                <div className="channeldetail-banner"></div>
                <div className="channeldetail-box">
                    <div className="channeldetail-logo">
                    <ChannelCard channelDetail={channel}/>
                    </div>
                    <div className="channeldetail-videos">
                    {videos?.length && <Videos videos={filterVideos}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChannelDetail