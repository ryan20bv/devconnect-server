const express = require("express");
const PostsRouter = express.Router();

// @UserRoute    Get api/posts
// @desc         Test route
// @access       Public

PostsRouter.get("/", (req, res) => {
	res.send("Posts Router");
});

module.exports = PostsRouter;
