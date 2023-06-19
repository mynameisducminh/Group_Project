const CartController = require("../controllers/cartControllers");
const router = require("express").Router();

router.post("/addToCart", CartController.addToCart);

router.delete("/:id", CartController.DeleteFromCart);

module.exports = router;
