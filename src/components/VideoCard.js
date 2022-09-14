import React from 'react'
import {demoThumbnailUrl, demoChannelUrl, demoVideoUrl , demoChannelTitle , demoVideoTitle , demoProfilePicture } from "../utils/constants"
import {Link} from "react-router-dom"

const VideoCard = ({ video }) => {
    const { id: { videoId }, snippet} = video;


    return (
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} onClick={() => (window.scrollTo({top: 0, behavior: 'smooth'}))}>
                <img src={snippet?.thumbnails?.medium?.url} className="video-thumbnail"></img>
                <div>
                    <div className="video-title">{snippet?.title.slice(0, 50)}{snippet?.title.length > 50 && "..."}</div>
                    <div className="video-channel-name">{snippet?.channelTitle}</div>
                </div>

            </Link>
    )
}

export default VideoCard