import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.scss";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useForm } from "react-hook-form";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewPassword = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const ProductID = location.pathname.split("/")[2];

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (data) => {
    if (getValues("newPassword") !== getValues("confirmPassword")) {
      setIsPasswordNotMatch(true);
    } else {
      console.log("DATA: ", data);
      axios
        .put(`http://localhost:8000/api/pass/change-password/${ProductID}`, {
          password: data.newPassword,
        })
        .then(function (response) {
          setOpen(true);
          setMessage("Đã tạo mới mật khẩu thành công");
          setAlertStatus("success");
          setTimeout(() => {
            navigation("/login");
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
          setOpen(true);
          setMessage("Đã có lỗi lúc tạo mật khẩu của bạn, vui lòng thử lại");
          setAlertStatus("error");
        });
    }
  };

  return (
    <div>
      <div className="container_Login">
        <div className="modal_forgotPassword">
          <p className="text">Nhập mật khẩu mới của bạn</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <input
              className={`inpEmail ${errors?.newPassword && "inpError"}`}
              placeholder="Nhập mật khẩu mới"
              type={isShowPassword ? "text" : "password"}
              {...register("newPassword", {
                required: true,
                minLength: 6,
                maxLength: 30,
                pattern: /^[A-Za-z0-9]{6,30}$/g,
              })}
            />
            {errors?.newPassword?.type === "required" && (
              <p className="errorMsg">Mật khẩu cần phải được nhập</p>
            )}
            {errors?.newPassword?.type === "minLength" && (
              <p className="errorMsg">Mật khẩu phải có ít nhất 6 ký tự</p>
            )}
            {errors?.newPassword?.type === "maxLength" && (
              <p className="errorMsg">Mật khẩu vượt quá 30 ký tự</p>
            )}
            {errors?.newPassword?.type === "pattern" && (
              <p className="errorMsg">
                Mật khẩu không được có các ký tự đặc biệt
              </p>
            )}
            <i
              class="fa-solid fa-eye icon"
              onClick={() => setIsShowPassword(!isShowPassword)}
            ></i>
            <br />
            <input
              className={`inpEmail mtop ${
                errors?.confirmPassword && "inpError"
              }`}
              placeholder="Nhập lại mật khẩu"
              type={isShowConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
                maxLength: 30,
                pattern: /^[A-Za-z0-9]{6,30}$/g,
              })}
            />
            {errors?.confirmPassword?.type === "required" && (
              <p className="errorMsg">Xác thực mật khẩu cần phải được nhập</p>
            )}
            {errors?.confirmPassword?.type === "minLength" && (
              <p className="errorMsg">
                Xác thực mật khẩu phải có ít nhất 6 ký tự
              </p>
            )}
            {errors?.confirmPassword?.type === "maxLength" && (
              <p className="errorMsg">Xác thực mật khẩu vượt quá 30 ký tự</p>
            )}
            {errors?.confirmPassword?.type === "pattern" && (
              <p className="errorMsg">
                Xác thực mật khẩu không được có các ký tự đặc biệt
              </p>
            )}
            {isPasswordNotMatch && (
              <p className="errorMsg">Mật khẩu không trùng khớp</p>
            )}

            <i
              class="fa-solid fa-eye icon2"
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            ></i>

            <input type="submit" className="btn_continue" />
          </form>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertStatus}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewPassword;
