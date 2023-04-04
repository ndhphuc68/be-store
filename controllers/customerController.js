const db = require("../models");

const User = db.user;

const createUser = async (req, res) => {
  let info = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
  };

  const user = await User.create(info);
  res.status(200).send(user);

  console.log(user);
};

module.exports = { createUser };
