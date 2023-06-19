const commentController = require("../controllers/commentController")
const router = require("express").Router();

router.post("/add-comment",commentController.addCmt)

router.delete("/:id",commentController.Deletecmt)


module.exports = router