const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!!!"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email!!!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email!!!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!!!"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide a confirm password!!!"],
    validate: {
      validator: (el) =>
        function () {
          return el !== this.password;
        },
    },
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
  } else {
    next();
  }
});

userSchema.methods.passwordCheck = async function (
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
