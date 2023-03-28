import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import SearchedItems from "../Components/SearchedItems";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";

import "./searchresult.css";

export default function SearchResult() {
  const { selectedCategory, searchInput } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(selectedCategory, searchInput);
    axios
      .get(
        `http://localhost:8000/search?selectedCategory=${selectedCategory}&searchInput=${searchInput}`
      )
      .then((res) => {
        setResults(res.data);
      });
  }, [selectedCategory, searchInput]);

  return (
    <div className="searchresultmainpage">
      <Navbar />
      <Search />

      <div className="searchresultpage">
        <SearchedItems results={results} />
      </div>
      <Footer />
    </div>
  );
}
