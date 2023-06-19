const { Comment, Products } = require("../models/model");

const commentController = {
  addCmt: async (req, res) => {
    try {
      const newcmt = new Comment(req.body);
      const save = await newcmt.save();
      if (req.body.ProductID) {
        const idMove = Products.findById(req.body.ProductID);
        await idMove.updateOne({ $push: { comment: save._id } });
      }
      res.status(200).json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  Deletecmt: async (req, res) => {
    try {
        await Products.updateMany(
          {comment: req.params.id },
          {$pull:{comment: req.params.id}}
       );
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete successfully!")
      } catch (error) {
        res.status(500).json(error);
      }
  },
};

module.exports = commentController;
