import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./items.css";
import moment from "moment";

export default function Items() {
  const { itemID } = useParams();

  const [itemInfo, setItemInfo] = useState({
    id: "empty",
    seller: "empty",
    itemName: "empty",
    itemPrice: "empty",
    description: "empty",
    category: "empty",
    postTime: "empty",
    editTime: "empty",
    visitCount: "empty",
    searchCount: "empty",
    photo1Name: "empty",
    photo2Name: "empty",
    photo3Name: "empty",
    status: "empty",
  });

  const [message, setMessage] = useState({
    message: "empty",
    sender: localStorage.getItem("username"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/items/${itemID}`)
      .then((res) => {
        if (res.data !== "empty") {
          setItemInfo(res.data[0]);
          setMessage((prevValue) => ({
            ...prevValue,
            receiver: `${itemInfo.seller}`,
          }));
          console.log(res.data[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [itemID, itemInfo.seller]);

  const handleSetMessage = (event) => {
    const { id, value } = event.target;
    setMessage((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const handleSubmitMessage = (event) => {
    console.log("submit message");
    console.log(message);
    axios.post("http://localhost:8000/message", message).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div class>
      {/* <div>Items of {JSON.stringify(itemInfo)}</div> */}

      <div className="itemContainer">
        <div className="itemPhotoContainer">
          <img
            className="itemPhoto"
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "/default.jpg";
            }}
            src={`http://localhost:8000/photos/${itemInfo.photo1Name}`}
            alt=""
          />
        </div>
        <div className="itemInfoBox">
          <div className="itemInfoName">{itemInfo.itemName}</div>
          <div className="itemInfoPrice">@{itemInfo.seller}</div>
          <div className="itemInfoPrice">Price: ${itemInfo.itemPrice}</div>
          <div className="itemInfoPostTime">
            Post Time: {`${moment(itemInfo.postTime).fromNow()}...`}
          </div>
          <div className="itemInfoEditTime">
            Edit Time: {`${moment(itemInfo.editTime).fromNow()}...`}
          </div>
          <div className="itemInfoVisitCount">
            Visit Count: {itemInfo.visitCount}
          </div>
          <div className="itemInfoStatus">Status: {itemInfo.status}</div>
        </div>
      </div>

      <div className="itemDescriptionContainer">
        <div className="itemDescriptionHeader">Item Description</div>
        <div className="itemInfoDescription">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut tempore
          quas iusto, quibusdam ratione, aperiam quod saepe veniam quidem alias,
          reprehenderit sunt? Accusamus adipisci voluptatibus odio! Odit nam
          assumenda minima.
        </div>
      </div>

      <div className="itemContactContainer">
        <div>
          <div className="itemDescriptionHeader">
            Message to seller @{itemInfo.seller}
          </div>

          <textarea id="message" onChange={handleSetMessage} />
        </div>
        <div className="submit-message-div">
          <button
            className="submit-message"
            type="submit"
            onClick={() => {
              handleSubmitMessage();
              navigate("/message");
            }}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
