const userController = require("../controllers/userControllers");
const routes = require("express").Router();

routes.get("/all-user", userController.getAllUser);

routes.get("/:id", userController.getAnUser);

routes.put("/:id", userController.updateUser);

routes.delete("/:id", userController.deleteUser);

module.exports = routes;
