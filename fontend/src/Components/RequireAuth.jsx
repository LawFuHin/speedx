import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth(props) {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  console.log("props", props);
  console.log("props.children", props.children);
  return isAuthenticated ? props.children : <Navigate to="/signup" />;
}
