import React from 'react'
import './Showvideo.css'
import { Link } from 'react-router-dom'
import moment from "moment"
const Showvideo = ({vid}) => {
    // console.log(vid)
  return (
        <>
      <Link to={`/videopage/${vid._id}`}>
<<<<<<< HEAD
        {/* <video src={`https://youtube-clone-3ge8.onrender.com/${vid.filepath}`} className='video_ShowVideo'/> */}
        <video src={`https://youtubeclone-server.vercel.app/${vid.filepath}`} className='video_ShowVideo'/>
        {/* <video src={`http://localhost:5000/${vid.filepath}`} className='video_ShowVideo'/> */}
=======
          { <video src={`https://youtubeclone-server.vercel.app/${vid.filepath}`} className='video_ShowVideo'/> }
          {/*<video src={`https://you-tube-clone-6hhgfjrnf-chiragjiwnanis-projects.vercel.app/${vid.filepath}`} className='video_ShowVideo'/> */}
>>>>>>> 36e2da87f10d0bbe1e5b52db7f85213a62989758
    </Link>
    <div className="video_description">
        <div className="Chanel_logo_App">
            <div className="fstChar_logo_App">
            <>{vid?.uploader?.charAt(0).toUpperCase()}</>
            </div>
        </div>
    
    <div className="video_details">
        <p className="title_vid_ShowVideo">{vid?.videotitle}</p>
        <pre className="vid_views_UploadTime">{vid?.uploader}</pre>
        <pre className="vid_views_UploadTime">
            {vid?.views} views <div className="dot"></div>{moment(vid?.createdat).fromNow()}
        </pre>
    </div>
    </div>
    </>
  )
}

export default Showvideo
