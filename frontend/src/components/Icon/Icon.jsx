import React, { useState } from "react";
import "./Icon.scss";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PulseLoader from "react-spinners/PulseLoader";
import InfiniteCarousel from "react-leaf-carousel";
import DataSuggestion from "./DataSuggestion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AddDataChat } from "../../Redux/Chatbot/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { FullDataChat, DataMyAccount } from "../../Redux/Selectors";

const Icon = () => {
  const [chat, setChat] = useState("");
  const [pass, setPass] = useState("");
  const [passnew, setPassNew] = useState("");
  const [comfirmPassnew, setComfirmPassNew] = useState("");
  const [showupdatetb, setShowUpdateTB] = useState(false);
  const [showupdate, setShowUpdate] = useState(false);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkNumber, setCheckNumber] = useState(true);
  const [lgShow, setLgShow] = useState(false);
  const [show, setShow] = useState(false);

  const ListDataChat = useSelector(FullDataChat);
  const DataUser = JSON.parse(localStorage.getItem("DataUser"));

  const handleCloseUpdateTB = () => setShowUpdateTB(false);
  const handleShowUpdateTB = () => setShowUpdateTB(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const scrollbar = () => {
    var container_chat = document.querySelector(".container_chat");
    container_chat.scrollTop = container_chat.scrollHeight;
  };

  const handleCheckPassword = () => {
    axios
      .post("http://localhost:8000/api/pass/check-password", {
        username: DataUser.username,
        password: pass,
      })
      .then(function (response) {
        toast.success("Mật khẩu củ chính xác !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleClose();
        handleShowUpdate();
      })
      .catch(function (error) {
        toast.error("Sai mật khẩu củ !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const onPress_ENTER = (e) => {
    var keyPressed = e.keyCode || e.which;
    if (keyPressed === 13) {
      handleAddChat();
    } else {
      return false;
    }
  };

  function handleReset() {
    setPass("");
    setPassNew("");
    setComfirmPassNew("");
  }

  const handleClickAPIChatBox = async (item) => {
    setLoading(true);
    dispatch(
      AddDataChat({
        type: "client",
        message: item,
      })
    );
    setTimeout(() => {
      scrollbar();
    }, 100);

    setTimeout(() => {
      axios
        .post("http://localhost:8000/api/chat/chat-box", {
          userID: DataUser._id + "",
          message: item.toLocaleLowerCase(),
        })
        .then(function (response) {
          setTimeout(() => {
            scrollbar();
          }, 500);
          setLoading(false);
          dispatch(
            AddDataChat({
              type: response.data.type,
              message: response.data.message,
            })
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 1000);
  };

  const handleChatBoxPostAPI = () => {
    axios
      .post("http://localhost:8000/api/chat/chat-box", {
        userID: DataUser._id + "",
        message: chat.toLocaleLowerCase(),
      })
      .then(function (response) {
        setTimeout(() => {
          scrollbar();
        }, 500);
        setLoading(false);
        dispatch(
          AddDataChat({
            type: response.data.type,
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddChat = () => {
    if (chat.length > 100) {
      alert("Bạn nhập quá nhiều kí tự.");
    } else if (chat === "") {
      alert("Không được bỏ trống");
    } else {
      setChat("");
      setLoading(true);
      dispatch(
        AddDataChat({
          type: "client",
          message: chat,
        })
      );
      setTimeout(() => {
        scrollbar();
      }, 200);
      setTimeout(() => {
        handleChatBoxPostAPI();
      }, 1000);
    }
  };

  const handleChangPassWord = () => {
    if (passnew !== comfirmPassnew) {
      toast.success("Mật Khẩu Không Đồng Bộ !!! ", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      handleShowUpdate();
    } else {
      axios
        .put(
          `http://localhost:8000/api/pass/change-password/${DataUser._id + ""}`,
          {
            password: passnew,
          }
        )
        .then(function (response) {
          toast.success("Thay đổi mật khẩu thành công!!! ", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          handleCloseUpdateTB();
        })
        .catch(function (error) {
          console.log(error);
          toast.success("Thay đổi mật khẩu thất bại !!! ", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          handleCloseUpdateTB();
          handleShowUpdate();
        });
    }
  };

  const handleCheckSize = () => {
    axios
      .post("http://localhost:8000/api/chat/chat-check-size", {
        message: `Tôi cao ${height}CM và nặng ${weight}KG`,
        height: height,
        weight: weight,
      })
      .then(function (response) {
        setTimeout(() => {
          scrollbar();
        }, 500);
        setLoading(false);
        dispatch(
          AddDataChat({
            type: response.data.type,
            message: response.data.message,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCheckHightAndWeight = () => {
    if (height === "" || weight === "") {
      toast.warning("Chiều cao hoặc cân nặng chưa nhập !!!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else if (height < 100 || height > 200 || weight < 30 || weight > 90) {
      toast.info("Chiều cao hoặc cân nặng của bạn nhập không đúng !!!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setHeight("");
      setWeight("");
    } else {
      setHeight("");
      setWeight("");
      setLoading(true);
      dispatch(
        AddDataChat({
          type: "client",
          message: `Tôi cao ${height}cm và nặng ${weight}kg`,
        })
      );
      setTimeout(() => {
        scrollbar();
      }, 200);
      setTimeout(() => {
        handleCheckSize();
      }, 1000);
    }
  };

  return (
    <div>
      {DataUser && (
        <div className="container_icon">
          <div
            className="container_icon_cart"
            onClick={() => {
              navigation("/cart");
            }}
          >
            <i className="bx bx-cart-alt"></i>
          </div>

          <div
            className="container_icon_cart"
            onClick={() => {
              navigation("/history");
            }}
          >
            <i className="bx bx-history"></i>
          </div>
          <div
            className="container_icon_cart"
            onClick={() => {
              setLgShow(true);
            }}
          >
            <i className="fa-regular fa-robot"></i>
          </div>

          <div
            className="container_icon_cart"
            onClick={() => {
              handleShow();
              handleReset();
            }}
          >
            <i className="bx bx-cog"></i>
          </div>
        </div>
      )}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <div className="container_bot">
              <div className="container_bot_img">
                <img
                  // src="https://cdn-icons-png.flaticon.com/512/4712/4712010.png"
                  src="https://media2.giphy.com/media/5Xkfm66TmruVquYe6Q/giphy.gif?cid=ecf05e471agq66lywgx1uuhthnanj7aq85ai533fleb8vt55&rid=giphy.gif&ct=s"
                  alt=""
                />
              </div>
              <div className="container_bot_text">
                <div className="container_bot_text_1">
                  <p>SMART BOT </p>
                  <PulseLoader
                    className="botLoading"
                    color="#0984e3"
                    loading={loading}
                    size={7}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
                <span>I AM CUSTOMER SUPORT CHAT BOT</span>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container_chat_box">
            <div className="container_chat">
              {ListDataChat.map((item, index) =>
                item.type === "bot" ? (
                  <div className="container_chat_bot" key={index}>
                    <div className="container_chat_bot_img">
                      <img
                        // src="https://cdn-icons-png.flaticon.com/512/4712/4712010.png"
                        src="https://media2.giphy.com/media/Nti6GjcnJ4N01dWjvA/giphy.gif?cid=ecf05e471agq66lywgx1uuhthnanj7aq85ai533fleb8vt55&rid=giphy.gif&ct=s"
                        alt=""
                      />
                    </div>
                    <div className="container_chat_bot_msg">
                      <p>{item.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="container_chat_client" key={index}>
                    <div className="container_chat_client_msg">
                      <p>{item.message}</p>
                    </div>
                    <div className="container_chat_client_img">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt=""
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="container_chat_suggestions">
              <InfiniteCarousel
                breakpoints={[
                  {
                    breakpoint: 500,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                    },
                  },
                ]}
                showSides={true}
                sidesOpacity={0.5}
                sideSize={0.1}
                slidesToScroll={4}
                slidesToShow={4}
                scrollOnDevice={true}
              >
                {DataSuggestion.map((item, index) => (
                  <div
                    key={index}
                    className="container_chat_suggestions_text"
                    onClick={() => {
                      handleClickAPIChatBox(item);
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </InfiniteCarousel>
            </div>
            <div className="container_chat_input">
              {checkNumber ? (
                <div className="container_chat_input_text">
                  <input
                    type="text"
                    placeholder="Chat"
                    value={chat}
                    onKeyDown={(e) => onPress_ENTER(e)}
                    onChange={(e) => {
                      setChat(e.target.value);
                    }}
                  />
                  <button onClick={handleAddChat}>Send</button>
                </div>
              ) : (
                <div className="container_chat_input_text_2">
                  <input
                    type="number"
                    placeholder="Chiều cao của bạn (100cm - 200cm)"
                    value={height}
                    min={100}
                    max={200}
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Cân nặng của bạn (30kg - 90kg) "
                    min={30}
                    max={90}
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                  <button onClick={handleCheckHightAndWeight}>Send</button>
                </div>
              )}

              <div className="container_chat_input_number">
                <p
                  className={`${checkNumber && "active_number_chat"}`}
                  onClick={() => {
                    setCheckNumber(true);
                  }}
                >
                  1
                </p>
                <p
                  className={`${!checkNumber && "active_number_chat"}`}
                  onClick={() => {
                    setCheckNumber(false);
                  }}
                >
                  2
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* module update  */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập mật khẩu hiện tại của bạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mật Khẩu</Form.Label>
            <Form.Control
              type="password"
              value={pass}
              placeholder="Mật khẩu (*)"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCheckPassword();
            }}
          >
            SUBMIT
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal thông báo */}

      <Modal
        show={showupdatetb}
        onHide={handleCloseUpdateTB}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn cập nhật lại mật khẩu không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateTB}>
            Đóng
          </Button>
          <Button variant="warning" onClick={handleChangPassWord}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal change pass*/}
      <Modal show={showupdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nhập Mật Khẩu Mới</Form.Label>
            <Form.Control
              type="password"
              value={passnew}
              placeholder="Nhập mật khẩu (*)"
              onChange={(e) => {
                setPassNew(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nhập Lại Mật Khẩu</Form.Label>
            <Form.Control
              type="password"
              value={comfirmPassnew}
              placeholder="Nhập lại mật khẩu (*)"
              onChange={(e) => {
                setComfirmPassNew(e.target.value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleShowUpdateTB();
              handleCloseUpdate();
            }}
          >
            SUBMIT
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Icon;
