import VideoCard from "./VideoCard"
import ChannelCard from "./ChannelCard"

const Videos = ({videos}) => {
    const filterVideos=videos?.filter((data) => {
        return (data?.id?.kind !== "youtube#playlist")
    })


    return (
        <div className="videos-container">
            <div className="videos-wrapper">
                {filterVideos?.map((item, idx)=> (
                    <div className="videos-box" key={idx}>
                        {item.id.videoId && <VideoCard video={item}/>}
                        {item.id.channelId && <ChannelCard channelDetail={item}/>}
                    </div>
                ))}

            </div>
        </div>
        
    )
}


export default Videos