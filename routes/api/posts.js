const express = require("express");
const PostsRouter = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const UserModel = require("../../models/UserModel");
const PostModel = require("../../models/PostModel");
// const ProfileModel = require("../../models/ProfileModel");

/* 
	* @desc        		get all post
	! @serverRoute    Get api/posts
	!	@additionalRoute /
	? @access      		Public 
*/

PostsRouter.get("/", async (req, res) => {
	const posts = await PostModel.find();
	res.status(200).send(posts);
});

/* 
	* @desc        		Post post
	! @serverRoute    Post api/posts
	!	@additionalRoute /
	? @access      		Private
	* @desc        		needs auth and express validator
*/

PostsRouter.post(
	"/",
	[authMiddleware, [check("text", "Text is required!").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await UserModel.findById(req.user.id).select("-password");
			const newPost = new PostModel({
				userId: user._id,
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
			});
			const post = await newPost.save();
			res.status(200).send(post);
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Post Network Error");
		}
	}
);

module.exports = PostsRouter;
