const jwt = require("jsonwebtoken");
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
  