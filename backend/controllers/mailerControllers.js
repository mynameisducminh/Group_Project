const { Users } = require("../models/model");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
var check;
var bodyHTML;
var min = 100000;
var max = 999999;

const mailersController = {
  sendEmail: async (req, res) => {
    check = await Math.floor(min + Math.random() * (max - min));
    const { email, status } = req.body;

    if (status === "sendCode") {
      bodyHTML = `    <div
      class="container"
      style="
        position: absolute;
        width: 600px;
        height: 400px;
        top: 50%;
        left: 50%;
        border-radius: 5px;
        background: url(https://demoda.vn/wp-content/uploads/2022/03/background-black-background-den-cac-khoi-3d.jpg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid #3e3e3e;
        transform: translate(-50%, -50%);
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      "
    >
      <div class="container_icon" style="text-align: center; margin-top: 40px">
        <p
          style="
            text-transform: uppercase;
            margin-top: 10px;
            font-size: 25px;
            font-weight: 700;
            color: #2ecc71;
          "
        >
          Mã Xác Nhận Của Bạn
        </p>
        <b style="font-size: 40px; color: #fff; ">${check}</b>
      </div>
      <div
        class="container_text"
        style="
          margin-top: 20px;
          width: 90%;
          margin-left: 5%;
          text-align: center;
          font-size: 18px;
          color: #dfe6e9;
        "
      >
        <span>
          Đây mà đoạn mã được gửi từ hệ thống <b>MAFLINE</b> dùng để xác thực
          email hoặc tài khoản của bạn ! vì lí do bảo mật vui lòng không chia sẻ
          mã này dưới bất kì hình thức nào. <b>MAFLINE</b> cảm ơn bạn đã sử dụng
          dịch vụ của chung tôi 😉
        </span>
      </div>
    </div>`;
    } else if (status === "confirm") {
      bodyHTML = `<div
      class="container"
      style="
        position: absolute;
        width: 600px;
        height: 400px;
        border: 1px solid #3e3e3e;
        border-radius: 5px;
        background: url(https://demoda.vn/wp-content/uploads/2022/03/background-black-background-den-cac-khoi-3d.jpg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      "
    >
      <div class="container_icon" style="text-align: center; margin-top: 30px">
        <img
          src="https://img.freepik.com/premium-vector/checkbox-tick-icon-modern-check-mark-design_161534-59.jpg"
          alt=""
          style="width: 140px; height: 140px; border-radius: 50%"
        />
        <p
          style="
            text-transform: capitalize;
            margin-top: 10px;
            font-size: 27px;
            font-weight: 500;
            color: #2ecc71;
          "
        >
          Đơn hàng của bạn đã được xác nhận
        </p>
      </div>
      <div
        class="container_text"
        style="width: 90%; margin-left: 5%; text-align: center; color: #b2bec3"
      >
        <span>
          Đơn hàng của bạn đã được xác nhận thành công! Đơn hàng sẻ được giao
          tới bạn trong 3 - 5 ngày từ lúc đơn hàng được xác nhận. Khi nhận được
          sản phẩm bạn vui lòng bấm "<b>Đã nhận được hàng</b>" trong lịch sử mua
          hàng của bạn. Để bạn đánh giá sản phẩm nếu có vấn đề chúng tôi sẻ sử
          lý cho bạn. Sản phẩm không được phép xem trước. <b>MAFLINE</b> xin cảm
          ơn bạn đã sử dụng dịch vụ của chung tôi 😉
        </span>
      </div>
    </div>`;
    } else if (status === "payment") {
      bodyHTML = `    <div
      class="container"
      style="
        position: absolute;
        width: 600px;
        height: 400px;
        border-radius: 5px;
        background: url(https://demoda.vn/wp-content/uploads/2022/03/background-black-background-den-cac-khoi-3d.jpg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border: 1px solid #3e3e3e;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      "
    >
      <div class="container_icon" style="text-align: center; margin-top: 30px">
        <img
          src="https://cdn-icons-png.flaticon.com/512/314/314420.png"
          alt=""
          style="width: 140px; height: 140px"
        />
        <p
          style="
            text-transform: capitalize;
            margin-top: 10px;
            font-size: 25px;
            font-weight: 500;
            color: #0984e3;
          "
        >
          Đơn hàng đã được thanh toán thành công
        </p>
      </div>
      <div
        class="container_text"
        style="width: 90%; margin-left: 5%; text-align: center; color: #b2bec3"
      >
        <span>
          Đơn hàng của bạn đã được thanh toán thành công! Đơn hàng sẻ được giao
          tới bạn trong 3 - 5 ngày kể từ lúc thanh toán. Khi nhận được sản phẩm
          bạn vui lòng bấm "<b>Đã nhận được hàng</b>" trong lịch sử mua hàng của
          bạn. Để bạn đánh giá sản phẩm nếu có vấn đề chúng tôi sẻ sử lý cho
          bạn. Sản phẩm không được phép xem trước. <b>MAFLINE</b> xin cảm ơn bạn
          đã sử dụng dịch vụ của chung tôi 😉
        </span>
      </div>
    </div>`;
    }

    const msg = {
      from: process.env.USERMAIL,
      to: `${email}`,
      subject: "THÔNG BÁO TỪ HỆ THỐNG MAFLINE",
      html: bodyHTML,
    };
    await nodemailer
      .createTransport({
        service: "gmail",
        auth: {
          user: process.env.USERMAIL,
          pass: process.env.PASSMAIL,
        },
        port: 465,
        host: "smtp.gmail.com",
      })
      .sendMail(msg, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          if (status === "sendCode") {
            return res
              .status(200)
              .json(`Email sent ${email} with code : ${check}`);
          } else if (status === "confirm") {
            return res
              .status(200)
              .json(`Order confirmation email has been sent `);
          } else if (status === "payment") {
            return res.status(200).json(`Payment confirmation email sent`);
          }
        }
      });
  },
  checkCode: async (req, res) => {
    const { code } = req.body;
    try {
      console.log(check, code);
      if (check === code) {
        return res
          .status(200)
          .json({ statusCode: 200, msg: "Mã xác nhận của bạn chính xác" });
      } else {
        return res.status(201).json({
          statusCode: 201,
          msg: "Mã xác nhận của bạn không chính xác",
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  forgotPassword: async (req, res) => {
    const UserInfo = await Users.findOne({ email: req.body.email });
    if (!UserInfo) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email này không tồn tại !!!",
      });
    } else {
      let email = await UserInfo.email;
      check = await Math.floor(min + Math.random() * (max - min));

      const msg = {
        from: process.env.USERMAIL,
        to: `${email}`,
        subject: "THÔNG BÁO TỪ HỆ THỐNG MAFLINE",
        html: `    <div
        class="container"
        style="
          position: absolute;
          width: 600px;
          height: 400px;
          top: 50%;
          left: 50%;
          border-radius: 5px;
          background: url(https://demoda.vn/wp-content/uploads/2022/03/background-black-background-den-cac-khoi-3d.jpg);
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border: 1px solid #3e3e3e;
          transform: translate(-50%, -50%);
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        "
      >
        <div class="container_icon" style="text-align: center; margin-top: 40px">
          <p
            style="
              text-transform: uppercase;
              margin-top: 10px;
              font-size: 20px;
              font-weight: 700;
              color: #fff;
            "
          >
            Mã Xác Nhận Của Bạn
          </p>
          <b style="font-size: 35px; color: aliceblue">${check}</b>
        </div>
        <div
          class="container_text"
          style="
            margin-top: 20px;
            width: 90%;
            margin-left: 5%;
            text-align: center;
            font-size: 18px;
            color: #dfe6e9;
          "
        >
          <span>
            Đây mà đoạn mã dc gửi từ hệ thống <b>MAFLINE</b> dùng để xác thực
            email hoặc tài khoản của bạn ! vì lí do bảo mật vui lòng không chia sẻ
            mã này dưới bất kì hình thức nào. <b>MAFLINE</b> cảm ơn bạn đã sử dụng
            dịch vụ của chung tôi 😉
          </span>
        </div>
      </div>`,
      };

      await nodemailer
        .createTransport({
          service: "gmail",
          auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL,
          },
          port: 465,
          host: "smtp.gmail.com",
        })
        .sendMail(msg, (err) => {
          if (err) {
            return res.status(500).json({
              statusCode: 500,
              message: err,
            });
          } else {
            return res.status(200).json({
              statusCode: 200,
              UserId: UserInfo._id,
              message: `Code sent to ${email}`,
            });
          }
        });
    }
  },
};

module.exports = mailersController;
