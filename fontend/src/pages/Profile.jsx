import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "../Components/searchedItems.css";
import Footer from "../Components/Footer";

export default function Profile() {
  const userName = localStorage.getItem("username");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/profile/${userName}`).then((res) => {
      console.log(res.data);
      setResults(res.data);
    });
  }, [userName]);
  const navigate = useNavigate();
  return (
    <div className="profilePage">
      <Navbar />
      <Search />
      <div className="container">
        <h1 className="welcomeProfileText">@{userName}'s profile page</h1>
        {results.map((result) => (
          <a
            className="searchedItemContainerLink"
            href={`/items/${result.id}`}
            key={result.id}>
            <div className="searchedItemContainer">
              <div className="searchedItemPhotoContainer">
                <img
                  className="searchedItemPhoto"
                  src={`http://localhost:8000/${result.photo1Name}`}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = "/default.jpg";
                  }}
                  alt=""
                />
              </div>
              <div className="searchedItemInfoContainer">
                <div className="searchedItemInfoName">{result.itemName}</div>
                <div className="searchedItemInfoSecondColumn">
                  <div className="searchedItemInfoPrice">
                    ${result.itemPrice}
                  </div>
                  <div className="searchedItemInfoSecondColumn_Right">
                    <div className="edit-btn-div">
                      <button
                        className="itemProfielEditButton"
                        type=""
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/edit/${result.id}`);
                        }}>
                        edit
                      </button>
                    </div>
                    <div className="searchedItemInfoUserName">
                      @{result.seller}
                    </div>
                    <div className="searchedItemInfoVisitCount">
                      {result.visitCount} visit
                    </div>
                    <div className="searchedItemInfoPostTime">
                      {`${moment(result.postTime).fromNow()}...`}
                    </div>
                  </div>
                </div>
                <div className="searchedItemInfoDescription">
                  {result.description}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <Footer />
    </div>
  );
}
