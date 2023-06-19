const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    numberPhone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartUSers" }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "HistoryUsers" }],
  },
  { timestamps: true }
);

const CartUser = new mongoose.Schema({
  ProductID: {
    type: String,
    required: true,
  },
  NameProduct: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Size: {
    type: Array,
    required: true,
  },
  Color: {
    type: Array,
    required: true,
  },
  AccountUSer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AccountUSers",
  },
});

const PurchaseHistory = new mongoose.Schema(
  {
    codeOrders: {
      type: Number,
      required: true,
      unique: true,
    },
    ProductID: {
      type: String,
      required: true,
    },
    NameProduct: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    Size: {
      type: String,
      required: true,
    },
    Color: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Total: {
      type: Number,
      required: true,
    },
    Story: {
      type: String,
      required: true,
    },
    NameUser: {
      type: String,
      required: true,
    },
    AccountUSer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "AccountUSers",
    },
  },
  { timestamps: true }
);

const Product = new mongoose.Schema({
  NameProduct: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Size: {
    type: Array,
    required: true,
  },
  Color: {
    type: Array,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  warehouse: {
    type: Number,
    required: true,
  },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const CommentProduct = new mongoose.Schema({
  nameUser: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  ProductID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
});

const consolidation = new mongoose.Schema({
  NameAccount: {
    type: String,
    required: true,
  },
  NameProduct: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  TypeOfPayment: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

//user
let Users = mongoose.model("AccountUSers", userShema);
//Product
let Products = mongoose.model("Products", Product);
//cmt
let Comment = mongoose.model("Comments", CommentProduct);
//cart
let Cart = mongoose.model("CartUSers", CartUser);
//histori order
let Orderhistory = mongoose.model("HistoryUsers", PurchaseHistory);
//sum order
let OrderConsolidation = mongoose.model("TotalOdered", consolidation);

module.exports = {
  Users,
  Products,
  Comment,
  Cart,
  OrderConsolidation,
  Orderhistory,
};
