import React, { useRef, useState, useEffect } from "react";
import "./Payment.scss";
import Navbar from "../../components/Navbar/Navbar";
import LoadingButton from "@mui/lab/LoadingButton";
import Footer from "../../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { dataUser } from "../../Redux/MyAccount/MyAccountSlice";

const Payment = () => {
  const [data, setData] = useState([]);
  const [warehouse, setWarehouse] = useState(0);
  const [Amount, setAmount] = useState(1);
  const [colorOption, setColorOption] = useState([]);
  const [sizeOption, setSizeOption] = useState([]);
  const [image, setImage] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [Address, setAddress] = useState("");
  const [NumberPhone, setNumberPhone] = useState(0);
  const [ship, setShip] = useState(30000);
  const [Check, setCheck] = useState(false);
  const address = document.getElementById("address");
  const numberPhone = document.getElementById("numberPhone");
  const DataUser = JSON.parse(localStorage.getItem("DataUser"));
  const refColor = useRef([]);
  const refSize = useRef([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigation = useNavigate();
  const ProductID = location.pathname.split("/")[3];
  var totalOrder = Amount * data.price + ship;

  var objDataOrder = [];

  var a = false,
    b = false,
    c = false;

  const handlePayment = () => {
    var min = 100000;
    var max = 999999;
    var rand = parseInt(min + Math.random() * (max - min));
    let objOrder = {
      codeOrders: rand,
      ProductID: ProductID,
      NameProduct: data.NameProduct,
      Image: image[0],
      price: data.price,
      Size: size,
      Email: DataUser.email,
      Warehouse: warehouse,
      Color: color,
      Amount: Amount,
      Total: totalOrder,
      NameUser: DataUser.username,
      AccountUSer: DataUser._id,
    };
    var dataOrder = JSON.stringify(objOrder);
    objDataOrder.push(dataOrder);
    localStorage.setItem("dataOrder", objDataOrder);
    getLinkPayment(rand, totalOrder);
    handleUpdateAddressAndPhone(2);
  };

  const getLinkPayment = (orderId, amount) => {
    axios
      .post("http://localhost:8000/api/pay/create_url", {
        orderId: orderId,
        amount: amount,
      })
      .then(function (response) {
        window.location.href = response.data.url;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOnClickButtonGetInformation = () => {
    checkOption();
    if (a === true && b === true && c === true) {
      setCheck(true);
      toast.success("Đủ thông tin !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      document.getElementById("tablePayment").style.height = "570px";
      setTimeout(() => {
        setCheck(false);
      }, 2000);
    }
  };

  const checkOption = () => {
    if (Amount === "" || size === "" || color === "") {
      toast.error("Vui lòng chọn đầy đủ : (Màu) , (Kích Cở) !!!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      checkInput();
      a = true;
    }
  };

  const checkInput = () => {
    if (Address === "") {
      setErrorFor(address, "Address cannot be blank ");
    } else {
      setSuccessFor(address);
      b = true;
    }

    if (NumberPhone === "") {
      setErrorFor(numberPhone, "Number Phone cannot be blank ");
    } else {
      setSuccessFor(numberPhone);
      c = true;
    }
  };

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  };

  const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  };

  const handleCheckColor = (item, indexOption) => {
    refColor.current.forEach((e, index) => {
      if (index === indexOption) {
        refColor.current[index].classList.add("accept");
      } else {
        refColor.current[index].classList.remove("accept");
      }
    });
  };

  const handleCheckSize = (item, indexOption) => {
    refSize.current.forEach((e, index) => {
      if (index === indexOption) {
        refSize.current[index].classList.add("accept");
      } else {
        refSize.current[index].classList.remove("accept");
      }
    });
  };

  const handleUpdateAddressAndPhone = (number) => {
    if (number === 1) {
      axios
        .put(`http://localhost:8000/api/user/${DataUser._id}`, {
          address: Address,
          numberPhone: NumberPhone,
        })
        .then(function (response) {
          toast.success("Đã cập nhật địa chỉ và số điện thoại cho bạn !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.log(response.data.data);
          dispatch(dataUser(response.data.data));
        })
        .catch(function (error) {
          toast.error(
            "Không cập nhật được địa chỉ và số điện thoại cho bạn ! ",
            {
              position: toast.POSITION.BOTTOM_LEFT,
            }
          );
        });
    } else {
      axios
        .put(`http://localhost:8000/api/user/${DataUser._id}`, {
          address: Address,
          numberPhone: NumberPhone,
        })
        .then(function (response) {})
        .catch(function (error) {});
    }
  };

  const handleOrder = () => {
    if (Address === "" || NumberPhone === "") {
      toast.error("Vui lòng nhập địa chỉ và số điện thoại !!!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      var min = 1000;
      var max = 9000;
      var rand = parseInt(min + Math.random() * (max - min));
      axios
        .post("http://localhost:8000/api/History/addToHistory", {
          codeOrders: rand,
          ProductID: ProductID,
          NameProduct: data.NameProduct,
          Email: DataUser.email,
          Image: image[0],
          price: data.price,
          Size: size,
          Color: color,
          Amount: Amount,
          Total: totalOrder,
          Story: "Chờ xác nhận",
          NameUser: DataUser.username,
          AccountUSer: DataUser._id,
        })
        .then(function (response) {
          toast.success("Đặt hàng thành công !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          // setTimeout(() => {
          //   navigation("/home");
          // }, 2000);

          if (DataUser.address === "" && DataUser.numberPhone === "") {
            handleUpdateAddressAndPhone(1);
          }
        })
        .catch(function (error) {
          toast.error("Lỗi mất rồi, làm lại nha 😉", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.log(error);
        });
    }
  };

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/api/product/${ProductID}`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setWarehouse(response.data.warehouse);
        setColorOption(response.data.Color);
        setSizeOption(response.data.Size);
        setImage(response.data.image);
        if (Address !== "" && NumberPhone !== "") {
          setSuccessFor(address);
          setSuccessFor(numberPhone);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
    setAddress(DataUser.address);
    setNumberPhone(DataUser.numberPhone);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_payment">
        <div className="container_payment_top">
          <div className="container_payment_top_content">
            <div className="container_payment_top_content_img">
              <img src={image[0]} alt="" />
            </div>

            <div className="container_payment_top_content_option">
              <p>{data.NameProduct}</p>
              <hr />
              <table>
                <tbody>
                  <tr>
                    <td>Số lượng : </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={Amount}
                        onClick={() => {
                          if (Amount >= 3) {
                            setShip(0);
                          } else if (Amount <= 2) {
                            setShip(30000);
                          }
                        }}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Màu : </td>
                    <td>
                      {colorOption.map((item, index) => (
                        <span
                          ref={(e) => {
                            refColor.current[index] = e;
                          }}
                          key={index}
                          onClick={() => {
                            setColor(item);
                            handleCheckColor(item, index);
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Kích cở: </td>
                    <td>
                      {sizeOption.map((item, index) => (
                        <span
                          ref={(e) => {
                            refSize.current[index] = e;
                          }}
                          key={index}
                          onClick={() => {
                            setSize(item);
                            handleCheckSize(item, index);
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Giá sản phẩm: </td>
                    <td style={{ color: "#d63031", fontWeight: "500" }}>
                      {data.price}₫
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="container_payment_top_content_choose">
                <img
                  style={{ Width: "100%" }}
                  src="https://martina.vn/wp-content/uploads/2020/07/thiet-ke-ao-dong-phuc-02.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="container_payment_body">
          <div className="container_payment_body_input">
            <div className="container_payment_body_input_information">
              <form id="form" className="form">
                <div className="form-control">
                  <label>Tên Khách Hàng</label>
                  <p>{DataUser.username}</p>
                </div>
                <div className="form-control">
                  <label>Email</label>
                  <p>{DataUser.email}</p>
                </div>
                <div className="form-control">
                  <label>Địa Chỉ</label>
                  <input
                    type="address"
                    placeholder="221 Hà Huy Tưởng"
                    id="address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                </div>
                <div className="form-control">
                  <label>Số Điện Thoại</label>
                  <input
                    type="tel"
                    placeholder="0510123456"
                    id="numberPhone"
                    value={NumberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                </div>
              </form>
              <LoadingButton
                className="buttonCheck"
                onClick={handleOnClickButtonGetInformation}
                loading={Check}
                variant="outlined"
              >
                Submit
              </LoadingButton>
            </div>
          </div>
          <div className="container_payment_body_order">
            <div className="container_payment_body_order_information">
              <div className="container_payment_body_order_information_text">
                <span>Chi Tiết Đơn Hàng Của Bạn</span>
              </div>
              <div
                id="tablePayment"
                className="container_payment_body_order_information_table"
              >
                <table>
                  <tbody>
                    <tr>
                      <th>THÔNG TIN</th>
                      <th>CHI TIẾT</th>
                    </tr>
                    <tr>
                      <td>Tên Khách hàng</td>
                      <td>{DataUser.username}</td>
                    </tr>
                    <tr>
                      <td>Địa chỉ</td>
                      <td>{Address}</td>
                    </tr>
                    <tr>
                      <td>Số điện thoại</td>
                      <td>{NumberPhone}</td>
                    </tr>
                    <tr>
                      <td>Tên Sản phẩm</td>
                      <td>{data.NameProduct}</td>
                    </tr>
                    <tr>
                      <td>Số lượng </td>
                      <td>{Amount}</td>
                    </tr>
                    <tr>
                      <td>màu</td>
                      <td>{color}</td>
                    </tr>
                    <tr>
                      <td>Size</td>
                      <td>{size}</td>
                    </tr>
                    <tr>
                      <td>giá sản phẩm</td>
                      <td style={{ color: "#d63031", fontWeight: "500" }}>
                        {data.price}₫
                      </td>
                    </tr>
                    <tr>
                      <td>Tiền vận chuyển</td>
                      <td style={{ color: "#d63031", fontWeight: "500" }}>
                        {ship}₫
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "700" }}>
                        Tổng Tiền thanh toán
                      </td>
                      <td style={{ color: "#e84118", fontWeight: "600" }}>
                        {totalOrder}₫
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="pay1" onClick={handleOrder}>
                          Thanh toán khi nhận hàng
                        </button>
                      </td>
                      <td>
                        <button className="pay2" onClick={handlePayment}>
                          Thanh toán bằng VNPAY
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
      <Footer />
    </div>
  );
};

export default Payment;
