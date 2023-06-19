import React from "react";
import "./Sizecheck.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import anh1 from "./img/anh1.png";
import anh2 from "./img/anh2.png";
import anh3 from "./img/anh3.png";
import anh4 from "./img/anh4.png";
import anh5 from "./img/anh5.png";

const Sizecheck = () => {
  return (
    <div>
      <Navbar />
      <div className="sizecheck-container">
        <div className="sizecheck-left"></div>
        <div className="sizecheck-content">
          {" "}
          <div className="sizecheck-title">
            <h2>SIZE CHECK</h2>
          </div>
          <div className="sizecheck-images">
            <div className="sizecheck-images-image">
              <img src={anh1} alt="" />
            </div>
            <div className="sizecheck-images-image">
              <img src={anh2} alt="" />
            </div>
            <div className="sizecheck-images-image">
              <img src={anh3} alt="" />
            </div>
            <div className="sizecheck-images-image">
              <img src={anh4} alt="" />
            </div>
            <div className="sizecheck-images-image">
              <img src={anh5} alt="" />
            </div>
          </div>
        </div>
        <div className="sizecheck-right"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Sizecheck;
