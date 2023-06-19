import React, { useEffect, useState } from "react";
import Chart from "../../../components/Chart/Chart";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import "./Statistical.scss";

const Statistical = () => {
  const [text, setText] = useState("Doanh thu");
  return (
    <div>
      <div className="container_Statistical">
        <div className="container_Statistical_menu">
          <MenuAdmin />
        </div>
        <div className="container_Statistical_body">
          <div className="container_Statistical_body_search">
            <p>Báo Cáo Thống Kê</p>
          </div>
          <div className="container_Statistical_body_main">
            <div className="container_Statistical_body_main_statistics">
              <div
                className="container_Statistical_body_main_card"
                onClick={() => {
                  setText("Doanh Thu");
                }}
              >
                <i className="bx bx-money"></i>
                <br />
                <span>Doanh Thu</span>
              </div>
              <div
                className="container_Statistical_body_main_card"
                onClick={() => {
                  setText("Tỉ lệ đánh giá");
                }}
              >
                <i className="bx bx-message-rounded-minus"></i>
                <br />
                <span>Đánh giá</span>
              </div>
              <div
                className="container_Statistical_body_main_card"
                onClick={() => {
                  window.location.href =
                    "https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm";
                }}
              >
                <i className="bx bxs-bank"></i> <br />
                <span>Thống kê thanh toán qua ngân hàng</span>
              </div>
            </div>
            <div
              className="container_Statistical_body_main_text"
              style={{ marginLeft: "55px" }}
            >
              <p>
                <i className="bx bxl-audible"></i> {text}
              </p>
            </div>
            <div className="container_Statistical_body_main_chart">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
