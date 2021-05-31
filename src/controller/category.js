const Category = require("../models/category");
const slugify = require("slugify");

exports.addcategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.productId) {
    categoryObj.productId = req.body.productId;
  }
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) return res.status(201).json({ category });
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) res.status(400).json({ error });
    if (categories) res.status(200).json({ categories });
  });
};
