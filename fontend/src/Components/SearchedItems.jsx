import React from "react";
import moment from "moment";
import "./searchedItems.css";

export default function SearchedItems({ results }) {
  return (
    <div className="container searchBackgroundContainer">
      {results.map((result) => (
        <a
          className="searchedItemContainerLink"
          href={`/items/${result.id}`}
          key={result.id}>
          <div className="searchedItemContainer">
            <div className="searchedItemPhotoContainer">
              <img
                className="searchedItemPhoto"
                src={`http://localhost:8000/${result.photo1Name}`}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = "/default.jpg";
                }}
                alt=""
              />
            </div>
            <div className="searchedItemInfoContainer">
              <div className="searchedItemInfoName">{result.itemName}</div>
              <div className="searchedItemInfoSecondColumn">
                <div className="searchedItemInfoPrice">${result.itemPrice}</div>
                <div className="searchedItemInfoSecondColumn_Right">
                  <div className="searchedItemInfoUserName">
                    @{result.seller}
                  </div>
                  <div className="searchedItemInfoVisitCount">
                    {result.visitCount} visit
                  </div>
                  <div className="searchedItemInfoPostTime">
                    {`${moment(result.postTime).fromNow()}...`}
                  </div>
                </div>
              </div>
              <div className="searchedItemInfoDescription">
                {result.description}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
