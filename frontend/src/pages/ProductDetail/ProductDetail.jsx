import React, { useState, useEffect } from "react";
import "./ProductDetail.scss";
import Navbar from "../../components/Navbar/Navbar";
import Icon from "../../components/Icon/Icon";
import Footer from "../../components/Footer/Footer";
import CarouselSuppage from "../../components/Carousel/Carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardCarouselDetail from "../../components/CardCarouselDetail/CardCarouselDetail";
import CommentProduct from "../../components/Comment/Comment";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductDetail = () => {
  const [seeMore, setSeeMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [dataSize, setDataSize] = useState([]);
  const [dataColor, setDataColor] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [dataComments, setDataComments] = useState([]);
  const NewProduct = data2.filter((item) => item.story === "NEW");
  const DataUser = JSON.parse(localStorage.getItem("DataUser"));
  const ProductID = location.pathname.split("/")[2];
  const handleMoveBuy = () => {
    navigate(`/productDetail/payment/${ProductID}`);
  };

  const handleSeeMore = () => {
    if (seeMore === false) {
      setSeeMore(true);
      document.getElementById("checkHandleMore").style.height = "1100px";
      document.getElementById("xemthem").innerHTML = "Thu Nhỏ";
    } else {
      document.getElementById("checkHandleMore").style.height = "600px";
      setSeeMore(false);
    }
  };

  const handleAddCart = () => {
    axios
      .post(`http://localhost:8000/api/cart/addToCart`, {
        ProductID: ProductID,
        NameProduct: data.NameProduct,
        Image: dataImage[0],
        price: data.price,
        Size: dataSize,
        Color: dataColor,
        AccountUSer: DataUser._id,
      })
      .then(function (response) {
        console.log(response.data);
        toast.success("Thêm sản phẩm thành công ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      })
      .catch(function (error) {
        toast.error("Thêm sản phẩm thất bại", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:8000/api/product/${ProductID}`)
      .then(function (response) {
        setData(response.data);
        setDataColor(response.data.Color);
        setDataSize(response.data.Size);
        setDataImage(response.data.image);
        setDataComments(response.data.comment);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:8000/api/product/allproduct")
      .then(function (response) {
        setData2(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [ProductID]);

  return (
    <div>
      <Navbar />
      <div className="container_productDetail">
        <div className="container_productDetail_top">
          <div className="container_productDetail_top_carousel">
            <CarouselSuppage dataImage={dataImage} />
          </div>
          <div className="container_productDetail_top_introduce">
            <p>{data.NameProduct}</p>
            <span>Kho : {data.warehouse} sản phẩm có sẵn</span>
            <hr />
            <div className="container_productDetail_top_introduce_2">
              <table>
                <tbody>
                  <tr>
                    <td>Mã Giảm Giá Của Shop </td>
                    <td>Không</td>
                  </tr>
                  <tr>
                    <td>Deal Sốc</td>
                    <td>Mua Kèm Deal Sốc</td>
                  </tr>
                  <tr>
                    <td>Bảo Hiểm</td>
                    <td>Bảo hiểm Thời trang</td>
                  </tr>
                  <tr>
                    <td>Vận Chuyển</td>
                    <td>Từ Đà Nẵng</td>
                  </tr>
                  <tr>
                    <td>Miễn Phí vận chuyển</td>
                    <td>Mua 3 sản phẩm trở lên</td>
                  </tr>
                  <tr>
                    <td>Màu sản phẩm sẳn có</td>
                    <td>
                      {dataColor.map((item, index) => (
                        <span key={index}>{item},</span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Kích Cỡ</td>
                    <td>
                      {dataSize.map((item, index) => (
                        <span key={index}>{item},</span>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td>Giá:</td>
                    <td>
                      <i>180.000₫ </i> <b>{data.price}₫</b>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingTop: "20px" }}>
                      {DataUser ? (
                        <button className="buy" onClick={handleMoveBuy}>
                          MUA HÀNG
                        </button>
                      ) : (
                        <button
                          className="buy"
                          onClick={() => {
                            alert("Bạn cần đăng nhập ?");
                          }}
                        >
                          MUA HÀNG
                        </button>
                      )}
                    </td>
                    <td style={{ paddingTop: "20px" }}>
                      {DataUser ? (
                        <button className="addcart" onClick={handleAddCart}>
                          THÊM VÀO GIỎ HÀNG
                        </button>
                      ) : (
                        <button
                          className="addcart"
                          onClick={() => {
                            alert("Bạn cần đăng nhập ?");
                          }}
                        >
                          THÊM VÀO GIỎ HÀNG
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="container_productDetail_intro_shop">
          <div className="container_productDetail_intro_shop_img">
            <img
              src="https://img.freepik.com/premium-vector/clothing-store-logo-design-inspiration-vector-illustration_500223-481.jpg"
              alt=""
            />
          </div>
          <div className="container_productDetail_information">
            <div className="container_productDetail_information_one">
              <p>MAFLINE</p>
              <span>THIẾT KẾ VÀ THỜI TRANG</span>
            </div>
            <div className="container_productDetail_information_two">
              <div className="container_productDetail_information_two_more">
                <p>
                  Đánh Giá
                  <span>15</span>
                </p>
                <p>
                  Sản Phẩm
                  <span>134</span>
                </p>
              </div>
              <div className="container_productDetail_information_two_more">
                {" "}
                <p>
                  Tỉ Lệ Phản Hồi
                  <span>95%</span>
                </p>
                <p>
                  Thời Gian Phản Hồi
                  <span>trong vài giờ</span>
                </p>
              </div>
              <div className="container_productDetail_information_two_more">
                {" "}
                <p>
                  Tham Gia
                  <span>5 năm trước</span>
                </p>
                <p>
                  Người Theo Dõi
                  <span>2202</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="checkHandleMore"
          className="container_productDetail_intro_product"
        >
          <div className="container_productDetail_intro_product_one">
            <div className="container_productDetail_intro_product_one_details">
              <p>chi tiêt sản phẩm</p>
            </div>
            <div className="container_productDetail_intro_product_one_details_2">
              <table>
                <tbody>
                  <tr>
                    <td>Danh Mục</td>
                    <td>
                      MAFLINE <i className="bx bx-chevron-right"></i> Thời Trang{" "}
                      <i className="bx bx-chevron-right"></i> Áo{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>Chất liệu</td>
                    <td>Cotton</td>
                  </tr>
                  <tr>
                    <td>Gửi từ</td>
                    <td>Đà Nẵng</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="container_productDetail_intro_product_one_details">
              <p>MÔ TẢ SẢN PHẨM</p>
            </div>
            <div className="container_productDetail_intro_product_one_details_2">
              <p>
                <br />
                ✔️ Xuất xứ : Việt Nam <br /> <br />
                ⭐⭐⭐⭐⭐ HÃY INBOX CHO SHOP KHI SẢN PHẨM CÓ VẤN ĐỀ ( ĐỔI SIZE,
                SP BỊ LỖI...) ĐỂ HỖ TRỢ TRƯỚC KHI ĐÁNH GIÁ.✔️
                <br /> <br />
                🔹 Chất liệu : Cotton 35%
                <br /> <br />
                🔹 Bảng size MAFLINE (cm) :
                <br /> <br />
                M : Dài - 72 Rộng - 56 | 1m45 - 1m58, Dưới 65kg
                <br /> <br />
                L : Dài - 74 Rộng - 58 | 1m55 - 1m65, 65Kg - 72kg trở lên
                <br /> <br />
                XL : Dài - 76 Rộng - 60 l 1m65 - trở lên, 72kg trở lên
                <br /> <br />
                👉 Nếu chưa biết lựa size bạn có thể inbox để được chúng mình tư
                vấn.
                <br /> <br />
                🔹 Chính sách đổi trả MAFLINE :
                <br /> <br />
                ✔️Miễn phí đổi hàng cho khách mua ở HEYYOU trong trường hợp bị
                lỗi từ nhà sản xuất, giao nhầm hàng, nhầm size.
                <br /> <br />
                ✔️Quay video mở sản phẩm khi nhận hàng, nếu không có video
                unbox, khi phát hiện lỗi phải báo ngay cho HEYYOU trong 1 ngày
                tính từ ngày giao hàng thành công. Qua 1 ngày chúng mình không
                giải quyết khi không có video unbox.
                <br /> <br />
                ✔️ Sản phẩm đổi trong thời gian 7 ngày kể từ ngày nhận hàng
                <br /> <br />
                ✔️Sản phẩm còn mới nguyên tem, tags, sản phẩm chưa giặt và không
                dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi
                mua hàng.
                <br /> <br />- MAFLINE Studio hiện đang chuyển mình mang đến một
                thương hiệu thời trang hoàn toàn mới. Xuất hiện từ đầu năm 2022
                đầy những chật vật nhưng những gì MAFLINE Studio luôn hướng tới
                sự đổi mới và nâng cấp từng ngày, đem tới một chất lượng và giá
                thành tốt nhất đến cho các bạn ❤️
                <br /> <br />
                Liên hệ: 0386762927
                <br /> <br />
                / Website/ https://maflinestudio.vn/
                <br />
                MAFLINE Stuido : Thương hiệu quốc dân <br />
                <br />
                #genz #mafline #maflinestudio #aothun #streetwear #aonam #aonu
                #aothundep #aophong #tshirt #hoodie #sweater <br />
              </p>
            </div>
          </div>
          <div
            className="container_productDetail_intro_product_one_details_3"
            onClick={handleSeeMore}
          >
            <p id="xemthem">Xem Thêm</p>
          </div>
        </div>

        <div className="container_productDetail_intro_product">
          <div className="container_productDetail_intro_product_one">
            <div className="container_productDetail_intro_product_one_details">
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Các Đánh Giá Về Sản Phẩm
              </p>
            </div>
            <div className="container_productDetail_intro_product_one_comment">
              {dataComments.map((item, index) => (
                <CommentProduct dataComment={item} key={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="container_productDetail_intro_product">
          <div className="container_productDetail_intro_product_one">
            <div className="container_productDetail_intro_product_one_details">
              <p style={{ textAlign: "center", fontWeight: "600" }}>
                Các mẫu thiết kế mới
              </p>
            </div>
            <div className="container_productDetail_intro_product_one_newbrand">
              <Carousel responsive={responsive}>
                {NewProduct.map((item, index) => (
                  <CardCarouselDetail dataNewCardCarousel={item} key={index} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <Icon />
      <Footer />

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default ProductDetail;
