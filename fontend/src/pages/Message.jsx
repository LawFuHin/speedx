import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Footer from "../Components/Footer";
import axios from "axios";
import moment from "moment";

import "./message.css";

export default function Message() {
  const [message, setMessage] = useState({
    message: "empty",
    sender: localStorage.getItem("username"),
    receiver: "",
  });

  const [messageLog, setMessageLog] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/messagelog/${localStorage.getItem("username")}`
      )
      .then((res) => {
        if (res.data !== "empty") {
          setMessageLog(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [messageLog, message]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setMessage((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  };

  const handleSubmitMessage = (event) => {
    console.log("submit message");
    console.log(message);
    setMessage((prevValue) => ({
      ...prevValue,
      receiver: event.target.value,
    }));
    axios.post("http://localhost:8000/message", message).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="messagePage">
      <Navbar />
      <Search />
      {messageLog.map((message) => (
        <div className="container allMessageContainer">
          <div className="row messageRowContainer">
            <div className="col-2">
              <div className="targetNameContainer">
                <div className="targetNameContainerText">
                  <div>From:</div>@{message.sender}
                  <div>{moment(message.postTime).fromNow()}</div>
                </div>
              </div>
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-12">
                  <div className="recentMessageContainer">
                    <div className="recentMessage">
                      to @{message.receiver} :{message.message}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-10">
                      <textarea
                        id="message"
                        className="messageArea"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-2 sendMessageContainer">
                      <button
                        id="receiver"
                        value={
                          localStorage.getItem("username") !== message.sender
                            ? message.sender
                            : message.receiver
                        }
                        onClick={handleSubmitMessage}>
                        Send!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
