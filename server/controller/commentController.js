const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

// Add comment
exports.addComment = async (req, res) => {
  const { content, commenter, commenter_name } = req.body;

  try {
    // Check if the post exists
    const post = await Blog.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Create a new comment
    const comment = await Comment.create({
      content,
      commenter,
      commenter_name,
      post: req.params.postId,
    });

    // Update the post with the new comment
    post.comments.push(comment._id);
    await post.save();

    // Respond with the new comment
    res.status(201).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};


// get all comment
exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res?.status(200).json({
      status: "success",
      data: {
        comments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err?.message,
    });
  }
};
