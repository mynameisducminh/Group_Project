import React, { useEffect, useState } from "react";
import Chart from "../../../components/Chart/Chart";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import "./AdminHome.scss";

const AdminHome = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:8000/api/TotalStatic/static")
      .then(function (response) {
        setData(response.data.data);
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
      <div className="container_AdminHome">
        <div className="container_AdminHome_menu">
          <MenuAdmin />
        </div>
        <div className="container_AdminHome_body">
          <div className="container_AdminHome_body_search">
            <p>Trang chủ</p>
          </div>
          <div className="container_AdminHome_body_main">
            <div className="container_AdminHome_body_main_statistics">
              <div className="container_AdminHome_body_main_card">
                <i className="bx bxs-user-account"></i>
                <p>{data.Users}</p>
                <span>Tài khoản</span>
              </div>
              <div className="container_AdminHome_body_main_card">
                <i className="bx bx-folder"></i>
                <p>{data.Products}</p>
                <span>Sản phẩm</span>
              </div>
              <div className="container_AdminHome_body_main_card">
                <i className="bx bxs-package"></i>
                <p>{data.History}</p>
                <span>Đơn Hàng</span>
              </div>
            </div>
            <div
              className="container_AdminHome_body_main_text"
              style={{ marginLeft: "55px" }}
            >
              <p>
                <i className="bx bxl-audible"></i> Tỉ Lệ Truy Cập Trang Web
              </p>
            </div>
            <div className="container_AdminHome_body_main_chart">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
