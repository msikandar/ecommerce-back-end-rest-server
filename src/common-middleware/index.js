const jwt = require("jsonwebtoken");
/**
 * middleware function to verify token
 * @param {object} req user request object to server
 * @param {object} res response object from server to user
 * @param {function} next callback function
 */
exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    var user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "Authorization required" });
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role != "user")
    return res.status(400).json({ message: "User Access Denied" });
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role != "admin")
    return res.status(400).json({ message: "Admin Access Denied" });
  next();
};
