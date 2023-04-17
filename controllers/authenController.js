const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../models");
const Constants = require("../utils/constants");
const ApiResponse = require("../dto/apiResponse");
const Role = require("../utils/role");
const User = db.user;

const register = async (req, res) => {
  try {
    const { name, username, password, phone, email } = req.body;

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
      phone: phone ? phone : "",
      email: email ? email : "",
      role: Constants.CUSTOMER,
    };
    const user = await User.create(userRegister);

    const token = jwt.sign(
      { user_id: user._userId, username,role: Role.CUSTOMER },
      process.env.TOKEN_KEY,
      {
        expiresIn: "10h",
      }
    );

    userRegister.token = token;
    userRegister.password = "";

    res
      .status(200)
      .json(new ApiResponse(true, Constants.CREATE_USER_SUCCESS, userRegister));
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where: { username: username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._userId, username, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10h",
        }
      );

      let userLogin = {
        token: token,
        role: user.role,
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
      };

      return res
        .status(200)
        .json(new ApiResponse(true, Constants.LOGIN_SUCCESS, userLogin));
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
