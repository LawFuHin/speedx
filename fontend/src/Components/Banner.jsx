import React, { useState } from "react";
import "./banner.css";

export default function Banner() {
  const banners = [
    { id: 0, image: "banner1.jpeg" },
    { id: 1, image: "banner2.jpeg" },
    { id: 2, image: "banner3.jpeg" },
    { id: 3, image: "banner4.jpeg" },
  ];

  const [selectedBanner, setSelectedBanner] = useState(0);

  const handleLeftClick = () => {
    if (selectedBanner === 0) {
      setSelectedBanner(banners.length - 1);
    } else {
      setSelectedBanner(selectedBanner - 1);
    }
  };

  const handleRightClick = () => {
    if (selectedBanner === banners.length - 1) {
      setSelectedBanner(0);
    } else {
      setSelectedBanner(selectedBanner + 1);
    }
  };

  return (
    <div className="container">
      <div
        className="jumbotron-container"
        style={{ backgroundImage: "/moon.png" }}>
        <div class="row">
          <div className="col-12 bannerTextContainer">
            <div>
              <img src="/speedxnobg.svg" style={{ width: "500px" }}/>
            </div>
            <div>
              <h3>
                <span className="hiddenTextBanner">________________________</span>
                <span id="rocket-animation">
                  <i className="bi bi-rocket-takeoff"></i>
                </span>
              </h3>
            </div>
            <div>
              <a href="signup"><img src="/signupnobg.svg" style={{width:"200px"}}/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
