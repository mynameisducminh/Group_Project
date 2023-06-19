import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import "./PaymentManagement.scss";

const PaymentManagement = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      field: "_id",
      headerName: "STT",
      width: 50,
      renderCell: ({ row }) => (
        <p>{data.findIndex((e) => e._id === row._id) + 1}</p>
      ),
    },
    { field: "NameAccount", headerName: "Tên tài khoản", width: 200 },
    { field: "NameProduct", headerName: "Tên sản phẩm", width: 200 },
    { field: "TypeOfPayment", headerName: "Hình thức thanh toán", width: 200 },
    {
      field: "dateTime",
      headerName: "Ngày thanh toán",
      width: 200,
      renderCell: ({ row }) => (
        <p>{moment(row.dateTime).format("DD-MM-YYYY HH:mm")}</p>
      ),
    },
    { field: "color", headerName: "Màu", width: 110 },
    { field: "size", headerName: "Kích cở", width: 110 },
    {
      field: "total",
      headerName: "Tổng tiền",
      width: 110,
      renderCell: ({ row }) => (
        <p style={{ color: "#d63031" }}>{row.total} VND</p>
      ),
    },
  ];

  const totalPrice = data
    .map((item) => item?.total)
    .reduce((prev, curr) => prev + curr, 0);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/api/TotalOrder/GetAllOrderConsolidation")
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
    <div>
      <div className="container_PaymentManagement">
        <div className="container_PaymentManagement_menu">
          <MenuAdmin />
        </div>
        <div className="container_PaymentManagement_body">
          <div className="container_PaymentManagement_body_search">
            <p>Quản lý thanh toán</p>
            <div className="container_PaymentManagement_body_search_input">
              <input type="text" placeholder="Search . . ." />
              <i className="bx bx-search-alt-2"></i>
            </div>
          </div>
          <div className="container_PaymentManagement_body_main">
            <div className="container_PaymentManagement_user_right_table">
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
              />
            </div>

            <div className="PaymentManagement_total">
              <p>Tổng doanh thu: {totalPrice} VNĐ</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default PaymentManagement;
