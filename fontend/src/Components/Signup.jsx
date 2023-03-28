import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupThunk } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import "./sign.css";

export default function Signup() {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  // const navigate = Navigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredential((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div className="signuppage">
      <Navbar />
      <Search />
      <div className="signContainer">
      <img src="/speedxwhitebg.png" style={{width:"100%"}}/>
        <p>Start your amazing journey in SpeedX today!</p>
        <h3>Sign Up</h3>
        <div>
          User name:
          <input
            className="signInput"
            type="text"
            name="username"
            placeholder="Your SpeedX username..."
            onChange={handleChange}
          />
        </div>
        <div>
          Password:
          <input
            className="signInput"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            dispatch(signupThunk(credential)).then(() => navigate("/signin"));
          }}>
          Sign Up
        </button>
        <div>
          
        </div>
        <p>
          Already have your account?{" "}
          <span>
            <button
              onClick={() => {
                navigate("/signin");
              }}>
              Sign In
            </button>
          </span>
        </p>
      </div>
      <Footer/>
    </div>
  );
}
