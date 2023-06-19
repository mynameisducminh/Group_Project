import React, { useState, useEffect } from "react";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import "./CatalogManagement.scss";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";

const CatalogManagement = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [warehouse, setWarehouse] = useState(1000);
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [story, setStory] = useState("");
  const [search, setSearch] = useState("");
  const [id, SetId] = useState("");
  const [nameproduct, setNameProduct] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showadd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const [showupdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);
  const [showupdatetb, setShowUpdateTB] = useState(false);
  const handleCloseUpdateTB = () => setShowUpdateTB(false);
  const handleShowUpdateTB = () => setShowUpdateTB(true);
  const [showaddtb, setShowAddTB] = useState(false);
  const handleCloseAddTB = () => setShowAddTB(false);
  const handleShowAddTB = () => setShowAddTB(true);
  const [validationMsg, setValidationMsg] = useState("");

  const onPress_ENTER = (event) => {
    var keyPressed = event.keyCode || event.which;
    if (keyPressed === 13) {
      handleSearch();
      keyPressed = null;
    } else {
      return false;
    }
  };

  const handleSearch = () => {
    if (search === "") {
      alert("Nhập sản phẩm muốn tìm !!!");
    } else {
      setpageNumber(1);
      let url = `http://localhost:8000/api/product/all_product_admin?nameProduct=${search}&pageNumber=1`;
      fetchData(url);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/api/product/${id}`)
      .then(function (response) {
        toast.success("Delete product successfully !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleClose();
        fetchData(
          `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${pageNumber}`
        );
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Xóa sản phẩm thất bại !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  function handleReset() {
    setNameProduct("");
    setImage("");
    setPrice("");
    setSize("");
    setColor("");
    setStory("");
    setWarehouse("");
  }

  const validateAll = () => {
    const msg = {};
    if (nameproduct === "") {
      msg.nameproduct = "Không được bỏ trống tên sản phâm";
    } else if (image === "") {
      msg.image = "Không được bỏ trống ảnh sản phẩm";
    } else if (price === "") {
      msg.price = "Không được bỏ trống giá sản phẩm";
    } else if (price < 50000) {
      msg.price = "Gía sản phẩm phải lớn hơn bằng 50.000 vnd";
    } else if (size === "") {
      msg.size = "Không được bỏ trống size sản phẩm";
    } else if (color === "") {
      msg.color = "Không được bỏ trống màu sản phẩm";
    } else if (story !== "HOT" && story !== "NEW" && story !== "SALE") {
      msg.story = "Chưa nhập tùy chọn cho sản phẩm";
    } else if (warehouse === "") {
      msg.warehouse = "Không được bỏ trống số lượng hàng trong kho";
    } else if (warehouse < 500) {
      msg.warehouse = "Số lượng hàng trong kho phải lớn hơn bằng 500 ";
    } else {
      handleShowAddTB();
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const handleAdd = (e) => {
    const isValid = validateAll();
    if (!isValid) return;
    axios
      .post(`http://localhost:8000/api/product/addproduct`, {
        Color: color.split(","),
        NameProduct: nameproduct,
        Size: size.split(","),
        image: image.split(","),
        price: price,
        story: story,
        warehouse: warehouse,
      })
      .then(function (response) {
        toast.success("Thêm sản phẩm thành công !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleCloseAdd();
        fetchData(
          `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${pageNumber}`
        );
        handleCloseAddTB();
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Thêm sản phẩm thất bại !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleCloseAddTB();
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/api/product/${id}`, {
        Color: color.split(","),
        NameProduct: nameproduct,
        Size: size.split(","),
        image: image.split(","),
        price: price,
        story: story,
        warehouse: warehouse,
      })
      .then(function (response) {
        toast.success("Chỉnh sửa sản phẩm thành công !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        handleCloseUpdate();
        handleCloseUpdateTB();
        fetchData(
          `http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=${pageNumber}`
        );
      })
      .catch(function (error) {
        console.log(error);
        handleCloseUpdateTB();
        toast.error("Chỉnh sửa sản phẩm thất bại !!! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  const handleChangePageNumer = (event, value) => {
    setpageNumber(value);
    let url = `http://localhost:8000/api/product/all_product_admin?nameProduct=${search}&pageNumber=${value}`;
    fetchData(url);
  };

  const handleGetApiUpdate = (ProductId) => {
    axios
      .get(`http://localhost:8000/api/product/${ProductId}`)
      .then(function (response) {
        setNameProduct(response.data.NameProduct);
        setImage(response.data.image.toString());
        setSize(response.data.Size.toString());
        setColor(response.data.Color.toString());
        setPrice(response.data.price);
        setWarehouse(response.data.warehouse);
        setStory(response.data.story);
        handleShowUpdate();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchData = (url) => {
    axios
      .get(url)
      .then(function (response) {
        setTotal(response.data.total);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let url =
      "http://localhost:8000/api/product/all_product_admin?nameProduct=&pageNumber=1";
    fetchData(url);
  }, []);

  return (
    <div>
      <div className="container_catalog">
        <div className="container_catalog_menu">
          <MenuAdmin />
        </div>
        <div className="container_catalog_body">
          <div className="container_catalog_body_search">
            <p>Quản Lý Danh Mục ({total})</p>
            <div className="container_catalog_body_search_input">
              <input
                type="text"
                placeholder="Search . . ."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => onPress_ENTER(e)}
              />{" "}
              <i className="bx bx-search-alt-2" onClick={handleSearch}></i>
            </div>
          </div>
          <div className="container_catalog_body_main">
            <div className="container_catalog_user_right_table">
              <table>
                <tbody>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Các Size</th>
                    <th>Các Màu</th>
                    <th>Giá bán</th>
                    <th>Trạng Thái</th>
                    <th>Tổng kho</th>
                    <th>Chức năng</th>
                  </tr>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="catalog_product">
                        <img src={item.image[0]} />
                      </td>
                      <td> {item.NameProduct}</td>
                      <td>
                        {item.Size.map((item, index) => (
                          <span key={index}>{item},</span>
                        ))}
                      </td>
                      <td>
                        {item.Color.map((item, index) => (
                          <span key={index}> {item},</span>
                        ))}
                      </td>
                      <td style={{ color: "#d63031", fontWeight: "600" }}>
                        {item.price}
                      </td>
                      <td>{item.story}</td>
                      <td>{item.warehouse}</td>
                      <td className="catalog_btn">
                        <button
                          onClick={() => {
                            handleShow();
                            SetId(item._id);
                          }}
                        >
                          Xóa
                        </button>
                        <button
                          onClick={() => {
                            handleGetApiUpdate(item._id);
                            SetId(item._id);
                          }}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="navigation_page">
              <Stack>
                <Pagination
                  count={Math.floor(total / 4 + 1)}
                  variant="outlined"
                  shape="rounded"
                  page={pageNumber}
                  onChange={handleChangePageNumer}
                />
              </Stack>
            </div>
          </div>
          <div className="catalog_btn_add">
            <button
              onClick={() => {
                // handlecheckInput();
                handleShowAdd();
                handleReset();
              }}
            >
              Thêm mới
            </button>
          </div>
        </div>
      </div>
      {/* modle xóa */}
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
            Đóng
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* module thông báo thêm */}
      <Modal
        show={showaddtb}
        onHide={handleCloseAddTB}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn thêm sản phẩm này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddTB}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleAdd}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      {/*module thêm mới */}

      <Modal show={showadd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Mới Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ display: "flex" }}>
              Tên Sản Phẩm <p style={{ color: "red" }}>*</p>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên sản phẩm (*)"
              value={nameproduct}
              onChange={(e) => {
                setNameProduct(e.target.value);
              }}
            />
            <p style={{ color: "red" }}>{validationMsg.nameproduct}</p>
          </Form.Group>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ display: "flex" }}>
                Ảnh Sản Phẩm <p style={{ color: "red" }}>*</p>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ảhh sản phẩm (*) "
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <p style={{ color: "red" }}>{validationMsg.image}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ display: "flex" }}>
                Giá Sản Phẩm <p style={{ color: "red" }}>*</p>
              </Form.Label>
              <Form.Control
                type="number"
                min="50000"
                // onkeypress="validateAll()"
                placeholder="Gía sản phẩm (*)"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <p style={{ color: "red" }}>{validationMsg.price}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ display: "flex" }}>
                Size Sản Phẩm <p style={{ color: "red" }}>*</p>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Size sản phẩm (*)"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
              <p style={{ color: "red" }}>{validationMsg.size}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ display: "flex" }}>
                Màu Sản Phẩm <p style={{ color: "red" }}>*</p>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Màu sản phẩm (*)"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
              <p style={{ color: "red" }}>{validationMsg.color}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ display: "flex" }}>
                Trạng Thái <p style={{ color: "red" }}>*</p>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={story}
                onChange={(e) => {
                  setStory(e.target.value);
                }}
                defaultValue={"Click chọn trạng thái"}
              >
                <option value="Click chọn trạng thái" disabled>
                  Click chọn trạng thái ...
                </option>
                <option value="HOT">HOT</option>
                <option value="SALE">SALE</option>
                <option value="NEW">NEW</option>
              </Form.Select>
              <p style={{ color: "red" }}>{validationMsg.story}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ display: "flex" }}>
                Số Lượng Sản Phẩm Có Trong Kho <p style={{ color: "red" }}>*</p>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Số lượng trong kho (*)"
                min="500"
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                }}
              />
              <p style={{ color: "red" }}>{validationMsg.warehouse}</p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              validateAll();
            }}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modle thông báo */}
      <Modal
        show={showupdatetb}
        onHide={handleCloseUpdateTB}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn cập nhật không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateTB}>
            Đóng
          </Button>
          <Button variant="danger" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      {/* module update  */}

      <Modal show={showupdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Cập Nhật Thông Tin Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tên Sản Phẩm </Form.Label>
            <Form.Control
              type="text"
              value={nameproduct}
              onChange={(e) => {
                setNameProduct(e.target.value);
              }}
            />
          </Form.Group>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ảnh Sản Phẩm </Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Giá Sản Phẩm </Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Size Sản Phẩm </Form.Label>
              <Form.Control
                type="text"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Màu Sản Phẩm </Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Trạng Thái </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={story}
                onChange={(e) => {
                  setStory(e.target.value);
                }}
              >
                <option value="HOT">HOT</option>
                <option value="SALE">SALE</option>
                <option value="NEW">NEW</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số Lượng Còn Lại Trong Kho </Form.Label>
              <Form.Control
                type="number"
                value={warehouse}
                onChange={(e) => {
                  setWarehouse(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleShowUpdateTB();
              handleCloseUpdate();
            }}
          >
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default CatalogManagement;
