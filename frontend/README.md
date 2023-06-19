# WEDSITE SELL SHIRT

## Website

- BACKEND
- FRONTEND
- DATABASE

## Các chức năng

- Đăng kí
- Đăng nhập
- Đổi mật khẩu
- Phân quyền
- Gửi mã OTP về email
- Gửi thông báo khi đơn được xác nhận or thanh toán thành công
- Khả năng độc lập của user ( mỗi user sẻ có giỏ hàng vs lịch sử mua riêng biệt )
- khả năng độc lập của movie ( mỗi movie sẻ có mỗi cmt dc add theo những user cmt)
- phân quyền của Admin ( quản lý đơn hàng, quản lý sản phẩm , quản lý tài khoản)
- Admin có các chức năng "xem" "xóa" "sửa" các ticket, đơn hàng, tài khoản
- Tich hợp thanh toán ảo

## Mục tiêu

- Hoàn thành dc 90% webwite (Backend , Frontend , Database)

## Công nghệ sử dụng

- NODEJS (Express, Mongoose, MongoDB, Postman)
- REACTJS

## website còn thiếu

- Bảo mật
- Dung lượng cơ sở dữ liệu có hạn
- ......

# Thông tin test thanh toán ảo của Ngân hàng NCB

- Số thẻ: 9704198526191432198
- Tên chủ thẻ: NGUYEN VAN A
- Ngày phát hành: 07/15
- Mật khẩu OTP: 123456

# Thống kê VNPAY

https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm

- mynameisontung@gmail.com
- 0309Tungdev

- Các bước sử dụng React hook form check value input (Tham khảo chi tiết xây dựng và lấy dử liệu : ".../page/password/forgotPassword" )

<!-- import -->

<!-- import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"; -->

<!-- Sử dụng yub để check validate -->

<!-- const validationInput = yup.object().shape({
email (note: tên đã dc đăng ký ở TextField): yup
.string()
.required("Email không được để trống")
.email("Không đúng định dạng Email !!!"),
}); -->

<!-- gửi nguyên chỉ thay đổi ở defaultValues (là giá trị ban đầu của input) -->

<!-- const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
      email: "",
    },
      resolver: yupResolver(validationInput),
}); -->

<!-- không đổi -->

<!-- <TextField
    error={!!errors?.email}
    {...register("email")}
    type="text"
    label="Nhập email của bạn"
    size="small"
    sx={{ width: "80%" }} //sx = scss (style như scss bth)
    helperText={errors.email?.message}
/> -->
