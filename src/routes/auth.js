const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controller/auth");
const { requireSignin } = require("../common-middleware/auth");
const {
  validateRequestSignup,
  validateRequestSignin,
  isRequestValidated,
} = require("../validators/auth");

router.post("/signin", validateRequestSignin, isRequestValidated, signin);

router.post("/signup", validateRequestSignup, isRequestValidated, signup); //router post

router.get("/profile", requireSignin, (req, res) => {
  res.status(400).json({ user: "profile" });
});

module.exports = router;
