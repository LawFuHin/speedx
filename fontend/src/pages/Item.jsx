import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Items from "../Components/Items";
import { useParams } from "react-router-dom";
import React from "react";
import Footer from "../Components/Footer";

export default function Item() {
  const { itemID } = useParams();

  return (
    <div className="itemsmainapge">
      <Navbar />
      <Search />
      <div className="container">
        <Items itemID={itemID} />
      </div>
      <Footer />
    </div>
  );
}
