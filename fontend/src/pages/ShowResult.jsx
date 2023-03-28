import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import SearchedItems from "../Components/SearchedItems";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";

export default function SearchResult() {
  const { queryName } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/query/${queryName}`).then((res) => {
      setResults(res.data);
    });
  }, [queryName]);

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
