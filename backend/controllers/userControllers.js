const { Users } = require("../models/model");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: async (req, res) => {
    try {
      var userName = req.query?.userName;
      var page = req.query?.pageNumber;

      if (userName || page) {
        if (userName && page) {
          var condition = userName
            ? { username: { $regex: new RegExp(userName), $options: "i" } }
            : {};
          page = parseInt(page);
          var SkipNumber = (page - 1) * 4;

          const result = await Users.find(condition).skip(SkipNumber).limit(4);
          return res.status(200).json(result.reverse());

          // Users.find(condition)
          //   .then((data) => {
          //     const result = data.limit(4);
          //     return res.send(result);
          //   })
          //   .catch((err) => {
          //     res.status(500).send({
          //       message:
          //         err.message || "Some error occurred while retrieving user.",
          //     });
          //   });
        } else if (page) {
          page = parseInt(page);
          var SkipNumber = (page - 1) * 4;
          const result = await Users.find().skip(SkipNumber).limit(4);
          return res.status(200).json(result);
        }
      } else {
        const allUSer = await Users.find();
        return res.status(200).json(allUSer);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAnUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).populate([
        "cart",
        "history",
      ]);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    console.log("er", req.body);
    try {
      const user = await Users.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      // const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // await user.updateOne({
      //   $set: {
      //     username: req.body.username,
      //     email: req.body.email,
      //     password: hashedPassword,
      //     address: req.body.address,
      //     numberPhone: req.body.numberPhone,
      //   },
      // });
      res.status(200).json({ msg: "Update Successfully !", data: user });
    } catch (error) {
      console.log("err", error);
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
