const Blog = require("../models/blogModel");

// create post
exports.createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const post = await Blog.create({
      title,
      content,
      author: req.user.id,
    });
    res?.status(201).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err?.message,
    });
  }
};

// Get all posts

exports.getAllBlogs = async (req, res, next) => {
  try {
    const post = await Blog.find()
      .populate("author", ["name"])
      .populate("comments", ["content", "commenter"]);
    res?.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err?.message,
    });
  }
};

// Get post by ID
exports.getSingleBlog = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
      .populate("author", ["name"])
      .populate("comments", [""]);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res?.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err?.message,
    });
  }
};

// Update post
exports.updateBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    let post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    let updatedPost = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res?.status(200).json({
      status: "success",
      data: {
        updatedPost,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete post
exports.deleteBlog = async (req, res) => {
  try {
    let post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
