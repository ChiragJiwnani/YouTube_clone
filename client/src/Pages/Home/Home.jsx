import React, { useState } from 'react'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar'
import { v4 as uuidv4 } from "uuid"; // Install uuid: `npm install uuid`
import "./Home.css"
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid'
import vid from "../../Component/Video/vid.mp4"
import { useSelector } from 'react-redux'
import Chat from '../../Component/Chat/chat'
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [isChatActive, setIsChatActive] = useState(false);
  const vids=useSelector(state=>state.videoreducer)?.data?.filter(q=>q).reverse();
  // const vids=[
  //   {
  //     _id:1,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 1",
  //     uploader:"abc",
  //     description:"description of video 1"
  //   },
  //   {
  //     _id:1,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 1",
  //     uploader:"abc",
  //     description:"description of video 1"
  //   },
  //   {
  //     _id:2,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 2",
  //     uploader:"abc",
  //     description:"description of video 2"
  //   },
  //   {
  //     _id:3,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 3",
  //     uploader:"abc",
  //     description:"description of video 3"
  //   },
  //   {
  //     _id:4,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 4",
  //     uploader:"abc",
  //     description:"description of video 4"
  //   },
  // ]
  const navlist=[
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy"
  ];

  const handleCreateRoom = () => {
    const generatedRoomId = uuidv4();
    const generatedUserId = uuidv4();
    setRoomId(generatedRoomId);
    setUserId(generatedUserId);
    setIsChatActive(true); // Activate chat
    console.log(`Room Created: Room ID = ${generatedRoomId}, User ID = ${generatedUserId}`);
  };

  const handleJoinRoom = () => {
    if (!roomId) {
      alert("Please enter a valid Room ID to join.");
      return;
    }
    const generatedUserId = uuidv4();
    setUserId(generatedUserId);
    setIsChatActive(true); // Activate chat
    console.log(`Joined Room: Room ID = ${roomId}, User ID = ${generatedUserId}`);
  };

  return (
    <div className="container_Pages_App">
      <Leftsidebar/>
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {navlist.map((m)=>{
            return(
              <p key={m} className='btn_nav_home'>{m}</p>
            );
          })}
        </div>
        <Showvideogrid vid={vids}/>
        {!isChatActive ? (
          <div className="chat-room-options">
            <h3>Join or Create a Room</h3>
            <button onClick={handleCreateRoom} className="chat-room-button">
              Create Room
            </button>
            <div className="join-room-section">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="room-id-input"
              />
              <button onClick={handleJoinRoom} className="chat-room-button">
                Join Room
              </button>
            </div>
          </div>
        ) : (
          <Chat roomId={roomId} userId={userId} userName="UserName" />
        )}
      </div>
    </div>
  )
}

export default Home