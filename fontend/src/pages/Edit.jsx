import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { postThunk } from "../redux/PostSlice";
import { editThunk } from "../redux/PostSlice";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Footer from "../Components/Footer";
import axios from "axios";

import "../Components/post.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Test() {
  const { itemID } = useParams();
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
    id: "empty",
    seller: "empty",
    sellerID: "empty",
    itemName: "empty",
    itemPrice: -999,
    description: "empty",
    category: "empty",
    postTime: "empty",
    editTime: "empty",
    visitCount: "empty",
    searchCount: "empty",
    photo1: "empty",
    photo2: "empty",
    photo3: "empty",
    photo1Name: "empty",
    photo2Name: "empty",
    photo3Name: "empty",
    status: "available",
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

  const statusChoice = ["available", "sold"];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/items/${itemID}`)
      .then((res) => {
        if (res.data !== "empty") {
          setItemInfo(res.data[0]);
          setSelectedFile(
            `http://localhost:8000/photos/${itemInfo.photo1Name}`
          );
          console.log(res.data[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [itemInfo.photo1Name]);

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
    <div className="editPage">
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
                value={itemInfo.itemName}
                placeholder="What's your item name?"
                className="postInput"
              />
            </div>
            <div>
              <input
                value={itemInfo.itemPrice}
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
                value={itemInfo.description}
                id="description"
                onChange={handleSubmit}
                className="postInput"
                placeholder="Write some description about your product here:"
              />
            </div>
            <div>
              <select
                value={itemInfo.category}
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
              <select
                value={itemInfo.status}
                className="postInput"
                id="status"
                defaultValue={itemInfo.status}
                onChange={handleSubmit}>
                <option value="empty" disabled>
                  Choose a status
                </option>
                {statusChoice.map((choice) => (
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
                  dispatch(editThunk(itemInfo));
                  navigate("/home");
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
