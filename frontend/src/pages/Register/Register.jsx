import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import RingLoader from "react-spinners/RingLoader";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const [codeValue, setCodeValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  let a = false,
    b = false,
    c = false,
    d = false;

  const handleRegister = () => {
    axios
      .post("http://localhost:8000/api/auth/register", {
        image:
          "https://anhdep123.com/wp-content/uploads/2020/11/avatar-facebook-mac-dinh-nam.jpeg",
        username: usernameValue,
        password: passwordValue,
        email: emailValue,
        numberPhone: "",
        address: "",
      })
      .then(function (response) {
        setCheck(false);
        toast.success("Đăng Kí Thành công !!!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setTimeout(() => {
          navigation("/login");
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
        setCheck(false);
        if (error.response.status === 400) {
          toast.error(`${error.response.data.msg}`, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else if (error.response.status === 500) {
          toast.error(`Đăng Kí Không Thành Công `, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
  };

  const handleCheckEmail = () => {
    axios
      .post("http://localhost:8000/api/auth/checkEmailAndUser", {
        username: usernameValue,
        email: emailValue,
      })
      .then(function (response) {
        setLoading(false);
        if (response.data.statusCode === 200) {
          toast.error("Username đã tồn tại !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else if (response.data.statusCode === 201) {
          toast.error("Email đã tồn tại !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.success("Email hợp lệ !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          setTimeout(() => {
            setLoading(true);
            toast.info("Đang gửi mã OTP về email của bạn !", {
              position: toast.POSITION.BOTTOM_LEFT,
            });
            handleSendEmail();
          }, 500);
        }
      })
      .catch(function (error) {
        setLoading(false);
        toast.error("Không gửi Kiểm tra được email của bạn !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const handleSendEmail = () => {
    axios
      .post("http://localhost:8000/api/mail/send-email", {
        email: emailValue,
        status: "sendCode",
      })
      .then(function (response) {
        setLoading(false);
        toast.success("Gửi mã thành công !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setTimeout(() => {
          handleShowModal();
        }, 500);
      })
      .catch(function (error) {
        setLoading(false);
        toast.error("Không gửi được mã về email của bạn !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.log(error);
      });
  };

  const handleCheckCodeEmail = () => {
    if (codeValue.length < 6 || codeValue.length > 6) {
      toast.warn("Mã xác nhận bao gồm 6 số!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      axios
        .post("http://localhost:8000/api/mail/check-code", {
          code: parseInt(codeValue),
        })
        .then(function (response) {
          if (response.data.statusCode === 200) {
            toast.success(`${response.data.msg}`, {
              position: toast.POSITION.BOTTOM_LEFT,
            });
            handleRegister();
          } else {
            toast.error(`${response.data.msg}`, {
              position: toast.POSITION.BOTTOM_LEFT,
            });
          }
        })
        .catch(function (error) {
          toast.error("Mã của bạn chưa được gửi đi !!!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        });
    }
  };

  const handleAgainSendEmail = () => {
    handleSendEmail();
    toast.info("Đang gửi lại mã", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const handleOnClickButtonRegister = async () => {
    setCodeValue(0);
    setCheck(true);
    await checkInputs();
    if (a === true && b === true && c === true && d === true) {
      setCheck(false);
      toast.info("Đang kiểm tra email của bạn !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setLoading(true);
      setTimeout(() => {
        handleCheckEmail();
      }, 500);
    }
  };

  const checkInputs = () => {
    if (usernameValue === "" || usernameValue.length < 10) {
      setErrorFor(
        username,
        "Username cannot be blank or must have 10 characters"
      );
      setCheck(false);
      a = false;
    } else {
      setCheck(false);
      setSuccessFor(username);
      a = true;
    }

    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
      setCheck(false);
      b = false;
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Not a valid email 'abc@gmail.com'");
      setCheck(false);
      b = false;
    } else {
      setCheck(false);
      setSuccessFor(email);
      b = true;
    }

    if (passwordValue === "" || passwordValue.length < 6) {
      setErrorFor(
        password,
        "Password cannot be blank or must have 6 characters"
      );
      setCheck(false);
      c = false;
    } else {
      setCheck(false);
      setSuccessFor(password);
      c = true;
    }

    if (password2Value === "" || password2Value.length < 6) {
      setErrorFor(
        password2,
        "Password2 cannot be blank or must have 6 characters"
      );
      setCheck(false);
      d = false;
    } else if (passwordValue !== password2Value) {
      setErrorFor(password2, "Passwords does not match");
      setCheck(false);
      d = false;
    } else {
      setCheck(false);
      setSuccessFor(password2);
      d = true;
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

  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };

  return (
    <div>
      <div className="container_register">
        <div className="container_register_form">
          <div className="header">
            <h2>Create Account</h2>
          </div>
          <form id="form" className="form">
            <div className="form-control">
              <label>Username</label>
              <input
                type="text"
                minLength="6"
                placeholder="NguyenVanA"
                id="username"
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
              />
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
            <div className="form-control">
              <label>Email</label>
              <input
                type="email"
                placeholder="nguyenvana@gmail.com"
                id="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                type="password"
                minLength="6"
                placeholder="Password"
                id="password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
            <div className="form-control">
              <label>Password check</label>
              <input
                type="password"
                minLength="6"
                placeholder="Password two"
                id="password2"
                value={password2Value}
                onChange={(e) => setPassword2Value(e.target.value)}
              />
              <i className="fas fa-check-circle"></i>
              <i className="fas fa-exclamation-circle"></i>
              <small>Error message</small>
            </div>
          </form>
          <LoadingButton
            className="buttonBack"
            onClick={() => {
              navigation("/home");
            }}
            variant="outlined"
          >
            Back
          </LoadingButton>
          <LoadingButton
            className="buttonRegister"
            onClick={handleOnClickButtonRegister}
            loading={check}
            variant="outlined"
          >
            Submit
          </LoadingButton>
        </div>
        {loading === true && (
          <div className="container_register_loading">
            <RingLoader
              color="#00a78e"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container_modal_checkcode">
            <p>
              We have sent an activation code to your mail: <b>{emailValue}</b>
            </p>
            <div className="container_modal_checkcode_input_code">
              <input
                type="number"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                className="inputmodal"
                min={100000}
                placeholder="######"
              />
              &nbsp;{" "}
              <i
                class="fa-sharp fa-solid fa-paper-plane"
                onClick={handleCheckCodeEmail}
              ></i>
            </div>
            <i>
              Nếu bạn chưa nhận được mã xác nhận nhấn{" "}
              <b onClick={handleAgainSendEmail}>tại đây</b>
            </i>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Register;
