import React, { useEffect, useState, CSSProperties } from "react";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import "./OrderManagement.scss";
import Pagination from "@mui/material/Pagination";
import { ToastContainer, toast } from "react-toastify";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";

const OrderManagement = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [Story, setStory] = useState("");
  const [pageNumber, setpageNumber] = useState(1);
  const [check, setCheck] = useState(1);

  const handleChangePageNumer = (event, value) => {
    setpageNumber(value);
    if (check === 1) {
      handleAllHistory(value);
      setpageNumber(value);
    } else if (check === 2) {
      setpageNumber(value);
      handleWaitAccept(value);
    } else if (check === 3) {
      setpageNumber(value);
      handleCancel(value);
    } else if (check === 4) {
      setpageNumber(value);
      handlePayHistory(value);
    } else if (check === 5) {
      setpageNumber(value);
      handleShipComplete(value);
    } else if (check === 6) {
      setpageNumber(value);
      handleAccepted(value);
    }
  };

  const handleAllHistory = (number) => {
    setLoading(true);
    setpageNumber(number);
    setCheck(1);
    setStory("");
    let url = `http://localhost:8000/api/History/allHistory?storyOrder=&pageNumber=${number}`;
    fetchData(url);
  };

  const handleWaitAccept = (e) => {
    setLoading(true);
    setpageNumber(e);
    setCheck(2);
    setStory("Chờ xác nhận");
    let story = "Chờ xác nhận";
    let url = `http://localhost:8000/api/History/allHistory?storyOrder=${story}&pageNumber=${e}`;
    fetchData(url);
  };

  const handleCancel = (e) => {
    setLoading(true);
    setpageNumber(1);
    setCheck(3);
    setStory("Đã hủy đơn hàng");
    let story = "Đã hủy đơn hàng";
    let url = `http://localhost:8000/api/History/allHistory?storyOrder=${story}&pageNumber=${e}`;
    fetchData(url);
  };

  const handlePayHistory = (e) => {
    setLoading(true);
    setpageNumber(1);
    setCheck(4);
    setStory("Đã Thanh Toán");
    let story = "Đã Thanh Toán";
    let url = `http://localhost:8000/api/History/allHistory?storyOrder=${story}&pageNumber=${e}`;
    fetchData(url);
  };

  const handleShipComplete = (e) => {
    setLoading(true);
    setpageNumber(1);
    setCheck(5);
    setStory("Giao hàng thành công");
    let story = "Giao hàng thành công";
    let url = `http://localhost:8000/api/History/allHistory?storyOrder=${story}&pageNumber=${e}`;
    fetchData(url);
  };

  const handleAccepted = (e) => {
    setLoading(true);
    setpageNumber(1);
    setCheck(6);
    setStory("Đã xác nhận");
    let story = "Đã xác nhận";
    let url = `http://localhost:8000/api/History/allHistory?storyOrder=${story}&pageNumber=${e}`;
    fetchData(url);
  };

  const handleSendEmail = (email) => {
    axios
      .post("http://localhost:8000/api/mail/send-email", {
        email: email,
        status: "confirm",
      })
      .then(function (response) {
        toast.success("Gửi thông báo thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch(function (error) {
        toast.error("Không gửi được thông báo !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.log(error);
      });
  };

  const handleAcceptOrder = (id) => {
    axios
      .put(`http://localhost:8000/api/History/${id}`, {
        Story: "Đã xác nhận",
      })
      .then(function (response) {
        toast.success("Xác nhận thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        fetchData(
          `http://localhost:8000/api/History/allHistory?storyOrder=${Story}&pageNumber=${pageNumber}`
        );
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Lỗi", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const handleCancelOrder = (e) => {
    axios
      .put(`http://localhost:8000/api/History/${e}`, {
        Story: "Đã hủy đơn hàng",
      })
      .then(function (response) {
        toast.success("Đã hủy đơn hàng thành công !", {
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

  const handleGetWarehouse = (id, amount) => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then(function (response) {
        axios
          .put(`http://localhost:8000/api/product/${id}`, {
            warehouse: response.data.warehouse - amount,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchData = (url) => {
    axios
      .get(url)
      .then(function (response) {
        setLoading(false);
        setData(response.data.data);
        setTotal(response.data.total);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let url = `http://localhost:8000/api/History/allHistory?storyOrder=&pageNumber=${pageNumber}`;
    fetchData(url);
  }, []);

  return (
    <div>
      <div className="container_OrderManagement">
        <div className="container_OrderManagement_menu">
          <MenuAdmin />
        </div>
        <div className="container_OrderManagement_body">
          <div className="container_OrderManagement_body_search">
            <p>Quản lý đơn hàng</p>
          </div>
          <div className="container_OrderManagement_body_main">
            <PuffLoader
              color="#00a78e"
              className="PuffLoader"
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {loading === false && (
              <div className="container_OrderManagement_body_main_Order">
                <div className="container_OrderManagement_body_main_button">
                  <button
                    className="OrderManagement_btn1"
                    style={{
                      backgroundColor: check === 1 && "#b2bec3",
                      color: check === 1 && "#fff",
                    }}
                    onClick={handleAllHistory}
                  >
                    ALL
                  </button>
                  <button
                    className="OrderManagement_btn2"
                    style={{
                      backgroundColor: check === 2 && "#2ecc71",
                      color: check === 2 && "#fff",
                    }}
                    onClick={handleWaitAccept}
                  >
                    Chờ Xác Nhận
                  </button>
                  <button
                    className="OrderManagement_btn6"
                    style={{
                      backgroundColor: check === 6 && "#27ae60",
                      color: check === 6 && "#fff",
                    }}
                    onClick={handleAccepted}
                  >
                    Đã Xác Nhận
                  </button>
                  <button
                    className="OrderManagement_btn3"
                    style={{
                      backgroundColor: check === 3 && "#c0392b",
                      color: check === 3 && "#fff",
                    }}
                    onClick={handleCancel}
                  >
                    Đã Hủy
                  </button>
                  <button
                    className="OrderManagement_btn4"
                    style={{
                      backgroundColor: check === 4 && "#0984e3",
                      color: check === 4 && "#fff",
                    }}
                    onClick={handlePayHistory}
                  >
                    Đã Thanh Toán
                  </button>
                  <button
                    className="OrderManagement_btn5"
                    style={{
                      backgroundColor: check === 5 && "#27ae60",
                      color: check === 5 && "#fff",
                    }}
                    onClick={handleShipComplete}
                  >
                    Đã Giao Thành Công
                  </button>
                </div>
                <div className="container_OrderManagement_body_main_table">
                  <table>
                    <tbody>
                      <tr>
                        <th>Mã Đơn Hàng</th>
                        <th>Tên Tài Khoản</th>
                        <th>Email</th>
                        <th>Tên Sản Phẩm</th>
                        <th>Hình Ảnh</th>
                        <th>Màu</th>
                        <th>Kích Cở</th>
                        <th>Số Lượng</th>
                        <th>Giá Sản Phẩm</th>
                        <th>Tổng Tiền </th>
                        <th>Trạng Thái </th>
                        <th>Chức Năng </th>
                      </tr>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.codeOrders}</td>
                          <td>{item.NameUser}</td>
                          <td>{item.Email}</td>
                          <td>{item.NameProduct}</td>
                          <td>
                            <img src={item.Image} alt="" />
                          </td>
                          <td>{item.Color}</td>
                          <td>{item.Size}</td>
                          <td>{item.Amount}</td>
                          <td style={{ color: "#d63031" }}>{item.price}₫</td>
                          <td style={{ color: "#d63031" }}>{item.Total}₫</td>
                          <td>
                            {item.Story === "Chờ xác nhận" && (
                              <span style={{ color: "#2ecc71" }}>
                                {item.Story}
                              </span>
                            )}
                            {item.Story === "Đã xác nhận" && (
                              <span style={{ color: "#27ae60" }}>
                                {item.Story}
                              </span>
                            )}
                            {item.Story === "Đã hủy đơn hàng" && (
                              <span style={{ color: "#d63031" }}>
                                {item.Story}
                              </span>
                            )}
                            {item.Story === "Đã Thanh Toán" && (
                              <span style={{ color: "#3498db" }}>
                                {item.Story}
                              </span>
                            )}
                            {item.Story === "Giao hàng thành công" && (
                              <span style={{ color: "#00b894" }}>
                                {item.Story}
                              </span>
                            )}
                            {item.Story === "Đã đánh giá sản phẩm" && (
                              <span style={{ color: "#f39c12" }}>
                                {item.Story}
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="button_OrderManagement">
                              {item.Story === "Chờ xác nhận" ? (
                                <div>
                                  <button
                                    className="accept_order"
                                    onClick={() => {
                                      handleAcceptOrder(item._id);
                                      handleSendEmail(item.Email);
                                      handleGetWarehouse(
                                        item.ProductID,
                                        item.Amount
                                      );
                                    }}
                                  >
                                    <i className="bx bx-check-double"></i> Xác
                                    nhận
                                  </button>
                                  <br />
                                  <button
                                    className="cancel_order"
                                    onClick={() => {
                                      handleCancelOrder(item._id);
                                    }}
                                  >
                                    <i className="bx bx-x"></i> Xóa
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="Complete_order"
                                  style={{ border: "none" }}
                                >
                                  <i className="bx bx-check-double"></i> Xong
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="container_OrderManagement_body_main_pagination">
                  <Pagination
                    count={Math.floor(total / 4 + 1)}
                    variant="outlined"
                    shape="rounded"
                    page={pageNumber}
                    onChange={handleChangePageNumer}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default OrderManagement;
