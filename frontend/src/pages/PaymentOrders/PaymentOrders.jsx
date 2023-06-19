import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./PaymentOrders.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const PaymentOrders = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [Name, setName] = useState("");
  const [mesage, setMesage] = useState("thanh toán");
  const [Check, setCheck] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigation = useNavigate();
  const location = useLocation();
  const dataOrder = JSON.parse(localStorage.getItem("dataOrder"));
  const ProductID = location.pathname.split("/")[4];
  const SumWarehouse = data.warehouse - dataOrder.Amount;

  const checkInput = () => {
    setCheck(1);
    setMesage("thanh toán");
    if (number === "" || date === "" || Name === "") {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      handleShow();
    }
  };

  const handleOpenModal = () => {
    axios
      .post("http://localhost:8000/api/History/addToHistory", {
        codeOrders: dataOrder.codeOrders,
        ProductID: dataOrder.ProductID,
        NameProduct: dataOrder.NameProduct,
        Image: dataOrder.Image,
        price: dataOrder.price,
        Size: dataOrder.Size,
        Color: dataOrder.Color,
        Amount: dataOrder.Amount,
        Total: dataOrder.Total,
        Story: "Đã Thanh Toán",
        NameUser: dataOrder.NameUser,
        AccountUSer: dataOrder.AccountUSer,
      })
      .then(function (response) {
        handleClose();
        toast.success("Đặt hàng thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        pushPaymentManager();
        SetWarehouseAPIProduct();
      })
      .catch(function (error) {
        toast.error("Lỗi mất rồi, làm lại nha 😉", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.log(error);
      });
  };

  const SetWarehouseAPIProduct = () => {
    axios
      .put(`http://localhost:8000/api/product/${ProductID}`, {
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
      .post("http://localhost:8000/api/TotalOrder/addToOrder", {
        NameAccount: dataOrder.NameUser,
        NameProduct: dataOrder.NameProduct,
        price: dataOrder.price,
        size: dataOrder.Size,
        color: dataOrder.Color,
        Amount: dataOrder.Amount,
        total: dataOrder.Total,
        dateTime: new Date(),
      })
      .then(function (response) {
        localStorage.removeItem("dataOrder");
        setTimeout(() => {
          navigation("/home");
        }, 2000);
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/api/product/${ProductID}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="paymentOrders-container">
      <div className="container_paymentOrders_intro">
        <div className="container_paymentOrders_intro_1">
          <div className="container_paymentOrders_intro_1_contact">
            <span>
              <i class="bx bx-envelope"></i>
              <span>maflineclothing@gmail.com</span>
            </span>
            <span>
              <i class="bx bx-phone"></i>
              <span>0386762927</span>
            </span>
          </div>
          <div className="container_paymentOrders_intro_1_contact">
            <span>
              <i class="bx bxl-github"></i>
            </span>
            <span>
              <i class="bx bxl-facebook"></i>
            </span>
            <span>
              <i class="bx bxl-instagram"></i>
            </span>
            <span>
              <i class="bx bxl-skype"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="logo">
        <div className="image">
          <img
            src="https://img.freepik.com/premium-vector/clothing-store-logo-design-inspiration-vector-illustration_500223-481.jpg"
            alt=""
          />
        </div>
        <div className="flag">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAACZCAMAAAAMwLadAAAAclBMVEXaJR3//wDztgrtkg7qhBD//QDvoQ3bKxz86gP65ATiURf53gT52gX2ywfdNxv99AHwqAziVxbhSxjsjg/41gXfQxn30Qb1xwjodRLumQ7cMxv++QHyrwvncBP98ALkYRXpgBHlZxT1wQjunQ3zugnmbBRmEZDwAAADBUlEQVR4nO3a6XaCQAwFYAd3tO47blX7/q9YkSrb6IASMqH3+23PyT3NYWCSWg0AAAAAAAAAAAAAAAAACtVuc1dQiu9v7gpKsd1yV1CG9n7/H7r2oNSBu4YSjJQacddQgo5SHe4a6I3V1Zi7CnItP2aLuwpyXT9m5bv21rPV79pzEPPMXQexbhCzy10HLVf9cbkrIbW+x1xzV0Kqd4/Z466E0kQ9TLhrIVQPY9a5ayHUD2P2uWuhM1fqP3TtNBpzyl0NmVk05oy7GiqxnlVqzl0PkWk8ZoO7HiKLeMwFdz00Biqhml3bSMasZtd+JWN+cVdEYdBMxmwOuGsicEymVOrIXROBZTrmkrum4qV7VmLXuo5B6gF0ewiZ/sq6uxS3q8vxma6F95wbp+iUlw13Jq3VsMiQnrVvD5OZufqs+hZ/drfXmufpW0Z2T7QPnSJC7q3fwhicPk+5lHCeNrzPQjaF3G26PXOW52w8LPU22/dTOnYelnq7/Xshh0fuyvOZa99hTRby7k3q+Y/Qlt2HpV7eI7QjdPkr3xEq4rDUy36ESjks9SZ9c0Jfz7rv53zarSwptxKfPXE741focMddYxGMD9xKrLaNzT0r5i32hbM5ZhVW2zLc+FVgtc01p6zCatvaHLIKq22ZPrHFr7ZNzBl9Ft9WZlI3R/SJfqOtxdbXXhG+2jY3J6xC107NAQOyV9s0QxWvoRspiV5t0/SsPwLSjZTkXXaF0j0bjIA0IyVrx3wZJNbXIiOg1H2Y4NW25Ppa9FYrdR8mt2vj62vJW63EfZjcro3dvKdHQPGRktjVttgqkG4EFBspyVsS+hNZX3s2AoqOlJ78xHrh+trzEVBkpCR0tS3s2ZcjoMdISWjX3nvWNAJ6HKGrcuoq2Cl9WOrdj9BTGVUVbePpDku94AhtSprH3638yrOOgIKRksSuvag8I6DbSOlCWQ+Na88Oc/13fvbKk9e1u9z7EtcjVN5ozHljX6LuEBRC6615gfwhAwAAAAAAAAAAAAAAAAAAAACADX4B/Swcmld280IAAAAASUVORK5CYII="
            alt=""
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/285px-Flag_of_the_United_States_%28Pantone%29.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="paymentOrders-main">
        <div className="paymentOrders-content">
          <p>
            Quý khách vui lòng không tắt trình duyệt cho đến khi nhận được kết
            quả giao dịch trên website. Xin cảm ơn!
          </p>
          <span style={{ fontSize: "25px", paddingTop: "10px" }}>
            Thanh toán qua ngân hàng NCB
          </span>
          <div>
            <span style={{ fontSize: "17px" }}>Thanh toán trực tuyến</span>
            <br />
            <span
              style={{ fontSize: "25px", fontWeight: "700", color: "#d63031" }}
            >
              {dataOrder.Total} VND
            </span>
          </div>
          <div className="paymentOrders-input">
            <input
              type="number"
              min={0}
              placeholder="Số thẻ"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Tên chủ thẻ"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label className="lable-text">
            Điều kiện sử dụng dịch vụ
            <i class="fa-solid fa-circle-question"></i>
          </label>
          <div className="paymentOrders-button">
            <button onClick={checkInput}>XÁC THỰC</button>
            <i>Hoặc</i>
            <button
              onClick={() => {
                setCheck(2);
                setMesage("hủy");
                handleShow();
              }}
            >
              HỦY
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÔNG BÁO</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn {mesage} không ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          {Check === 1 ? (
            <Button variant="primary" onClick={handleOpenModal}>
              Xác nhận
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                navigation("/home");
              }}
            >
              Xác nhận
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default PaymentOrders;
