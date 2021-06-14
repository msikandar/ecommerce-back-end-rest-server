const User = require("../../models/user");
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
        message: "Already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
      role: "admin",
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
          message: "Admin created successfully",
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
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error: error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "admin") {
        // return res.status(200).json({ message: "login success" });
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
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
        res.status(400).json({ message: "Invalid User or Password" });
      }
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  });
};
