const express = require("express");
const router = express.Router();
const { signup, signin } = require("../../controller/admin/auth");
const {
  validateRequestSignup,
  validateRequestSignin,
  isRequestValidated,
} = require("../../validators/auth");

router.post("/admin/signin", validateRequestSignin, isRequestValidated, signin); // signin router for admin

router.post("/admin/signup", validateRequestSignup, isRequestValidated, signup); //signup router for admin

module.exports = router;
