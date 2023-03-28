import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.css";

export default function Search() {
  const [selectedCategory, setSelectedCategory] = useState("empty");
  const [searchInput, setSearchInput] = useState("empty");
  const categories = [
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
    "empty",
  ];

  const navigate = useNavigate();
  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${selectedCategory}/${searchInput}`);
  };

  return (
    <div className="container">
      <div className="searchContainer">
        <form className="input-group">
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            onChange={handleChangeSearchInput}
          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleChangeCategory}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button id="submit-search" type="submit" onClick={handleSubmit}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
