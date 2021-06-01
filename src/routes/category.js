const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { addcategory, getCategories } = require("../controller/category");
const router = express.Router();

router.post("/category/create", requireSignin, adminMiddleware, addcategory);
router.get("/category/getCategory", getCategories);

module.exports = router;
