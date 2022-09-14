import React from 'react'
import {demoThumbnailUrl, demoChannelUrl, demoVideoUrl , demoChannelTitle , demoVideoTitle , demoProfilePicture } from "../utils/constants"
import {Link} from "react-router-dom"

const ChannelCard = ({channelDetail}) => {

    return (
        
        <div className="channelcard-box">
            <Link to={`/channel/${channelDetail?.id?.channelId}`} onClick={() => (window.scrollTo({top: 0, behavior: 'smooth'}))}>
            <img src={channelDetail?.snippet?.thumbnails?.medium?.url} className="channel-thumbnail"></img>
            <div>
                <div className="video-title">{channelDetail?.snippet?.title}</div>
                {channelDetail?.statistics?.subscriberCount && <div className="channel-subcount">{parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString()} Subscribers</div>}
            </div>
            </Link>
        </div>
        
    )
}

export default ChannelCard