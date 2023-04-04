const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models");
const User = db.user;

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!(username && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ where: { username: username } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    let userRegister = {
      username: username,
      password: encryptedPassword,
      firstName: name,
    };

    console.log(userRegister);

    const user = await User.create(userRegister);

    const token = jwt.sign(
      { user_id: user._userId, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "10h",
      }
    );

    userRegister.token = token;

    res.status(200).json(userRegister);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
};
