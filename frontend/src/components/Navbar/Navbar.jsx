import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataMyAccount } from "../../Redux/Selectors";

const Navbar = () => {
  const navigation = useNavigate();
  const [offset, setOffset] = useState(0);
  const DataUser = JSON.parse(localStorage.getItem("DataUser"));

  const movelogin = () => {
    navigation("/login");
  };

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div className="container_narbar">
        <div className={`container_narbar_intro ${offset > 100 && "hide"}`}>
          <div className="container_narbar_intro_1">
            <div className="container_narbar_intro_1_contact">
              <span>
                <i className="bx bx-envelope"></i>
                <span>maflineclothing@gmail.com</span>
              </span>
              <span>
                <i className="bx bx-phone"></i>
                <span>0386762927</span>
              </span>
            </div>
            <div className="container_narbar_intro_1_contact">
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
        <div className="container_narbar_main">
          <nav>
            <label
              className="logo"
              onClick={() => {
                navigation("/home");
              }}
            >
              <h2>
                MAF<span>LINE</span>
              </h2>
              {/* MAFLINE */}
            </label>
            <ul>
              <li
                onClick={() => {
                  navigation("/home");
                }}
              >
                <p>TRANG CHỦ</p>
              </li>
              <li
                onClick={() => {
                  navigation("/sale-product");
                }}
              >
                <p>SẢN PHẨM</p>
              </li>
              <li
                onClick={() => {
                  navigation("/size-check");
                }}
              >
                <p>KÍCH CỠ</p>
              </li>
              <li
                onClick={() => {
                  navigation("/about");
                }}
              >
                <p>GIỚI THIỆU</p>
              </li>
              {!DataUser ? (
                <li onClick={movelogin}>
                  <p>ĐĂNG NHẬP</p>
                </li>
              ) : (
                <li
                  onClick={() => {
                    navigation("/home");
                    window.location.reload();
                    localStorage.clear();
                  }}
                >
                  <p>ĐĂNG XUẤT</p>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
