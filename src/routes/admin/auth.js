const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controller/admin/auth");

router.post("/admin/signin", signin); // signin router for admin

router.post("/admin/signup", signup); //signup router for admin

module.exports = router;
