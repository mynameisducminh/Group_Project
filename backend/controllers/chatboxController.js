const { Users } = require("../models/model");
const { Products } = require("../models/model");

const ChatBoxController = {
  BotChat: async (req, res) => {
    try {
      const user = await Users.findById(req.body.userID);
      const chat = req.body.message;
      switch (chat) {
        case "chào" || "hello":
          return res.status(200).json({
            type: "bot",
            message:
              "Chào bạn tôi là một trợ lý ảo của MAFLINE . Tôi có thể giúp gì cho bạn đây ?",
          });
        case "bạn tên gì":
          return res.status(200).json({
            type: "bot",
            message: "Tôi là Matthew. Tôi là trợ lý ảo của MAFLINE.",
          });
        case "cho tôi biết các size":
          return res.status(200).json({
            type: "bot",
            message: ` Nếu bạn < 63kg và  < 162cm thì bạn có thể chọn size M. \n\
               Nếu bạn < 72kg và < 171cm thì bạn có thể chọn size L. \n\
               Nếu bạn < 81kg và  < 180cm thì bạn có thể chọn size XL`,
          });
        case "email của tôi":
          return res.status(200).json({
            type: "bot",
            message: `Email hiện tại của bạn trong DATABASE của tôi là ${user.email}`,
          });
        case "tôi quên mật khẩu":
          return res.status(200).json({
            type: "bot",
            message: `Bạn có thể dùng email (${user.email}) của bạn để thực hiện thay đổi mật khẩu khi quên mật khẩu ở form login.`,
          });
        case "tôi muốn đổi mật khẩu":
          return res.status(200).json({
            type: "bot",
            message: `Ở trang HOME bạn có thể nhấn vào icon setting ở dưới hình của BOT để được thay đổi mật khẩu.`,
          });
        case "địa chỉ của tôi":
          if (user.address === "") {
            return res.status(200).json({
              type: "bot",
              message: `Bạn chưa có đơn đặt hàng đầu tiền nên địa chỉ của bạn chưa có trong DATABASE. Địa chỉ của bạn sẻ được tự động cập nhật khi bạn hoàn thành đơn hàng đầu tiên.`,
            });
          } else {
            return res.status(200).json({
              type: "bot",
              message: `Địa chị hiện tại của bạn trong DATABASE của tôi là ${user.address}`,
            });
          }
        case "số điện thoại của tôi":
          if (user.numberPhone === "") {
            return res.status(200).json({
              type: "bot",
              message: `Bạn chưa có đơn đặt hàng đầu tiền nên số Điện thoại của bạn chưa có trong DATABASE. Số điện thoại của bạn sẻ được tự động cập nhật khi bạn hoàn thành đơn hàng đầu tiên.`,
            });
          } else {
            return res.status(200).json({
              type: "bot",
              message: `Số điện hiện tại của bạn trong DATABASE của tôi là ${user.numberPhone}`,
            });
          }
        case "hotline":
          return res.status(200).json({
            type: "bot",
            message: `Sdt : 0522564268`,
          });
        case "bye":
          return res.status(200).json({
            type: "bot",
            message:
              "Hẹn gặp lại bạn. MAFLINE xin cảm ơn bạn đã sử dụng dịch vụ của chung tôi 😉. Chúc bạn một ngày tốt lành",
          });
        case "các sản phẩm mới":
          const newProducts = await Products.find({ story: "NEW" });
          return res.status(200).json({
            type: "bot",
            message: ` ${newProducts.map((item) => item.NameProduct)} `,
          });
        case "các sản phẩm đang sale":
          const saleProducts = await Products.find({ story: "SALE" });
          return res.status(200).json({
            type: "bot",
            message: ` ${saleProducts.map((item) => item.NameProduct)} `,
          });

        default:
          return res.status(200).json({
            type: "bot",
            message: `Thật ngại quá 😳. Tin nhắn này của bạn không nằm trong chương trình trả lời tự động của tôi mong bạn thông cảm 😋.
            Bạn có thể liên hệ trực tiếp với người quản lý của tôi qua Facebook (https://www.facebook.com/sontung0309/) \n \ or Zalo(0522564268)`,
          });
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  CheckSize: async (req, res) => {
    try {
      const chat = req.body.message;
      const height = req.body.height;
      const weight = req.body.weight;

      switch (chat) {
        case `Tôi cao ${height}CM và nặng ${weight}KG`:
          if (height < 162 && weight < 63) {
            return res.status(200).json({
              type: "bot",
              message: "BOT nghĩ bạn nên chọn size M nha 😙",
            });
          } else if (height < 162 && weight >= 63) {
            return res.status(200).json({
              type: "bot",
              message: "BOT nghĩ bạn nên chọn size L nha 😙",
            });
          } else if (height < 171 && weight < 72) {
            return res.status(200).json({
              type: "bot",
              message: "BOT nghĩ bạn nên chọn size L nha 😙",
            });
          } else if (height < 180 && weight < 81) {
            return res.status(200).json({
              type: "bot",
              message: "BOT nghĩ bạn nên chọn size XL nha 😙",
            });
          } else if (height > 180 && weight > 81) {
            return res.status(200).json({
              type: "bot",
              message:
                "BOT nghĩ bạn nên chọn size XXL nha 😙 (Nếu sản phẩm có size này)",
            });
          }

        default:
          return res.status(200).json({
            type: "bot",
            message: `Bot không biết tư vấn cho bạn size gì nữa 😶😶😶 Bạn liên hệ ADMIN để Được tư vấn kỉ hơn giúp BOT nhá 😋😋😋 Facebook (https://www.facebook.com/sontung0309/) \n \ or Zalo(0522564268)`,
          });
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
};

module.exports = ChatBoxController;
