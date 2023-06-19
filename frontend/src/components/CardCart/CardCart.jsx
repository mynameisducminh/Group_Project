import React from "react";
import "./CardCart.scss";

const CardCart = () => {

  return (
    <div>
      <div className="cardCart-container">
        <div className="cardCart-img">
          <img
            src="https://product.hstatic.net/200000260587/product/b6cab97b491cbc42e50d_6d85a7f0498b4442832b5c0e3789bec0_grande.jpg"
            alt=""
          />
        </div>

        <div className="cardCart-detail">
          <p>Name: áo</p>
          <p>Color: Blue</p>
          <p>Size: L</p>
        </div>

        <div className="cardCart-price">
          <p>Price</p>
          <p>100.000 VNĐ</p>
        </div>

        <div className="cardCart-input">
          <p>Quantity</p>
          <input type="number" />
        </div>

        <div className="cardCart-total">
          <p>Total</p>
          <p>100.000 VNĐ</p>
        </div>

        <div className="cardCart-icon">
          <i class="fa-sharp fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default CardCart;
