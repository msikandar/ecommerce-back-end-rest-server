const express = require("express");
const { addcategory, getCategories } = require("../controller/category");
const router = express.Router();

router.post("/category/create", addcategory);
router.get("/category/getCategory", getCategories);

module.exports = router;
