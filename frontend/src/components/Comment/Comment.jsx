import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./Comment.scss";

const CommentProduct = ({ dataComment }) => {
  return (
    <div>
      <div className="container_comment">
        <div className="container_comment_img">
          <img
            src="https://sme.hust.edu.vn/wp-content/uploads/2022/02/Avatar-Facebook-trang.jpg"
            alt=""
          />
        </div>
        <div className="container_comment_content">
          <div className="container_comment_content_name">
            <p>
              <b>{dataComment.nameUser} </b> &nbsp;
              <Rating
                name="simple-controlled"
                style={{ fontSize: "20px important", marginTop: "-2px" }}
                value={parseInt(dataComment.rating)}
              />
            </p>
            <span>{dataComment.datetime}</span>
          </div>
          <div className="container_comment_content_type">
            <p>
              Phân loại hàng : <span>{dataComment.color}</span> | size{" "}
              {dataComment.size}
            </p>
          </div>
          <div className="container_comment_content_content">
            <p>{dataComment.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentProduct;
