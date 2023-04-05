const jwt = require("jsonwebtoken");

const config = process.env;
const db = require("../models");
const User = db.user;

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const user = await User.findOne({ where: { username: decoded.username } });
    if (!user) {
      res.status(401).send({ error: "User not exit" });
    }
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
