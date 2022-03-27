const express = require("express");
const ProfileRouter = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const ProfileModel = require("../../models/ProfileModel.js");
const userModel = require("../../models/UserModel");
const { check, validationResult } = require("express-validator");

// @UserRoute    Get api/Profile/
// @desc         Get all profile
// @access       Public
ProfileRouter.get("/", async (req, res) => {
	try {
		const profiles = await ProfileModel.find().populate("userId", [
			"name",
			"avatar",
		]);
		res.send(profiles);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Network Error");
	}
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
		}).populate("userId", ["name", "avatar"]);
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

// @UserRoute    Get api/Profile
// @desc         Post or Update current user profile
// @access       Private needs authMiddleware
// since this is post need express-validator

ProfileRouter.post(
	"/",
	[
		authMiddleware,
		[
			check("status", "Status is required!").not().isEmpty(),
			check("skills", "Skills is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			status,
			skills,
			bio,
			githubusername,
			youtube,
			twitter,
			facebook,
			linkedin,
			instagram,
		} = req.body;
		let profileFields = {};
		profileFields.userId = req.user.id;
		if (skills)
			profileFields.skills = skills.split(",").map((skill) => skill.trim());
		if (status) profileFields.status = status;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (githubusername) profileFields.githubusername = githubusername;
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		try {
			let profile = await ProfileModel.findOne({ userId: req.user.id });
			if (profile) {
				profile = await ProfileModel.findOneAndUpdate(
					{ userId: req.user.id },
					profileFields,
					{ new: true }
				);
				return res.send(profile);
			} else if (!profile) {
				profile = new ProfileModel(profileFields);
				await profile.save();
				res.send(profile);
			}
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Auth Network Error");
		}
	}
);

module.exports = ProfileRouter;
