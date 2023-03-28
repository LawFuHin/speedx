import React from "react";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import Banner from "../Components/Banner";
import Gallery from "../Components/Gallery";
import Footer from "../Components/Footer";
import "./home.css";

export default function () {
  const gallery1 = { name: "Today's new post", query: "new" };
  const gallery2 = { name: "Today's top hit", query: "hit" };
  const gallery3 = { name: "Shuffle shuffle shuffle", query: "shuffle" };

  return (
    <div className="homePage">
      <div className="stickyTopSection">
        <Navbar />
        <Search />
      </div>
      <Banner />
      <Gallery {...gallery1} />
      <Gallery {...gallery2} />
      <Gallery {...gallery3} />
      <Footer/>
    </div>
  );
}
