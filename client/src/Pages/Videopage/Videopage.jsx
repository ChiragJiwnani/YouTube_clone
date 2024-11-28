import React, { useEffect, useRef, useState } from "react";
import "./Videopage.css";
import moment from "moment";
import Likewatchlatersavebtns from "./Likewatchlatersavebtns";
import { useParams, Link, useNavigate } from "react-router-dom";
import Comment from "../../Component/Comment/Comment";
// import vidd from "../../Component/Video/vid.mp4"
import { viewvideo, addPoints } from "../../action/video";
import { addtohistory } from "../../action/history";
import { useSelector, useDispatch } from "react-redux";
const Videopage = () => {
  const { vid } = useParams();
  const dispatch = useDispatch();
  const vids = useSelector((state) => state.videoreducer);
  // const vids = [
  //     {
  //         _id: 1,
  //         video_src: vidd,
  //         chanel: "wvjwenfj3njfwef",
  //         title: "video 1",
  //         uploader: "abc",
  //         description: "description of video 1"
  //     },
  //     {
  //         _id: 1,
  //         video_src: vidd,
  //         chanel: "wvjwenfj3njfwef",
  //         title: "video 1",
  //         uploader: "abc",
  //         description: "description of video 1"
  //     },
  //     {
  //         _id: 2,
  //         video_src: vidd,
  //         chanel: "wvjwenfj3njfwef",
  //         title: "video 2",
  //         uploader: "abc",
  //         description: "description of video 2"
  //     },
  //     {
  //         _id: 3,
  //         video_src: vidd,
  //         chanel: "wvjwenfj3njfwef",
  //         title: "video 3",
  //         uploader: "abc",
  //         description: "description of video 3"
  //     },
  //     {
  //         _id: 4,
  //         video_src: vidd,
  //         chanel: "wvjwenfj3njfwef",
  //         title: "video 4",
  //         uploader: "abc",
  //         description: "description of video 4"
  //     },
  // ]
  // console.log( vids)
  const vv = vids?.data.filter((q) => q._id === vid)[0];

  const currentuser = useSelector((state) => state.currentuserreducer);
  const videoRef = useRef(null);
  const commentsRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  const [leftTapCount, setLeftTapCount] = useState(0);
  const [rightTapCount, setRightTapCount] = useState(0);
  const [middleTapCount, setMiddleTapCount] = useState(0);
  const [locationAndTemp, setLocationAndTemp] = useState(null);
  const leftTapTimeoutRef = useRef(null);
  const rightTapTimeoutRef = useRef(null);
  const middleTapTimeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (vv) {
      console.log("Video Data:", vv);
    } else {
      console.log("No video data found for vid:", vid);
    }
  }, [vv]);

  const handleviews = () => {
    dispatch(viewvideo({ id: vid }));
  };

  const handlehistory = () => {
    dispatch(
      addtohistory({
        videoid: vid,
        viewer: currentuser?.result._id,
      })
    );
  };

  const handlePoints = () => {
    dispatch(
      addPoints({
        id: vid,
        viewer: currentuser?.result._id,
      })
    );
    console.log("Points Added");
  };

  useEffect(() => {
    if (currentuser) {
      handlehistory();
    }
    handleviews();
  }, []);

  useEffect(() => {
    if (currentuser) {
      handlehistory();
    }
    handleviews();
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handlePoints);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handlePoints);
      }
    };
  }, [vid]);

  const handleDoubleClick = (e) => {
    const video = videoRef.current;
    if (video) {
      const boundingRect = video.getBoundingClientRect();
      const clickPositionX = e.clientX - boundingRect.left;

      if (clickPositionX > boundingRect.width / 2) {
        video.currentTime += 5; // Right side double-tap
      } else {
        video.currentTime -= 5; // Left side double-tap
      }
    }
  };

  const handleMouseDown = (e) => {
    const video = videoRef.current;
    if (video) {
      const boundingRect = video.getBoundingClientRect();
      const clickPositionX = e.clientX - boundingRect.left;

      holdTimeoutRef.current = setTimeout(() => {
        if (clickPositionX > boundingRect.width / 2) {
          video.playbackRate = 2; // Right side hold
        } else {
          video.playbackRate = 0.5; // Left side hold
        }
      }, 500); // Adjust delay as needed
    }
  };

  const handleMouseUp = () => {
    const video = videoRef.current;
    if (video) {
      clearTimeout(holdTimeoutRef.current);
      video.playbackRate = 1; // Reset speed
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      clearTimeout(holdTimeoutRef.current);
      video.playbackRate = 1; // Reset speed
    }
  };

  const handleTripleTap = (e) => {
    if (videoRef.current) {
      const boundingRect = videoRef.current.getBoundingClientRect();
      const clickPositionX = e.clientX - boundingRect.left;
      const middleStart = boundingRect.width / 3;
      const middleEnd = (2 * boundingRect.width) / 3;

      if (clickPositionX <= boundingRect.width / 3) {
        setLeftTapCount(leftTapCount + 1);

        if (leftTapTimeoutRef.current) {
          clearTimeout(leftTapTimeoutRef.current);
        }

        leftTapTimeoutRef.current = setTimeout(() => {
          setLeftTapCount(0);
        }, 500); // 500ms window for triple tap

        if (leftTapCount === 2) {
          commentsRef.current.scrollIntoView({ behavior: "smooth" });
          setLeftTapCount(0);
        }
      } else if (clickPositionX >= (2 * boundingRect.width) / 3) {
        setRightTapCount(rightTapCount + 1);

        if (rightTapTimeoutRef.current) {
          clearTimeout(rightTapTimeoutRef.current);
        }

        rightTapTimeoutRef.current = setTimeout(() => {
          setRightTapCount(0);
        }, 500); // 500ms window for triple tap

        if (rightTapCount === 2) {
          window.close();
          setRightTapCount(0);
        }
      } else {
        setMiddleTapCount(middleTapCount + 1);

        if (middleTapTimeoutRef.current) {
          clearTimeout(middleTapTimeoutRef.current);
        }

        middleTapTimeoutRef.current = setTimeout(() => {
          setMiddleTapCount(0);
        }, 500); // 500ms window for triple tap

        if (middleTapCount === 2) {
          // Assuming `nextVideoId` is the ID of the next video to play
          const nextVideoId = getNextVideoId(); // Implement this function based on your logic
          if (nextVideoId) {
            navigate(`/videopage/${nextVideoId}`);
          }
          setMiddleTapCount(0);
        }
      }
    }
  };

  // Dummy function to get next video ID, replace with your logic
  const getNextVideoId = () => {
    const currentIndex = vids?.data.findIndex((video) => video._id === vid);
    if (currentIndex !== -1 && currentIndex + 1 < vids.data.length) {
      return vids.data[currentIndex + 1]._id;
    }
    return null;
  };

  const handleSingleTapTopRight = async (e) => {
    const video = videoRef.current;
    if (video) {
      const boundingRect = video.getBoundingClientRect();
      const clickPositionX = e.clientX - boundingRect.left;
      const clickPositionY = e.clientY - boundingRect.top;

      if (
        clickPositionX > boundingRect.width * 0.9 &&
        clickPositionY < boundingRect.height * 0.1
      ) {
        // Top right corner tap
        const position = await getCurrentPosition();
        if (position) {
          const weather = await getWeather(
            position.coords.latitude,
            position.coords.longitude
          );
          if (weather) {
            setLocationAndTemp(
              `Location: ${weather.location.name}, Temperature: ${weather.current.temp_c}°C`
            );
            setTimeout(() => {
              setLocationAndTemp(null);
            }, 5000); // Hide the popup after 5 seconds
          }
        }
      }
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeather = async (lat, lon) => {
    const apiKey = "a379da1c007f4b0798972427243006"; // Replace with your WeatherAPI key
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
    );
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  };

  if (!vv) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div
            className="video_display_screen_videoPage"
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              handleTripleTap(e);
              handleSingleTapTopRight(e);
            }}
          >
            <video
              ref={videoRef}
<<<<<<< HEAD
              src={`http://localhost:5000/${vv?.filepath}`}
                // src={`https://youtube-clone-3ge8.onrender.com/${vv?.filepath}`}
                // src={`https://youtubeclone-server.vercel.app/${vv?.filepath}`}
                // src={`https://you-tube-clone-6hhgfjrnf-chiragjiwnanis-projects.vercel.app/${vv?.filepath}`}
=======
              // src={`http://localhost:5000/${vv?.filepath}`}
                src={`https://youtubeclone-server.vercel.app/${vv?.filepath}`}
>>>>>>> 36e2da87f10d0bbe1e5b52db7f85213a62989758
              className="video_ShowVideo_videoPage"
              controls
              onDoubleClick={handleDoubleClick}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                handleTripleTap(e);
                handleSingleTapTopRight(e);
              }}
            ></video>
            {locationAndTemp && (
              <div className="location-temp-popup">{locationAndTemp}</div>
            )}
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.title}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdat).fromNow()}
                  </div>
                  <Likewatchlatersavebtns vv={vv} vid={vid} />
                </div>
              </div>
              <Link
                to={`/chanel/${vv?.videochanel}`}
                className="chanel_details_videoPage"
              >
                <b className="chanel_logo_videoPage">
                  <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videoPage">{vv.uploader}</p>
              </Link>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comment videoid={vv._id} />
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More videos</div>
        </div>
      </div>
    </>
  );
};

export default Videopage;
