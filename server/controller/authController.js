const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//for signup

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({ ...req.body });

    

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};


//for login

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return next(
        res.status(400).json({
          status: "fail",
          message: "Please provide email and password!!!",
        })
      );
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.passwordCheck(password, user.password))) {
      return next(
        res.status(400).json({
          status: "fail",
          message: "Password or Email is incorrect!!!",
        })
      );
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        ...user._doc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
