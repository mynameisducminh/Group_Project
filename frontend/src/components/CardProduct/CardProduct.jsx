import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardProduct.scss";

const CardProduct = ({ dataProduct }) => {
  const navigation = useNavigate();

  const movePageDetail = (e) => {
    navigation(`/productDetail/${e}`);
  };

  return (
    <div>
      <div
        className="container_CardProduct"
        onClick={() => {
          movePageDetail(dataProduct._id);
          console.log(dataProduct);
        }}
      >
        <div className="container_CardProduct_img">
          <img src={dataProduct.image[0]} alt={dataProduct.image[0]} />
        </div>
        <div className="container_CardProduct_arrow-up">
          <p>{dataProduct.story}</p>
        </div>{" "}
        <div className="container_CardProduct_name">
          <p>{dataProduct.NameProduct}</p>
          <i>180.000₫ </i> <span>{dataProduct.price}₫</span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
