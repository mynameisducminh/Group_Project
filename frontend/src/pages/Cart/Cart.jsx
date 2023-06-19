import React, { useEffect, useState } from "react";
import "./Cart.scss";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const [data, setData] = useState([]);
  const DataUser = JSON.parse(localStorage.getItem("DataUser"));
  const navigate = useNavigate();
  const handleMoveBuy = (e) => {
    navigate(`/productDetail/payment/${e}`);
  };

  const handleMoveDetail = (e) => {
    navigate(`/productDetail/${e}`);
  };

  const handleDeleteCart = async (e) => {
    await axios
      .delete(`http://localhost:8000/api/cart/${e}`)
      .then(function (response) {
        toast.success("Xóa sản phẩm thành công ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Xóa sản phẩm thất bại", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
    await fetchData();
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/api/user/${DataUser._id}`)
      .then(function (response) {
        setData(response.data.cart);
        console.log(response.data.cart);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container_cart_user">
        <div className="container_cart_user_card">
          <div className="container_cart_user_card_text">
            <h6>Thông tin khách hàng</h6>
          </div>
          <div className="container_card">
            <div className="container_cart_user_card_img">
              <img
                src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
                alt=""
              />
            </div>
            <div className="container_cart_user_card_img_text">
              <div className="container_cart_user_card_img_text_name">
                <p>{DataUser.username}</p>
                <p>{DataUser.admin === false && <span>user</span>}</p>
              </div>
              <div className="container_cart_user_card_information">
                <div className="container_cart_user_card_information_text">
                  <b>Email:</b>
                  <i>{DataUser.email}</i>
                </div>
                <div className="container_cart_user_card_information_text">
                  <b>số điện thoại:</b>
                  <i>{DataUser.numberPhone}</i>
                </div>
                <div className="container_cart_user_card_information_text">
                  <b>Địa chỉ:</b>
                  <i>{DataUser.address}</i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container_cart_user_right">
          <div className="container_cart_text">
            <h4>Giỏ Hàng của bạn</h4>
          </div>
          <div className="container_cart_user_right_table">
            <table>
              <tbody>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>các Size</th>
                  <th>các Màu</th>
                  <th>Giá bán</th>
                  <th>Chức năng</th>
                </tr>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="cart_product">
                      <img src={item.Image} alt="" />
                    </td>
                    <td> {item.NameProduct}</td>
                    <td>
                      {item.Size.map((item, index) => (
                        <span key={index}>{item} </span>
                      ))}
                    </td>
                    <td>
                      {item.Color.map((item, index) => (
                        <span key={index}> {item} </span>
                      ))}
                    </td>
                    <td style={{ color: "#d63031", fontWeight: "600" }}>
                      {item.price}
                    </td>
                    <td className="cart_btn">
                      <button
                        onClick={() => {
                          handleMoveDetail(item.ProductID);
                        }}
                      >
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => {
                          handleMoveBuy(item.ProductID);
                        }}
                      >
                        Mua ngay
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteCart(item._id);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Cart;
