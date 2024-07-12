const User = require("./../models/userModel");

//get all user

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "No users Found!!!",
    });
  }
};

//get current user

exports.getCurrentUser = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id).select("-password");
    res.status(200).json({
      status: "success",
      data: {
        currentUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "No users Found!!!",
    });
  }
};
