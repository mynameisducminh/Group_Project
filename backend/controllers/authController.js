const { Users } = require("../models/model");
const bcrypt = require("bcrypt");

const authControllers = {
  checkEmailAndUser: async (req, res) => {
    try {
      if (
        Object.keys(req.body.email).length === 0 ||
        Object.keys(req.body.username).length === 0
      ) {
        return res.status(403).json({
          statusCode: 403,
          message: "body equal empty",
        });
      } else {
        const username = await Users.findOne({
          username: req.body.username,
        });
        const email = await Users.findOne({
          email: req.body.email,
        });

        if (username) {
          return res
            .status(200)
            .json({ statusCode: 200, msg: "Username đã tồn tại" });
        } else {
          if (email) {
            return res
              .status(200)
              .json({ statusCode: 201, msg: "Email đã tồn tại" });
          } else {
            return res
              .status(201)
              .json({ statusCode: 202, msg: "Email chưa tồn tại" });
          }
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  register: async (req, res) => {
    try {
      if (
        Object.keys(req.body.username).length === 0 ||
        Object.keys(req.body.password).length === 0 ||
        Object.keys(req.body.email).length === 0
      ) {
        return res.status(403).json({
          statusCode: 403,
          message: "body equal empty",
        });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUSer = await new Users({
          image: req.body.image,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          address: req.body.address,
          numberPhone: req.body.numberPhone,
        });
        const accountUser = await newUSer.save();
        res.status(200).json(accountUser);
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },

  login: async (req, res) => {
    try {
      const user = await Users.findOne({ username: req.body.username });
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!user) {
        res.status(404).json("User not found !");
      }
      if (!password) {
        res.status(404).json("Wrong password !!!");
      }
      if (user && password) {
        const { password, ...orther } = user._doc;
        res.status(200).json({ ...orther });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authControllers;
