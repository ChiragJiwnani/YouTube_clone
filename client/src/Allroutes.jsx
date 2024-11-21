import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import Videopage from "./Pages/Videopage/Videopage";
import Channel from "./Pages/Channel/Channel";
import Library from "./Pages/Library/Library";
import Likedvideo from "./Pages/Likedvideo/Likedvideo";
import Watchhistory from "./Pages/Watchhistory/Watchhistory";
import Watchlater from "./Pages/Watchlater/Watchlater";
import Yourvideo from "./Pages/Yourvideo/Yourvideo";
import VideoCallPage from "./Pages/VideoCall/videocall";
import LoginPage from "./Pages/Loginpage/loginpage";

const Allroutes = ({ seteditcreatechanelbtn, setvideouploadpage }) => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search/:Searchquery" element={<Search />} />
      <Route path="/videopage/:vid" element={<Videopage />} />
      <Route path="/Library" element={<Library />} />
      <Route path="/Likedvideo" element={<Likedvideo />} />
      <Route path="/Watchhistory" element={<Watchhistory />} />
      <Route path="/Watchlater" element={<Watchlater />} />
      <Route path="/Yourvideo" element={<Yourvideo />} />
      <Route
        path="/channel/:cid"
        element={
          <Channel
            seteditcreatechanelbtn={seteditcreatechanelbtn}
            setvideouploadpage={setvideouploadpage}
          />
        }
      />
      <Route path="/videocall" element={<VideoCallPage />} />
    </Routes>
  );
};

export default Allroutes;
