const express = require("express");
const router = express.Router();
const { signup, signin, requireSignin } = require("../controller/auth");

router.post("/signin", signin);

router.post("/signup", signup); //router post

router.get("/profile", requireSignin, (req, res) => {
  res.status(400).json({ user: "profile" });
});

module.exports = router;
