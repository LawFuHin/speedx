import React, { useState } from "react";
import "./navbar.css";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { signoutThunk } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./newnavbar.css";

export default function Test() {
  const userName = localStorage.getItem("username");
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="left-nav col">
          <a href="/home">Photo</a>
          <a href="/search/category1/empty" className="navCategory">
            category1
          </a>
          <a href="/search/category2/empty" className="navCategory">
            category2
          </a>
          <a href="/search/category3/empty" className="navCategory">
            category3
          </a>
          <a href="/search/category4/empty" className="navCategory">
            category4
          </a>
          <a href="/search/category5/empty" className="navCategory">
            category5
          </a>
        </div>
        <div className="col right-nav">
          <a href="/post">Post Item</a>
          <div
            className={`dropdown ${
              dropdownOpen || isAuthenticated ? "show" : "hide"
            }`}>
            <a href="#" className="dropdown-toggle" onClick={toggleDropdown}>
              {`${userName} ,`}
            </a>
            <div className="dropdown-menu">
              <div>
                <a className="dropdown-item" href="/profile">
                  My Profile
                </a>
              </div>

              <div>
                <a className="dropdown-item" href="#">
                  Settings
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
          <a href={isAuthenticated ? "#" : "/signup"} className="signup-link">
            {isAuthenticated ? "" : "SignUp"}
          </a>
        </div>
      </div>
    </div>
  );
}
