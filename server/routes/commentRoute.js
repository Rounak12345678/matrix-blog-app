const express = require("express");
const commentController = require("./../controller/commentController");

const router = express.Router();

router.post("/:postId", commentController.addComment);
router.get("/", commentController.getAllComments);



module.exports = router;
