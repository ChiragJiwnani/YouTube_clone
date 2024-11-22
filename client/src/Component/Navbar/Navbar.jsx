import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./Navbar.css";
import Searchbar from "./Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import Auth from "../../Pages/Auth/Auth";
import axios from "axios";
import { login } from "../../action/auth";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { setcurrentuser } from "../../action/currentuser";

import { jwtDecode } from "jwt-decode";
const Navbar = ({ toggledrawer, seteditcreatechanelbtn }) => {
  const [authbtn, setauthbtn] = useState(false);
  const [user, setuser] = useState(null);
  const [profile, setprofile] = useState([]);
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.currentuserreducer);
  // console.log(currentuser)
  const successlogin = () => {
    if (profile.email) {
      dispatch(login({ email: profile.email }));
      console.log(profile.email);
    }
  };
  // console.log(currentuser)
  // const currentuser={
  //     result:{
  //         _id:1,
  //         name:"abcjabsc",
  //         email:"abcd@gmail.com",
  //         joinedon:"222-07-134"
  //     }
  // }

  const google_login = useGoogleLogin({
    onSuccess: (tokenResponse) => setuser(tokenResponse),

    onError: (error) => console.log("Login Failed", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setprofile(res.data);
          successlogin();
          console.log(res.data);
        });
    }
  }, [user]);
  const logout = () => {
    dispatch(setcurrentuser(null));
    googleLogout();
    localStorage.clear();
  };

  useEffect(() => {
    const token = currentuser?.token;
    if (token) {
      const decodetoken = jwtDecode(token);
      if (decodetoken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
  }, [currentuser?.token, dispatch]);

  useEffect(() => {
    const videoCallBtn = document.getElementById("videoCallBtn");

    const checkTimeAndDisable = () => {
      const now = new Date();
      const currentHour = now.getHours();

      // Disable button and set notification if time is outside 6 PM to 12 AM
      if (currentHour <= 17) {
        videoCallBtn.removeAttribute("href");
        videoCallBtn.onclick = (e) => {
          e.preventDefault();
          alert("Video calls are only available from 6 PM to 12 AM");
        };
      } else {
        videoCallBtn.setAttribute("href", "/videocall");
        videoCallBtn.onclick = null; // Remove onclick if time is within range
      }
    };

    checkTimeAndDisable();

    // Optionally, you can set an interval to keep checking the time every minute
    const interval = setInterval(checkTimeAndDisable, 60000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={() => toggledrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to={"/home"} className="logo_div_Navbar">
            <img height={32} src={logo} alt="" />
            <p className="logo_title_navbar">
              {" "}
              YouTube <sup>clone</sup>{" "}
            </p>
          </Link>
        </div>
        <Searchbar />
        <a id="videoCallBtn" className="Video_Btn">
          <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
        </a>

        <div className="apps_Box">
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
        </div>

       

        <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} />
        <div className="Auth_cont_Navbar">
          {currentuser ? (
            <>
              <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
                <p className="fstChar_logo_App">
                  {currentuser?.result.name ? (
                    <>{currentuser?.result.name.charAt(0).toUpperCase()}</>
                  ) : (
                    <>{currentuser?.result.email.charAt(0).toUpperCase()}</>
                  )}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="Auth_Btn" onClick={() => google_login()}>
                <BiUserCircle size={25} stroke={"1px, solid"} />
                <div className="auth_text">
                  <b>Sign in</b>
                </div>
              </p>
            </>
          )}
        </div>
      </div>
       <div className="loginotp">
      <Link to="/login">Login</Link> {/* Link to the login page */}
      {/* Other navbar content */}
    </div>
      {authbtn && (
        <Auth
          seteditcreatechanelbtn={seteditcreatechanelbtn}
          setauthbtn={setauthbtn}
          user={currentuser}
        />
        
      )}
    </>
    
  );
};

export default Navbar;
