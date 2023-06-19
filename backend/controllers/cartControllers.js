const { Users, Cart } = require("../models/model");

const CartController = {
  addToCart: async (req, res) => {
    try {
      const newCart = new Cart(req.body)
      const save = await newCart.save();
      if (req.body.AccountUSer) {
        const idUser = Users.findById(req.body.AccountUSer);
        await idUser.updateOne({ $push: { cart: save._id } });
      }
      res.status(200).json(save);
    } catch (error) {
      console.log("err: ", error);
      res.status(500).json(error);
    }
  },
  DeleteFromCart: async (req, res) => {
    try {
        await Users.updateMany(
          {cart: req.params.id },
          {$pull:{cart: req.params.id}}
       );
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete successfully!")
      } catch (error) {
        res.status(500).json(error);
      }
  },
};

module.exports = CartController;
