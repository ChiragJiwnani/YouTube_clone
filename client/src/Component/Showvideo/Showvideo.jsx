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
        <video src={`http://localhost:5000/${vid.filepath}`} className='video_ShowVideo'/>
        {/* <video src={`https://youtube-clone-3ge8.onrender.com/${vid.filepath}`} className='video_ShowVideo'/> */}
=======
        <video src={`https://youtube-clone-3ge8.onrender.com/${vid.filepath}`} className='video_ShowVideo'/>
>>>>>>> 6003e6fb123647b562ce835c0c93b5a33481f068
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
