import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutThunk } from "../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function Secret() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  // const username = useSelector((store) => store.auth.username);
  // const id = useSelector((store) => store.auth.id);

  const username = localStorage.getItem("username");
  const id = localStorage.getItem("id");


  return (
    <div>
      <h1>secret</h1>

      <h1>username:{username}</h1>
      <h1>user id {id}</h1>
      <button
        onClick={() =>
          dispatch(signoutThunk()).then(() => navigate("/signin"))
        }>
        Sign out
      </button>
    </div>
  );
}
