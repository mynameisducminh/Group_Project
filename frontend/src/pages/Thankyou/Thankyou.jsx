import React, { useState, useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Thankyou.scss";

const Thankyou = () => {
  const [loading, setLoading] = useState(false);
  const dataOrder = JSON.parse(localStorage.getItem("dataOrder"));
  const user = JSON.parse(localStorage.getItem("dataUser"));
  const checkPayment = window.location.href.split("&")[1];
  const SumWarehouse = dataOrder.Warehouse - dataOrder.Amount;

  var today = new Date();

  var timenow =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var datenow =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const handleBackHome = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "http://localhost:3000/home";
    }, 3000);
  };

  const handleSendEmail = () => {
    axios
      .post("http://localhost:8000/api/mail/send-email", {
        email: user.email,
        status: "payment",
      })
      .then(function (response) {
        toast.success("Thông báo được gửi về email của bạn !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const SetWarehouseAPIProduct = () => {
    axios
      .put(`http://localhost:8000/api/product/${dataOrder.ProductID}`, {
        warehouse: SumWarehouse,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const pushPaymentManager = () => {
    axios
      .post("http://localhost:8000/api/TotalOrder/OrderConsolidation", {
        NameAccount: dataOrder.NameUser,
        NameProduct: dataOrder.NameProduct,
        price: dataOrder.price,
        size: dataOrder.Size,
        TypeOfPayment: "Thanh Toán Qua Ngân Hàng",
        color: dataOrder.Color,
        Amount: dataOrder.Amount,
        total: dataOrder.Total,
        dateTime: datenow + " " + timenow,
      })
      .then(function (response) {
        // localStorage.removeItem("dataOrder");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddHistoryUser = () => {
    axios
      .post("http://localhost:8000/api/History/addToHistory", {
        codeOrders: dataOrder.codeOrders,
        ProductID: dataOrder.ProductID,
        NameProduct: dataOrder.NameProduct,
        Image: dataOrder.Image,
        price: dataOrder.price,
        Email: dataOrder.Email,
        Size: dataOrder.Size,
        Color: dataOrder.Color,
        Amount: dataOrder.Amount,
        Total: dataOrder.Total,
        Story: "Đã Thanh Toán",
        NameUser: dataOrder.NameUser,
        AccountUSer: dataOrder.AccountUSer,
      })
      .then(function (response) {
        toast.success("Đặt hàng thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        pushPaymentManager();
        SetWarehouseAPIProduct();
        handleSendEmail();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleData = () => {
    if (checkPayment === "vnp_BankCode=NCB") {
      handleAddHistoryUser();
    } else {
      toast.error("Đặt hàng thất bại !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div>
      <div className="container_thankyou">
        {loading === true && (
          <div className="container_thankyou_loading">
            <RingLoader
              color="#36d7b7"
              loading={loading}
              size={160}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}

        <div className="container_thankyou_intro">
          <div className="container_thankyou_intro_1">
            <div className="container_thankyou_intro_1_contact">
              <span>
                <i className="bx bx-envelope"></i>
                <span>maflineclothing@gmail.com</span>
              </span>
              <span>
                <i className="bx bx-phone"></i>
                <span>0386762927</span>
              </span>
            </div>
            <div className="container_thankyou_intro_1_contact">
              <span>
                <i className="bx bxl-github"></i>
              </span>
              <span>
                <i className="bx bxl-facebook"></i>
              </span>
              <span>
                <i className="bx bxl-instagram"></i>
              </span>
              <span>
                <i className="bx bxl-skype"></i>
              </span>
            </div>
          </div>
        </div>

        {checkPayment === "vnp_BankCode=NCB" ? (
          <div className="container_thankyou_box_successfully">
            <div className="container_thankyou_box_successfully_icon">
              <i className="fa-sharp fa-solid fa-circle-check"></i>
              <p>Thanh toán thành công! </p>
            </div>
            <div className="container_thankyou_box_successfully_text">
              <span>
                Đơn hàng của bạn đã được thanh toán thành công! Đơn hàng sẻ được
                giao tới bạn trong 3 - 5 ngày từ lúc đặt hàng ! <b>MAFLINE</b>{" "}
                cảm ơn bạn đã sử dụng dịch vụ của chung tôi 😉
              </span>
            </div>
            <button onClick={handleBackHome}>về lại trang chủ</button>
          </div>
        ) : (
          <div className="container_thankyou_box_failure">
            <div className="container_thankyou_box_failure_icon">
              <i className="fa-solid fa-circle-xmark"></i>
              <p>Thanh toán không thành công! </p>
            </div>
            <div className="container_thankyou_box_failure_text">
              <span>
                Đơn hàng của bạn đã Được hủy thành công ! <b>MAFLINE</b> cảm ơn
                bạn đã sử dụng dịch vụ của chung tôi 😉
              </span>
            </div>
            <button onClick={handleBackHome}>về lại trang chủ</button>
          </div>
        )}
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Thankyou;
