import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postThunk } from "../redux/PostSlice";
import Navbar from "./Navbar";
import Search from "./Search";

import "./post.css";

// import { useNavigate } from "react-router-dom";

export default function Post() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

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
    "Choose a category...",
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

  const handlePhotoSubmit = (event) => {
    // event.preventDefault();
    const { id } = event.target;
    setItemInfo((prevValue) => ({
      ...prevValue,
      [id]: event.target.files[0],
    }));
  };

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
    <div>
      <Navbar />
      <Search />
      <form>
        <div>
          <label htmlFor="photo1">Photo1:</label>
          <input
            type="file"
            id="photo1"
            accept="image/*"
            onChange={handlePhotoSubmit}
          />
        </div>

        <div>
          <label htmlFor="photo2">Photo2:</label>
          <input
            type="file"
            id="photo2"
            accept="image/*"
            onChange={handlePhotoSubmit}
          />
        </div>

        <div>
          <label htmlFor="photo3">Photo3:</label>
          <input
            type="file"
            id="photo3"
            accept="image/*"
            onChange={handlePhotoSubmit}
          />
        </div>

        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" onChange={handleSubmit} />
        </div>
        <div>
          <label htmlFor="itemPrice">Item Price:</label>
          <input
            type="number"
            id="itemPrice"
            step="0.01"
            min="0"
            onChange={handleSubmit}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" onChange={handleSubmit} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            defaultValue={itemInfo.category}
            onChange={handleSubmit}>
            <option value="null" disabled>
              Choose a category
            </option>
            {categoryChoice.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          onClick={() => {
            dispatch(postThunk(itemInfo));
          }}>
          Submit
        </button>
      </form>
    </div>
  );
}
