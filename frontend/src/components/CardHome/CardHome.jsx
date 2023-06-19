import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardHome.scss";

const CardHome = ({ datacard }) => {
  const navigation = useNavigate();

  const movePageDetail = (e) => {
    navigation(`/productDetail/${e}`);
  };

  return (
    <div>
      <div
        className="container_card"
        onClick={() => {
          movePageDetail(datacard._id);
          console.log("jshdjakh", datacard._id);
        }}
      >
        <div className="container_card_img">
          <img src={datacard.image[0]} alt="" />
        </div>
        <div className="container_card_arrow-up">
          <p>{datacard.story}</p>
        </div>{" "}
        <div className="container_card_name">
          <p>{datacard.NameProduct}</p>
          <i>180.000₫ </i> <span>{datacard.price}₫</span>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
