import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: localStorage.getItem("token") != null || false,
  username: "",
  id: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state) => {
      state.isAuthenticated = true;
    },
    signout: (state) => {
      state.isAuthenticated = false;
    },
    userReducer: (state = initialState, action) => {
      switch (action.type) {
        case "SET_USER":
          return {
            ...state,
            username: action.payload.username,
            id: action.payload.id,
          };
        default:
          return state;
      }
    },
  },
});

export const setUser = (username, id) => ({
  type: "SET_USER",
  payload: {
    username,
    id,
  },
});

export const signupThunk =
  ({ username, password }) =>
  async () => {
    console.log({ username, password });
    let response = await axios.post(`http://localhost:8000/signup`, {
      username,
      password,
    });
    console.log(response.data);
  };

export const signinThunk =
  ({ username, password }) =>
  async (dispatch) => {
    console.log({ username, password });
    let response = await axios.post(`http://localhost:8000/signin`, {
      username,
      password,
    });
    // console.log("testing", response.data.token);
    // console.log("testing2", response.data.username);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);
    localStorage.setItem("id", response.data.id);

    dispatch(signin());

    // dispatch(setUser(response.data.username, response.data.id));
  };

export const signoutThunk = () => async (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("id");
  dispatch(signout());
};

// Action creators are generated for each case reducer fu nction
export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
