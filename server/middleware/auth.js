const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Adjust the path as necessary

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token)

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET); // Remove "Bearer " prefix if present
    // console.log(decoded, "req.user");
    req.user = await User.findById(decoded.id).select("-password"); // Fetch user details from the database

    if (!req.user) {
      return res.status(401).json({ msg: "Token is not valid" });
    }

    next(); // Move to the next middleware or route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token is expired" });
    }
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
