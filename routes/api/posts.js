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
			return res.status(400).json({ errors: { msg: "Posts not found!" } });
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
			return res.status(400).json({ error: { msg: "Post not found!" } });
		}
		res.status(200).send(post);
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ error: { msg: "Posts not found!" } });
		}
		res.status(500).send("Post Network Error");
	}
});

/* 
	* @desc        		Post post
	! @serverRoute    Post api/posts
	!	@additionalRoute /newpost
	? @access      		Private
	* @desc        		needs auth and express validator
*/

PostsRouter.post(
	"/newpost",
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
			res.status(200).send({ post, msg: "Success" });
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

/* 
	* @desc        		like a post
	! @serverRoute    PUT api/posts
	!	@additionalRoute /like/:post_id
	? @access      		Private
	* @desc        		needs auth and express validator
*/
PostsRouter.put("/like/:post_id", authMiddleware, async (req, res) => {
	try {
		let post = await PostModel.findById(req.params.post_id);
		let user = post.likes.filter((like) => {
			return like.userId.toString() === req.user.id;
		});
		if (user.length > 0) {
			return res.status(400).send("Already liked!");
		}
		post.likes.unshift({ userId: req.user.id });
		await post.save();
		res.status(200).send(post.likes);
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
		}
		res.status(500).send("Likes Network Error");
	}
});

/* 
	* @desc        		unlike a post
	! @serverRoute    PUT api/posts
	!	@additionalRoute /unlike/:post_id
	? @access      		Private
	* @desc        		needs auth and express validator
*/
PostsRouter.put("/unlike/:post_id", authMiddleware, async (req, res) => {
	try {
		let post = await PostModel.findById(req.params.post_id);
		let user = post.likes.filter((like) => {
			return like.userId.toString() === req.user.id;
		});
		if (user.length === 0) {
			return res.status(400).send("Not yet liked!");
		}
		post.likes = post.likes.filter((like) => {
			return like.userId.toString() !== req.user.id;
		});
		await post.save();
		res.status(200).send("unlike post");
	} catch (error) {
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
		}
		res.status(500).send("Likes Network Error");
	}
});

/* 
	* @desc        		comment to a post
	! @serverRoute    PUT api/posts
	!	@additionalRoute /comment/:post_id
	? @access      		Private
	* @desc        		needs auth and express validator and check because sending a body
*/

PostsRouter.put(
	"/comment/:post_id",
	[authMiddleware, [check("text", "Text is requires").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await UserModel.findById(req.user.id);
			const newComment = {
				userId: req.user.id,
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
			};

			let post = await PostModel.findById(req.params.post_id);
			post.comments.unshift(newComment);
			await post.save();
			res.status(200).send(post.comments);
		} catch (error) {
			if (error.kind == "ObjectId") {
				return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
			}
			res.status(500).send("Comments Network Error");
		}
	}
);

/* 
	* @desc        		delete comment to a post
	! @serverRoute    PUT api/posts
	!	@additionalRoute /comment/:post_id/delete/:comment_id
	? @access      		Private
	* @desc        		needs auth and express validator
*/

PostsRouter.put(
	"/comment/:post_id/delete/:comment_id",
	authMiddleware,
	async (req, res) => {
		try {
			let post = await PostModel.findById(req.params.post_id);
			// const commentToDelete = post.comments.filter((comment) => {
			// 	return comment._id.toString() === req.params.comment_id;
			// });
			const commentToDelete = post.comments.find((comment) => {
				return comment._id.toString() === req.params.comment_id;
			});
			// check if the user id of the comment is the user id that is deleting
			if (commentToDelete.userId.toString() !== req.user.id) {
				return res
					.status(400)
					.json({ errors: [{ msg: "user unAuthorized!" }] });
			}
			post.comments = post.comments.filter((comment) => {
				return comment._id.toString() !== req.params.comment_id;
			});
			await post.save();
			res.status(200).send(post.comments);
		} catch (error) {
			if (error.kind == "ObjectId") {
				return res.status(400).json({ errors: [{ msg: "Posts not found!" }] });
			}
			res.status(500).send("Delete Comments Network Error");
		}
	}
);

module.exports = PostsRouter;
