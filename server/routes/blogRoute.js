const express = require("express");
const blogController = require("./../controller/blogController");
const auth = require("../middleware/auth")

const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.post("/", auth,blogController.createBlog);
router.get("/:id", blogController.getSingleBlog);
router.put('/:id',auth,blogController.updateBlog);
router.delete('/:id',auth,blogController.deleteBlog);

module.exports = router;
