import React, { useState, useEffect } from "react";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./AccountManagement.scss";

const AccountManagement = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [show, setShow] = useState(false);
  const [id, SetId] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [nameSearch, setNameSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onPress_ENTER = (event) => {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
      handleSearch(pageNumber);
      keyPressed = null;
    } else {
      return false;
    }
  };

  const handleSearch = (number) => {
    let url = `http://localhost:8000/api/user/all-user?userName=${nameSearch}&pageNumber=${number}`;
    fetchData(url);
    setPageNumber(1);
  };

  const handleChangePageNumer = (event, value) => {
    setPageNumber(value);
    if (nameSearch === "") {
      fetchData(`http://localhost:8000/api/user/all-user?pageNumber=${value}`);
    } else {
      handleSearch(value);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/user/${id}`)
      .then(function (response) {
        toast.success("Success Notification !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleClose();
        fetchData(
          `http://localhost:8000/api/user/all-user?pageNumber=${pageNumber}`
        );
      })
      .catch(function (error) {
        toast.error("Error Notification !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const getLength = () => {
    axios
      .get("http://localhost:8000/api/user/all-user")
      .then(function (response) {
        setTotal(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchData = (url) => {
    axios
      .get(url)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData("http://localhost:8000/api/user/all-user?pageNumber=1");
    getLength();
  }, []);

  return (
    <div>
      <div className="container_AccountManagement">
        <div className="container_AccountManagement_menu">
          <MenuAdmin />
        </div>
        <div className="container_AccountManagement_body">
          <div className="container_AccountManagement_body_search">
            <p>Quản lý tài khoản </p>
            <div className="container_AccountManagement_body_search_input">
              <input
                type="text"
                placeholder="Search . . ."
                value={nameSearch}
                onChange={(e) => {
                  setNameSearch(e.target.value);
                }}
                onKeyDown={(e) => onPress_ENTER(e)}
              />{" "}
              <i className="bx bx-search-alt-2" onClick={handleSearch}></i>
            </div>
          </div>
          <div className="container_AccountManagement_body_main">
            <div className="container_AccountManagement_user_right_table">
              <table>
                <tbody>
                  <tr>
                    <th>UserName</th>
                    <th>Image</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Number Phone</th>
                    <th>Chức năng</th>
                  </tr>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td className="AccountManagement_product">
                        <img src={item.image} />
                      </td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.numberPhone}</td>
                      <td className="AccountManagement_btn">
                        <button
                          onClick={() => {
                            handleShow();
                            SetId(item._id);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="AccountManagement_pagination">
              <Stack>
                <Pagination
                  count={Math.floor(total.length / 4 + 0.5)}
                  variant="outlined"
                  shape="rounded"
                  page={pageNumber}
                  onChange={handleChangePageNumer}
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default AccountManagement;
