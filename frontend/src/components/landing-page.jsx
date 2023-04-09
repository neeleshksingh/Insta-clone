import React from "react";
import { Link } from "react-router-dom";
import "./app.css";
const LandingPage = () => {
  return (
    <div className="land">
      <div>
        <img className="land-img" src={require("./Images/1.png")} alt="land" />
      </div>
      <div className="enter-div">
        <h1 className="head">Instagram Clone App</h1>
        <Link to="/postview">
          <button className="enter">Enter</button>
        </Link>
      </div>
    </div>
  );
};
export default LandingPage;
