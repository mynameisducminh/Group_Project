import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationInput = yup.object().shape({
  otpCode: yup
    .number()
    .max(999999, "Mã OTP gồm 6 số !")
    .min(111111, "Mã OTP gồm 6 số !")
    .required("Vui lòng nhập mã otp "),
});

const OTPConfirm = () => {
  const navigation = useNavigate();
  const [check, setCheck] = useState(false);
  const { id } = useParams();

  // const ProductID = location.pathname.split("/")[2];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      otpCode: "",
    },
    mode: "all",
    resolver: yupResolver(validationInput),
  });

  const onSubmit = (data) => {
    setCheck(true);
    axios
      .post("http://localhost:8000/api/mail/check-code", {
        code: parseInt(data.otpCode),
      })
      .then(function (response) {
        setCheck(false);
        if (response.data.statusCode === 200) {
          toast.success(`${response.data.msg}`, {
            position: toast.POSITION.BOTTOM_LEFT,
          });

          setTimeout(() => {
            navigation(`/new-password/${id}`);
          }, 1500);
        } else if (response.data.statusCode === 201) {
          toast.error(`${response.data.msg}!!!`, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          reset();
        }
      })
      .catch(function (error) {
        setCheck(false);
        toast.error(`Có lỗi sảy ra !!!`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  return (
    <div>
      <div className="container_Login">
        <div className="modal_forgotPassword">
          <p className="text">Mã OTP của bạn</p>
          <TextField
            error={!!errors?.otpCode}
            {...register("otpCode")}
            type="number"
            label="Nhập mã OTP của bạn"
            size="small"
            sx={{ width: "80%" }}
            helperText={errors.otpCode?.message}
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

export default OTPConfirm;
