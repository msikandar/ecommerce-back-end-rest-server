const Category = require("../models/category");
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
  let categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == null); //filter all categories where parentId is null
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoryList.push({
      id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id), // recursive call
    });
  }

  return categoryList;
}

exports.addcategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.file) {
    categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
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
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};
