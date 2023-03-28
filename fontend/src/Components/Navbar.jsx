import React, { useState,useEffect } from "react";
import "./navbar.css";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { signoutThunk } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const userName = localStorage.getItem("username");
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="container">
      <nav className="navContainer">
        <div className="left-nav">
          <a href="/home">
            <img src="" alt="" />
            <img src="/speedxnobg.svg" style={{ width: "125px" }} />
          </a>
          <a href="/home" className="navCategory">
            Home
          </a>
          <a href="/search/category1/empty" className="navCategory">
            Top Visit
          </a>
          <a href="/search/category1/empty" className="navCategory">
            Category 1
          </a>
        </div>
        <div className="right-nav">
          <a href="/post" className="postItemnav">
            Post Item
          </a>
          <div
            className={`dropdown ${
              dropdownOpen || isAuthenticated ? "show" : "hide"
            }`}>
            <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
              {`@${userName}`}
            </a>
            <div className="dropdown-menu">
              <div>
                <a className="dropdown-item" href="/profile">
                  My Profile
                </a>
              </div>

              <div>
                <a className="dropdown-item" href="/message">
                  Messages
                </a>
              </div>

              <div>
                {" "}
                <a
                  className="dropdown-item"
                  onClick={() =>
                    dispatch(signoutThunk()).then(() => navigate("/home"))
                  }>
                  Logout
                </a>
              </div>
            </div>
          </div>
          <a href={isAuthenticated ? "#" : "/signin"} className="signup-link">
            {isAuthenticated ? "" : "Sign In"}
          </a>
        </div>
      </nav>
    </div>
  );
}
