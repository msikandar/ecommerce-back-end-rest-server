const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * function to register a new user
 * @param {object} req
 * @param {object} res
 */
exports.signup = (req, res) => {
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
      userName: Math.random().toString(),
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
          message: "User created successfully",
        });
      }
    }); //_user.save
  }); // user.findOne
};

/**
 * function to validate signin by email and password
 * @param {object} req
 * @param {object} res
 */
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error: error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        // return res.status(200).json({ message: "login success" });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, password, fullName } =
          user;
        return res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            password,
            fullName,
          },
        });
      } else {
        res.status(400).json({ massage: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  });
};

/**
 * middleware function to verify token
 * @param {object} req user request object to server
 * @param {object} res response object from server to user
 * @param {function} next callback function
 */
exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  var user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};