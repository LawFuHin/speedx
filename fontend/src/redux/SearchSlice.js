import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchResult: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});

export const searchThunk =
  ({ selectedCategory, searchInput }) =>
  async (dispatch) => {
    console.log({ selectedCategory, searchInput });
    try {
      let response = await axios.post(`http://localhost:8000/search`, {
        selectedCategory,
        searchInput,
      });
      console.log(response.data);
      dispatch(setSearchResult(response.data));
    } catch (error) {
      console.log(error);
    }
  };
export const { setSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
