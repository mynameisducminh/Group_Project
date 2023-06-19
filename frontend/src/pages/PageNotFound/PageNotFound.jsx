import React from "react";
import "./PageNotFound.scss";
import logo from  "./image/anh1.png";
import Navbar from "../../components/Navbar/Navbar";

const PageNotFound = () => {
  return (
    <div>
      <Navbar/>
      <div className="PageNotFound-container">
        <div className="PageNotFound-img">
          <img src={logo} alt="" />
          <p>4O4</p>
        </div>

        <div className="PageNotFound-title">
          <h2>Page Not Found</h2>
        </div>

        <div className="PageNotFound-text">
          <p>We're sorry, the page you requested could not be found</p>
          <p>Please go back to the home page</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
