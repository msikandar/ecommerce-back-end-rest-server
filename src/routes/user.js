const express = require("express");
const router = express.Router();
const User = require("../models/user"); //import user model

router.post("/signin", (req, res, next) => {});

router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(200).json({
          user: data,
        });
      }
    }); //_user.save
  }); // user.findOne
}); //router post

module.exports = router;
