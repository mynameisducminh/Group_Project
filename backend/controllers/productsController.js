const { Products } = require("../models/model");

const ProductsController = {
  addProducts: async (req, res) => {
    try {
      const newProducts = new Products(req.body);
      const saveProducts = await newProducts.save();
      res.status(200).json(saveProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getFullProduct: async (req, res) => {
    try {
      const fullProduct = await Products.find();
      res.status(200).json({ data: fullProduct });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAll: async (req, res) => {
    try {
      var productName = req.query?.searchKeyword;
      var page = req.query?.page;
      var limit = req.query?.limit;
      var SkipNumber = (page - 1) * limit;

      page = parseInt(page);
      if (!page || !limit) {
        res.status(400).json({ msg: "Truyền thiếu Page và Limit" });
      } else {
        if (productName) {
          var condition = productName
            ? {
                NameProduct: { $regex: new RegExp(productName), $options: "i" },
              }
            : {};

          Products.find(condition)
            .skip(SkipNumber)
            .limit(limit)
            .then((data) => {
              const sum = data.length;
              return res.status(200).json({ total: sum, data: data });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while retrieving products.",
              });
            });
        } else {
          const sum = (await Products.find()).length;
          const result = await Products.find().skip(SkipNumber).limit(limit);
          return res.status(200).json({ total: sum, data: result });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllAdmin: async (req, res) => {
    try {
      var NameProduct = req.query?.nameProduct;
      var page = req.query?.pageNumber;
      page = parseInt(page);
      var SkipNumber = (page - 1) * 4;
      var condition = NameProduct
        ? { NameProduct: { $regex: new RegExp(NameProduct), $options: "i" } }
        : {};

      if (NameProduct === "") {
        const sum = (await Products.find()).length;
        const result = await Products.find().skip(SkipNumber).limit(4);
        return res.status(200).json({ total: sum, data: result.reverse() });
      } else {
        const sum = (await Products.find(condition)).length;
        const result = await Products.find(condition).skip(SkipNumber).limit(4);
        return res.status(200).json({ total: sum, data: result.reverse() });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  GetAnProducts: async (req, res) => {
    try {
      const Product = await Products.findById(req.params.id).populate(
        "comment"
      );
      res.status(200).json(Product);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  UpdateProducts: async (req, res) => {
    try {
      const IdProducts = await Products.findById(req.params.id);
      await IdProducts.updateOne({ $set: req.body });
      res.status(200).json("Update Successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Succesfully !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ProductsController;
