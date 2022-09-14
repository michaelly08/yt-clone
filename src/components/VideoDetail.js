import React, {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import ReactPlayer from "react-player"

import Videos from "./Videos"
import { FullSideBar } from './Feed';
import { fetchData, options } from '../utils/fetchFromApi';

const VideoDetail = ({selectedCategory, setSelectedCategory}) => {
    const {id} = useParams()

    const [video, setVideo] = useState([])
    const [videosSuggest, setVideosSuggest] = useState([])
    console.log(video)
    // console.log(videosSuggest)


    useEffect(()=> {
        const fetchVideo = async () => {
            let videosData= []
            videosData = await fetchData(`https://youtube-v31.p.rapidapi.com/videos?part=snippet,statistics&id=${id}`, options)
            setVideo(videosData.items[0])

            let videosSuggested= []
            videosSuggested = await fetchData(`https://youtube-v31.p.rapidapi.com/search?part=snippet&relatedToVideoId=${id}&type=video`, options)
            setVideosSuggest(videosSuggested.items.slice(0, 15))
            

        }
        fetchVideo()
        
    }, [id])
    

    var date = new Date(video?.snippet?.publishedAt).toDateString();
    let dateFormat = date?.split(" ").splice(2, 3).join(", ")
    let dateFormatFull = date?.split(" ").splice(1, 1).join("") +" " + dateFormat


    return (
        <div className="videodetail-container">
            <FullSideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <div className="videodetail-wrapper">

                    <div className="react-player">
                            <ReactPlayer url={id && `https://www.youtube.com/watch?v=${id}`} width="100%" height="70%" controls/>
                            <div className="videodetail-title">
                                {video?.snippet?.title}
                            </div>
                            <div className="videodetail-stats">
                                <div>
                                    {video?.statistics?.viewCount && parseInt(video?.statistics?.viewCount).toLocaleString()} views {`• `}
                                    {video?.snippet?.publishedAt && dateFormatFull}
                                </div>
                                <div className="videodetail-likes">
                                    {video?.statistics?.likeCount && parseInt(video?.statistics?.likeCount).toLocaleString()} Likes
                                </div>
                            </div>
                            <div className="videodetail-channelname">
                                <Link to={`/channel/${video?.snippet?.channelId}`} onClick={() => (window.scrollTo({top: 0, behavior: 'smooth'}))}>
                                    {video?.snippet?.channelTitle && video?.snippet?.channelTitle}
                                </Link>
                            </div>

                    </div>


                    <div className="videodetail-suggested">
                        <Videos videos={videosSuggest}/>
                    </div>
                </div>
            
        </div>
    )
}

export default VideoDetail











{/* <div className="videodetail-wrap">
    
        <div className="videodetail-box">

            <div className="videodetail-title">
                {video?.snippet?.title}
            </div>

        </div>

</div> */}