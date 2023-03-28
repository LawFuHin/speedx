import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postThunk } from "../redux/PostSlice";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import "./post.css";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Test() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePhotoSubmit = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    const { id } = event.target;
    setItemInfo((prevValue) => ({
      ...prevValue,
      [id]: event.target.files[0],
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemInfo, setItemInfo] = useState({
    seller: "empty",
    sellerID: "empty",
    itemName: "empty",
    itemPrice: -999,
    description: "empty",
    category: "empty",
    photo1: "empty",
    photo2: "empty",
    photo3: "empty",
  });

  const categoryChoice = [
    "category1",
    "category2",
    "category3",
    "category4",
    "category5",
    "category6",
    "category7",
    "category8",
    "category9",
    "category10",
  ];

  const handleSubmit = (event) => {
    // event.preventDefault();
    const { id, value } = event.target;
    setItemInfo((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const seller = localStorage.getItem("username");
  const sellerID = localStorage.getItem("id");

  useEffect(() => {
    setItemInfo({
      ...itemInfo,
      sellerID: sellerID,
      seller: seller,
    });
  }, [sellerID, seller]);

  return (
    <div className="postpage">
      <Navbar />
      <Search />
      <div className="container postContainer">
        <div className="row">
          <div
            className="col-lg-6 col-md-12 postPhoto"
            style={{ backgroundImage: `url(${selectedFile})` }}>
            <div>
              <label htmlFor="photo1">
                <input
                  type="file"
                  id="photo1"
                  accept="image/*"
                  onChange={handlePhotoSubmit}
                  style={{ display: "none" }}
                />
                <div className="custom-file-input">
                  <i class="fa-solid fa-cloud-arrow-up uploadIcon"></i>
                  {/* <div>Upload your item hoto...</div> */}
                </div>
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 postInputContainer">
            <div className="headingText postInputHeader">
              Upload your items today!
            </div>
            <div>
              <input
                type="text"
                id="itemName"
                onChange={handleSubmit}
                placeholder="What's your item name?"
                className="postInput"
              />
            </div>
            <div>
              <input
                className="postInput"
                type="number"
                id="itemPrice"
                step="0.01"
                min="0"
                onChange={handleSubmit}
                placeholder="How much are you going to sell?"
              />
            </div>
            <div>
              <textarea
                id="description"
                onChange={handleSubmit}
                className="postInput"
                placeholder="Write some description about your product here:"
              />
            </div>
            <div>
              <select
                className="postInput"
                id="category"
                defaultValue={itemInfo.category}
                onChange={handleSubmit}>
                <option value="empty" disabled>
                  Choose a category
                </option>
                {categoryChoice.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                className="postInputSubmit"
                type="submit"
                onClick={() => {
                  dispatch(postThunk(itemInfo));
                  navigate("/profile");
                }}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
