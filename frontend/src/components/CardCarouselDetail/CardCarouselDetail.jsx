import React from "react";
import "./CardCarouselDetail.scss";
import { useNavigate } from "react-router-dom";

const CardCarouselDetail = ({ dataNewCardCarousel }) => {
  const navigation = useNavigate();

  const movePageDetail = (e) => {
    navigation(`/productDetail/${e}`);
    window.location.reload()
  };
  return (
    <div>
      <div
        className="container_CardCarouselDetail"
        onClick={() => {
          movePageDetail(dataNewCardCarousel._id);
        }}
      >
        <div className="container_CardCarouselDetail_img">
          <img src={dataNewCardCarousel.image[1]} alt="" />
        </div>
        <div className="container_CardCarouselDetail_name">
          <p>{dataNewCardCarousel.NameProduct}</p>
          <i>180.000₫ </i> <span>{dataNewCardCarousel.price}₫</span>
        </div>
      </div>
    </div>
  );
};

export default CardCarouselDetail;
