import React from "react";
import "./Banner.scss";

function Banner({ name }) {
  return (
    <div className="banner">
      <div id="grad" className="grad">
        <div className="g1"></div>
        <h2>{name && name}</h2>
      </div>
    </div>
  );
}

export default Banner;
