import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer, toast } from "react-toastify";

const validationInput = yup.object().shape({
  email: yup
    .string()
    .required("Email không được để trống")
    .email("Không đúng định dạng Email !!!"),
});

const ForgotPassword = () => {
  const navigation = useNavigate();
  const [check, setCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const onSubmit = (data) => {
    setCheck(true);
    toast.success("Đang Kiểm tả Email ", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    axios
      .post("http://localhost:8000/api/mail/forgot-password", {
        email: data.email,
      })
      .then(function (response) {
        setCheck(false);
        toast.success("Đã gửi mã OTP về email của bạn ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setTimeout(() => {
          navigation(`/otp-confirm/${response.data.UserId}`);
        }, 1500);
      })
      .catch(function (error) {
        setCheck(false);
        toast.error(`Có lỗi sảy ra hoặc email không chính xác !!!`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <div className="container_Login">
        <div className="modal_forgotPassword">
          <p className="text">Email của bạn</p>
          <TextField
            error={!!errors?.email}
            {...register("email")}
            type="text"
            label="Nhập email của bạn"
            size="small"
            sx={{ width: "80%" }}
            helperText={errors.email?.message}
          />
          <div className="buttonPassword">
            <LoadingButton
              className="buttonBack"
              onClick={() => {
                navigation("/home");
              }}
              variant="outlined"
            >
              Back
            </LoadingButton>
            <LoadingButton
              className="buttonSubmit"
              onClick={handleSubmit(onSubmit)}
              loading={check}
              variant="outlined"
              disabled={!isDirty && !isValid}
            >
              Submit
            </LoadingButton>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default ForgotPassword;
