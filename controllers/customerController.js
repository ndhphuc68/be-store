const ApiResponse = require("../dto/apiResponse");
const db = require("../models");

const User = db.user;

const updateCustomer = async (req, res) => {
  let info = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
  };

  const user = await User.create(info);
  res.status(200).send(user);

  console.log(user);
};

const profile = async (req, res) => {
  console.log("dsadsadsa");
  if (req.params.id) {
    const user = await User.findOne({
      where: {
        userId: req.params.id,
      },
    });
    if (user) {
      let profile = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        userId: user.userId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return res.status(200).json(new ApiResponse(true, "success", profile));
    } else {
      return res
        .status(404)
        .json(new ApiResponse(false, "User not found", null));
    }
  } else {
    return res.status(404).json(new ApiResponse(false, "User not found", null));
  }
};

module.exports = { updateCustomer, profile };
