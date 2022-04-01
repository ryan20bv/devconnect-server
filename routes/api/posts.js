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
	? @access      		private 
*/

PostsRouter.get("/", authMiddleware, async (req, res) => {
	try {
		const posts = await PostModel.find().sort({ date: -1 });
		if (!posts) {
			return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
		}
		res.status(200).send(posts);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Post Network Error");
	}
});

/* 
	* @desc        		get posts by user_id
	! @serverRoute    Get api/posts
	!	@additionalRoute /:user_id
	? @access      		private
*/

PostsRouter.get("/user/:user_id", authMiddleware, async (req, res) => {
	try {
		const posts = await PostModel.find({ userId: req.params.user_id }).sort({
			date: -1,
		});
		if (!posts) {
			return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
		}
		res.status(200).send(posts);
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
		}
		res.status(500).send("Post Network Error");
	}
});

/* 
	* @desc        		get posts by post_id
	! @serverRoute    Get api/posts
	!	@additionalRoute /:post_id
	? @access      		private 
*/

PostsRouter.get("/post/:post_id", authMiddleware, async (req, res) => {
	try {
		const post = await PostModel.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ errors: [{ msg: "Post not found!" }] });
		}
		res.status(200).send(post);
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
		}
		res.status(500).send("Post Network Error");
	}
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

/* 
	* @desc        		delete post
	! @serverRoute    Post api/posts
	!	@additionalRoute /delete/:post_id
	? @access      		Private
	* @desc        		needs auth and express validator
*/

PostsRouter.delete("/delete/:post_id", authMiddleware, async (req, res) => {
	try {
		let post = await PostModel.findById(req.params.post_id);
		if (!post) {
			return res.status(400).json({ errors: [{ msg: "Post not found!" }] });
		}
		if (post.userId.toString() !== req.user.id) {
			return res.status(400).json({ errors: [{ msg: "user unAuthorized!" }] });
		}
		await post.remove();
		res.status(200).send({ msg: "Post remove" });
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
		}
		res.status(500).send("Post Network Error");
	}
});

module.exports = PostsRouter;
