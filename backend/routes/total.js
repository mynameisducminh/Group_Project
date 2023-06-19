const OrderConsolidationController = require("../controllers/totalController");
const router = require("express").Router();

router.post("/OrderConsolidation", OrderConsolidationController.addToTotal);

router.get(
  "/GetAllOrderConsolidation",
  OrderConsolidationController.getAllOrder
);

router.put("/:id", OrderConsolidationController.UpdateTotal);

router.delete("/:id", OrderConsolidationController.deleteOrder);

module.exports = router;
