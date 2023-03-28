import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signinThunk } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import "./sign.css";

export default function Signin() {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });

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
    <div className="signinpage">
      <Navbar />
      <Search />

      <div className="signContainer">
        <img src="/speedxwhitebg.png" style={{ width: "100%" }} />
        <p>Want to sell your products as as possible?</p>
        <h1>Sign in</h1>
     

        <div className="signItemsDiv">
          User name:
          <input
            className="signInput"
            type="text"
            name="username"
            placeholder="username"
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
          className="signSubmit-btn"
          type="submit"
          onClick={() => {
            dispatch(signinThunk(credential)).then(() => navigate("/post"));
          }}>
          Sign in
        </button>
        <p>First time using SpeedX?</p>
        <p>
          Sign up here:{" "}
          <span>
            <button
              className="signSubmit-btn"
              onClick={() => {
                navigate("/signup");
              }}>
              Sign Up
            </button>
          </span>
        </p>
      </div>
      <Footer/>
    </div>
  );
}
