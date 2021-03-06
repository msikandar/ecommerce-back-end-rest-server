const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const { addcategory, getCategories } = require("../controller/category");
const router = express.Router();
const shortid = require("shortid");
var multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/category/create", requireSignin, adminMiddleware,upload.single("categoryImage"), addcategory);
router.get("/category/getCategory", getCategories);

module.exports = router;
