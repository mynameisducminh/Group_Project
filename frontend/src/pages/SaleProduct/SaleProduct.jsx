import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import "./SaleProduct.scss";
import CardProduct from "../../components/CardProduct/CardProduct";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import RingLoader from "react-spinners/RingLoader";
import qs from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { DataProductPayload } from "../../Redux/Selectors";
import { changePayload, resetPayload } from "../../Redux/Product/ProductSlice";
import _debounce from "lodash/debounce";

const SaleProduct = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [selectOption, setSelectOption] = useState("all");
  const dispatch = useDispatch();
  const payload = useSelector(DataProductPayload);

  const debounceFn = useCallback(
    _debounce((value) => {
      dispatch(changePayload({ ...payload, searchKeyword: value, page: 1 }));
    }, 500),
    []
  );

  // const handleChangeSelect = (value) => {
  //   setSelectOption(value);
  //   if (value === "all") {
  //     dispatch(resetPayload());
  //     axios
  //       .get(
  //         `http://localhost:8000/api/product/allproduct?${qs.stringify(
  //           payload
  //         )}`
  //       )
  //       .then(function (response) {
  //         setData(response.data.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  //   if (value === "tang") {
  //     dispatch(resetPayload());
  //     axios
  //       .get(
  //         `http://localhost:8000/api/product/allproduct?${qs.stringify(
  //           payload
  //         )}`
  //       )
  //       .then(function (response) {
  //         setData(response.data.data.sort((a, b) => a.price - b.price));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  //   if (value === "giam") {
  //     dispatch(resetPayload());
  //     axios
  //       .get(
  //         `http://localhost:8000/api/product/allproduct?${qs.stringify(
  //           payload
  //         )}`
  //       )
  //       .then(function (response) {
  //         setData(response.data.data.sort((a, b) => b.price - a.price));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  //   if (value === "new") {
  //     dispatch(resetPayload());
  //     axios
  //       .get(
  //         `http://localhost:8000/api/product/allproduct?${qs.stringify(
  //           payload
  //         )}`
  //       )
  //       .then(function (response) {
  //         setData(response.data.data.filter((e) => e.story === "NEW"));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  //   if (value === "sale") {
  //     dispatch(resetPayload());
  //     axios
  //       .get(
  //         `http://localhost:8000/api/product/allproduct?${qs.stringify(
  //           payload
  //         )}`
  //       )
  //       .then(function (response) {
  //         setData(response.data.data.filter((e) => e.story === "HOT"));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // };

  const handleChangePageNumber = (event, value) => {
    dispatch(changePayload({ ...payload, page: value }));
  };

  const fetchData = (url) => {
    axios
      .get(`${url}`)
      .then(function (response) {
        setData(response.data.data);
        setTotal(response.data.total);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let url = `http://localhost:8000/api/product/allproduct?${qs.stringify(
      payload
    )}`;
    fetchData(url);
  }, [payload]);

  return (
    <div>
      <Navbar />
      <div className="container_SaleProduct">
        <div className="container_SaleProduct_top">
          <div className="container_SaleProduct_top_search">
            <div className="container_SaleProduct_top_search_1">
              <i className="bx bx-search-alt-2"></i>
              <input
                type="text"
                placeholder="Search . . ."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  debounceFn(e.target.value);
                }}
              />
            </div>
            {/* <div className="container_SaleProduct_top_search_2">
              <select
                value={selectOption}
                onChange={(e) => handleChangeSelect(e.target.value)}
                // onClick={handleCheckSelect}
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="sale">Sale</option>
                <option value="tang">Giá Tăng dần</option>
                <option value="giam">Giá giảm dần</option>
              </select>
            </div> */}
          </div>
        </div>
        <div className="container_SaleProduct_product_card_main">
          <RingLoader
            color="#00a78e"
            className="RingLoader"
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
          {loading === false && (
            <div className="container_SaleProduct_product_card">
              {data.length === 0 ? (
                <p>Không có dữ liệu</p>
              ) : (
                data.map((item, index) => (
                  <CardProduct dataProduct={item} key={index} />
                ))
              )}
            </div>
          )}
          {loading === false && (
            <div className="navigation_page">
              <Stack>
                <Pagination
                  count={Math.ceil(total / 9)}
                  variant="outlined"
                  shape="rounded"
                  page={payload.page}
                  onChange={handleChangePageNumber}
                />
              </Stack>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SaleProduct;
