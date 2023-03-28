import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isFilled: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    isFilled: (state) => {
      state.isFilled = true;
    },
    notFilled: (state) => {
      state.isFilled = false;
    },
  },
});

export const postThunk =
  ({ sellerID,seller,itemName, itemPrice, description, category, photo1, photo2, photo3 }) =>
  async (dispatch) => {
    const formData = new FormData();
    formData.append("sellerID", sellerID);
    formData.append("seller", seller);
    formData.append("itemName", itemName);
    formData.append("itemPrice", itemPrice);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("photo1", photo1);
    formData.append("photo2", photo2);
    formData.append("photo3", photo3);

    if (photo1) {
      formData.append("photo1Name", photo1.name);
    } else {
      formData.append("photo1Name", "empty");
    }

    if (photo2) {
      formData.append("photo2Name", photo2.name);
    } else {
      formData.append("photo2Name", "empty");
    }

    if (photo3) {
      formData.append("photo3Name", photo3.name);
    } else {
      formData.append("photo3Name", "empty");
    }

    await axios.post(`http://localhost:8000/post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(isFilled());
  };

  export const editThunk =
  ({ id,sellerID,seller,itemName, itemPrice, description, category, photo1, photo2, photo3,status }) =>
  async (dispatch) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("sellerID", sellerID);
    formData.append("seller", seller);
    formData.append("itemName", itemName);
    formData.append("itemPrice", itemPrice);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("photo1", photo1);
    formData.append("photo2", photo2);
    formData.append("photo3", photo3);
    formData.append("status", status);

    if (photo1) {
      formData.append("photo1Name", photo1.name);
    } else {
      formData.append("photo1Name", "empty");
    }

    if (photo2) {
      formData.append("photo2Name", photo2.name);
    } else {
      formData.append("photo2Name", "empty");
    }

    if (photo3) {
      formData.append("photo3Name", photo3.name);
    } else {
      formData.append("photo3Name", "empty");
    }

    await axios.post(`http://localhost:8000/edit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(isFilled());
  };

export const { isFilled, notFilled } = postSlice.actions;

export default postSlice.reducer;
