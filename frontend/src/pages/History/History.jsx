import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./History.scss";
import Navbar from "../../components/Navbar/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Rating from "@mui/material/Rating";
import axios from "axios";

const History = () => {
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(3);
  const [content, setContent] = useState("");
  const [prodctID, setProdctID] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [show, setShow] = useState(false);
  const DataUser = JSON.parse(localStorage.getItem("DataUser"));
  var today = new Date();
  var timenow =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var datenow =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancleOrder = (e) => {
    axios
      .put(`http://localhost:8000/api/History/${e}`, {
        Story: "Đã hủy đơn hàng",
      })
      .then(function (response) {
        toast.success(" !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const handleShipMent = (e) => {
    axios
      .put(`http://localhost:8000/api/History/${e}`, {
        Story: "Giao hàng thành công",
      })
      .then(function (response) {
        toast.success("Chúc mừng bạn đã nhận được hàng !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const pushPaymentManager = (item) => {
    axios
      .post("http://localhost:8000/api/TotalOrder/OrderConsolidation", {
        NameAccount: item.NameUser,
        NameProduct: item.NameProduct,
        price: item.price,
        size: item.Size,
        TypeOfPayment: "Thanh Toán Khi Nhận Hàng",
        color: item.Color,
        Amount: item.Amount,
        total: item.Total,
        dateTime: datenow + " " + timenow,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmitEvaluate = () => {
    axios
      .post(`http://localhost:8000/api/comment/add-comment`, {
        nameUser: DataUser.username,
        content: content,
        rating: rating,
        color: color,
        size: size,
        datetime: datenow + " " + timenow,
        ProductID: prodctID,
      })
      .then(function (response) {
        toast.success("Cảm ơn bạn đã đánh giá !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        fetchData();
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
        handleClose();
        toast.error("Lỗi", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/api/user/${DataUser._id}`)
      .then(function (response) {
        setData(response.data.history);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_history_user">
        <div className="container_history_user_card">
          <div className="container_history_user_card_text">
            <h6>Thông tin khách hàng</h6>
          </div>
          <div className="container_card">
            <div className="container_history_user_card_img">
              <img
                src="https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg"
                alt=""
              />
            </div>
            <div className="container_history_user_card_img_text">
              <div className="container_history_user_card_img_text_name">
                <p>{DataUser.username}</p>
                <p>{DataUser.admin === false && <span>user</span>}</p>
              </div>
              <div className="container_history_user_card_information">
                <div className="container_history_user_card_information_text">
                  <b>Email:</b>
                  <i>{DataUser.email}</i>
                </div>
                <div className="container_history_user_card_information_text">
                  <b>số điện thoại:</b>
                  <i>{DataUser.numberPhone}</i>
                </div>
                <div className="container_history_user_card_information_text">
                  <b>Địa chỉ:</b>
                  <i>{DataUser.address}</i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container_history_user_right">
          <div className="container_history_text">
            <h4>Lịch Sử Mua Hàng</h4>
          </div>
          <div className="container_history_user_right_table">
            <table>
              <tbody>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Size</th>
                  <th>Màu</th>
                  <th>Giá bán</th>
                  <th>Tổng tiền</th>
                  <th>Tình trạng</th>
                  <th>Chức năng</th>
                </tr>

                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.codeOrders}</td>
                    <td>{item.NameProduct} </td>
                    <td>{item.Amount}</td>
                    <td>{item.Size}</td>
                    <td>{item.Color}</td>
                    <td>{item.price}</td>
                    <td>{item.Total}</td>
                    <td>
                      {item.Story === "Chờ xác nhận" && (
                        <span style={{ color: "#2ecc71" }}>{item.Story}</span>
                      )}
                      {item.Story === "Đã xác nhận" && (
                        <span style={{ color: "#27ae60" }}>{item.Story}</span>
                      )}
                      {item.Story === "Đã hủy đơn hàng" && (
                        <span style={{ color: "#d63031" }}>{item.Story}</span>
                      )}
                      {item.Story === "Đã Thanh Toán" && (
                        <span style={{ color: "#3498db" }}>{item.Story}</span>
                      )}
                      {item.Story === "Giao hàng thành công" && (
                        <span style={{ color: "#00b894" }}>{item.Story}</span>
                      )}
                      {item.Story === "Đã đánh giá sản phẩm" && (
                        <span style={{ color: "#f39c12" }}>{item.Story}</span>
                      )}
                    </td>
                    <td>
                      {item.Story === "Chờ xác nhận" && (
                        <button
                          className="cancle"
                          onClick={() => {
                            handleCancleOrder(item._id);
                          }}
                        >
                          <i className="bx bx-low-vision"></i>{" "}
                          <span>Hủy đơn hàng</span>
                        </button>
                      )}
                      {item.Story === "Đã xác nhận" && (
                        <button
                          className="CheckOrder"
                          onClick={() => {
                            pushPaymentManager(item);
                            handleShipMent(item._id);
                          }}
                        >
                          <i className="bx bx-check"></i>{" "}
                          <span>Đã nhận được hàng</span>
                        </button>
                      )}
                      {item.Story === "Đã Thanh Toán" && (
                        <button
                          className="CheckOrder"
                          onClick={() => {
                            handleShipMent(item._id);
                          }}
                        >
                          <i className="bx bx-check"></i>{" "}
                          <span>Đã nhận được hàng</span>
                        </button>
                      )}
                      {item.Story === "Giao hàng thành công" && (
                        <button
                          className="DanhGia"
                          onClick={() => {
                            handleShow();
                            setContent("");
                            setSize(item.Size);
                            setColor(item.Color);
                            setProdctID(item.ProductID);
                          }}
                        >
                          <i className="bx bx-star"></i>
                          <span>Đánh giá</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đánh Giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số sao : </Form.Label>
              <Rating
                name="simple-controlled"
                style={{
                  fontSize: "10px important",
                  transform: "translateY(6px)",
                  marginLeft: "5px",
                }}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitEvaluate}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default History;
