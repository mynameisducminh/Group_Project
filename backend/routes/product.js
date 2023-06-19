const ProductController = require("../controllers/productsController");
const router = require("express").Router();

router.post("/addproduct", ProductController.addProducts);

router.get("/allproduct", ProductController.getAll);

router.get("/get-full", ProductController.getFullProduct);

router.get("/all_product_admin", ProductController.getAllAdmin);

router.get("/:id", ProductController.GetAnProducts);

router.put("/:id", ProductController.UpdateProducts);

router.delete("/:id", ProductController.deleteProducts);

module.exports = router;
