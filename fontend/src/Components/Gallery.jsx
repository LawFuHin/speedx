import React, { useEffect, useState } from "react";
import "./gallery.css";
import axios from "axios";

export default function Gallery(query) {
  const [queryResult, setQueryResult] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8000/query/${query.query}`).then((res) => {
      setQueryResult(res.data);
      console.log(res.data);
    });
  }, [query.name, query.query]);
  return (
    <div className="container">
      <div className="galleryHeader">
        <div>{query.name}</div>
        <a className="galleryMore" href={`/showresult/${query.query}`}>More <i class="fa-solid fa-angles-right"></i></a>
      </div>

      <div className="scrollmenu">
        {queryResult &&
          queryResult.slice(0, 10).map((item) => (
            <div className="galleryContainer">
              <a className="clickGalleryContainer" href={`/items/${item.id}`}>
                <div key={item.id}>
                  <img
                    className="galleryCardPhoto"
                    src={`http://localhost:8000/photos/${item.photo1Name}`}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = "/default.jpg";
                    }}
                    alt=""
                  />
                  <div className="galleryCardName">{item.itemName}</div>
                  <div className="galleryCardPrice">${item.itemPrice}</div>
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
