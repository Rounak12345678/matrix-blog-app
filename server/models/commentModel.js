const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commenter_name: {
    type: String,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
