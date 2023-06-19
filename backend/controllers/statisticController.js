const { Products, Users, Comment, Orderhistory } = require("../models/model");

const getStatic = async (req, res, next) => {
  try {
    const sumProducts = await (await Products.find()).length;
    const sumUsers = await (await Users.find()).length;
    const sumComment = await (await Comment.find()).length;
    const sumOrderhistory = await (await Orderhistory.find()).length;
    res.status(200).json({
      data: {
        Products: sumProducts,
        Users: sumUsers,
        Comment: sumComment,
        History: sumOrderhistory,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getStatic };
