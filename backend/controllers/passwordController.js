const { Users } = require("../models/model");
const bcrypt = require("bcrypt");

const passwordController = {
  checkPassword: async (req, res) => {
    if (
      Object.keys(req.body.username).length === 0 ||
      Object.keys(req.body.password).length === 0
    )
      return res.status(403).json({
        statusCode: 403,
        message: "body equal empty",
      });
    try {
      const user = await Users.findOne({ username: req.body.username });
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!user) {
        res
          .status(404)
          .json({ statusCode: 400, message: "User not found !!!" });
      }
      if (!password) {
        res
          .status(404)
          .json({ statusCode: 400, message: "Wrong password !!!" });
      }
      if (user && password) {
        res.status(202).json({ userId: user._id });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  ChangePassword: async (req, res) => {
    const UserID = await Users.findById(req.params.userId);
    if (!UserID)
      return res.status(400).json({
        statusCode: 400,
        message: "This User Id have not in the database",
      });
    if (req.body.constructor === Object && Object.keys(req.body).length === 0)
      return res.status(403).json({
        statusCode: 403,
        message: "body equal empty",
      });
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await UserID.updateOne({
        $set: {
          password: hashedPassword,
        },
      });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      console.log("err", error);
      res.status(500).json(error);
    }
  },
};

module.exports = passwordController;
