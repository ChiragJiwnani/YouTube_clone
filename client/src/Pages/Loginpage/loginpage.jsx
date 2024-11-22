// src/Pages/LoginPage/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory
import { Link, generatePath } from "react-router-dom";
import axios from "axios";
import "./loginpage.css"; // Add your styles for the login page

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("email"); // Default login via email
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Use useNavigate hook

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (loginMethod === "email") {
        // Trigger email OTP verification
        await axios.post("https://youtube-clone-3ge8.onrender.com/api/send-email-otp", { email });
      } else {
        // Trigger mobile OTP verification
        await axios.post("https://youtube-clone-3ge8.onrender.com/api/send-mobile-otp", { mobileNumber });
      }
      setLoading(false);
      // Redirect to home or dashboard after successful OTP request
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("/api/verify-otp", {
        otp,
        email: loginMethod === "email" ? email : null,
        mobileNumber: loginMethod === "mobile" ? mobileNumber : null,
      });
      if (response.data.message === "Login successful") {
        navigate("/"); // Redirect to home after successful login
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    

    
    <div className="login-container">
      <div className="loginotp">
      <Link to="/">Home</Link> {/* Link to the login page */}
      {/* Other navbar content */}
    </div>
      <h1>Login</h1>
      <button onClick={() => setLoginMethod("email")}>Login with Email</button>
      <button onClick={() => setLoginMethod("mobile")}>Login with Mobile</button>

      {loginMethod === "email" ? (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
      )}

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Sending OTP..." : "Login"}
      </button>

      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleVerifyOtp}>Verify OTP</button>
      </div>
    </div>
  );
};

export default LoginPage;
