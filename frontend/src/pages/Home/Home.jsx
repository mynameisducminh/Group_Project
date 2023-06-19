import React, { useState, useEffect } from "react";
import Icon from "../../components/Icon/Icon";
import Navbar from "../../components/Navbar/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import DataImage from "./image";
import "./Home.scss";
import CardHome from "../../components/CardHome/CardHome";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const NewProduct = data.filter((item) => item.story === "NEW");
  const SaleProduct = data.filter((item) => item.story === "SALE");

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:8000/api/product/get-full")
      .then(function (response) {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container_home">
        <div className="container_home_top">
          <div className="container_home_top_content">
            <p>
              Chào mừng bạn đến với <span>MAFLINE</span>
            </p>
            <h2>
              Chúng tôi là đội ngũ các nhà thiết kế tài năng tạo ra những sản
              phẩm quần áo tốt nhất Việt Nam 🥰
            </h2>
            <button
              onClick={() => {
                navigation("/sale-product");
              }}
            >
              Bắt đầu
            </button>
          </div>
        </div>
        <div className="container_home_product">
          <h1>HÀNG MỚI VỀ</h1>
          {loading ? (
            <div className="container_home_product_card">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "300px", height: "385px", margin: "38px" }}
                />
              ))}
            </div>
          ) : (
            <div className="container_home_product_card">
              {NewProduct.slice(0, 6).map((item, index) => (
                <CardHome datacard={item} key={index} />
              ))}
            </div>
          )}

          <h1>BÁN CHẠY NHẤT</h1>
          {loading ? (
            <div className="container_home_product_card">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "300px", height: "385px", margin: "38px" }}
                />
              ))}
            </div>
          ) : (
            <div className="container_home_product_card">
              {SaleProduct.slice(0, 6).map((item, index) => (
                <CardHome datacard={item} key={index} />
              ))}
            </div>
          )}
          <h1>
            INSTAGRAM : <span style={{ color: "#00a78e" }}>MAFLINE</span>{" "}
          </h1>
          <div className="container_home_product_card_image">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry>
                {DataImage.map((item, index) => (
                  <img src={item} key={index} alt="" />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </div>
      <Icon />
      <Footer></Footer>
    </div>
  );
};

export default Home;
