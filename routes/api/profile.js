const express = require("express");
const ProfileRouter = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const ProfileModel = require("../../models/ProfileModel.js");
const userModel = require("../../models/UserModel");

// @UserRoute    Get api/Profile/
// @desc         Test route
// @access       Public
ProfileRouter.get("/", (req, res) => {
	res.send("Test Profile Router");
});

// @UserRoute    Get api/Profile/me
// @desc         Get current user profile
// @access       Private needs authMiddleware
ProfileRouter.get("/me", authMiddleware, async (req, res) => {
	try {
		//req.user is from authMiddleware
		// console.log('req.user');
		const userProfile = await ProfileModel.findOne({
			userId: req.user.id,
		}).populate("userModel", ["name", "avatar"]);
		if (!userProfile) {
			return res
				.status(400)
				.json({ errors: [{ msg: "There is no profile for this user!" }] });
		}
		res.send(userProfile);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Network Error");
	}
});

module.exports = ProfileRouter;
