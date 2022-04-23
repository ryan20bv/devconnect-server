const express = require("express");
const ProfileRouter = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const ProfileModel = require("../../models/ProfileModel.js");
// const userModel = require("../../models/UserModel");
const { check, validationResult } = require("express-validator");
const config = require("config");
const axios = require("axios").default;

/* 
	! @serverRoute    Get api/profile
	!	@additionalRoute /
	* @desc         Get all profile
	? @access       Public 
*/

ProfileRouter.get("/allprofile", async (req, res) => {
	try {
		const profiles = await ProfileModel.find().populate("userId", [
			"name",
			"avatar",
		]);
		res.send({ profiles, loading: false });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Network Error");
	}
});

/* 
	! @serverRoute    Get api/profile
	!	@additionalRoute /user/:user_id
	* @desc         Get profile by user id
	? @access       Public
*/

ProfileRouter.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await ProfileModel.findOne({
			userId: req.params.user_id,
		}).populate("userId", ["name", "avatar"]);
		if (!profile) {
			return res.status(400).json({ errors: { msg: "Profile not found!" } });
		}

		res.send({ profile, loading: false });
	} catch (error) {
		console.log(error.message);
		if (error.kind == "ObjectId") {
			return res.status(400).json({ errors: { msg: "Profile not found!" } });
		}
		res.status(500).send("Network Error");
	}
});

/* 
	* @desc         Get profile in github by githubName
	! @serverRoute    Get api/profile
	!	@additionalRoute /github/:githubName
	? @access       Public
*/

ProfileRouter.get("/github/:githubName", async (req, res) => {
	try {
		const response = await axios({
			url: `https://api.github.com/users/${
				req.params.githubName
			}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				"githubClientId"
			)}&client_secret=${config.get("githubSecret")}`,
			method: "get",
			headers: { "user-agent": "node.js" },
		});

		const { status, data } = response;
		// console.log("status", status);
		// console.log("data", data);
		if (status !== 200) {
			return res.status(404).send({ error: { msg: "No github found!" } });
		} else {
			if (data.length === 0) {
				return res.send({ error: { msg: "No projects found!" } });
			}
			res.send(data);
		}
	} catch (error) {
		// console.log("error", error);
		res.status(404).send({ error: { msg: "No github profile found!" } });
	}
});

/* 
	! @serverRoute    Get api/profile
	!	@additionalRoute /me
	* @desc         Get current user profile
	? @access       Private needs authMiddleware
*/

ProfileRouter.get("/me", authMiddleware, async (req, res) => {
	try {
		//req.user is from authMiddleware
		// console.log('req.user');
		const profile = await ProfileModel.findOne({
			userId: req.user.id,
		}).populate("userId", ["name", "avatar"]);
		if (!profile) {
			return res
				.status(400)
				.json({ error: { msg: "There is no profile for this user!" } });
		}
		res.send({ profile, loading: false });
	} catch (error) {
		// console.log(error.message);
		res.status(500).send("Network Error");
	}
});

/* 
	! @serverRoute    Post api/profile
	!	@additionalRoute /create
	* @desc         Post or Update current user profile
	? @access       Private needs authMiddleware
	* since this is post need express-validator
 */

ProfileRouter.post(
	"/create",
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
				return res.send({ profile, msg: "created", loading: false });
			} else if (!profile) {
				profile = new ProfileModel(profileFields);
				await profile.save();
				res.send({ profile, msg: "updated" });
			}
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Auth Network Error");
		}
	}
);

/* 
	! @serverRoute    PUT api/profile
	!	@additionalRoute /user/experience
	* @desc         PUT/add current user experience array
	? @access       Private needs authMiddleware
	* since this is post need express-validator
 */

ProfileRouter.put(
	"/user/experience",
	[
		authMiddleware,
		[
			check("title", "Title is required!").not().isEmpty(),
			check("company", "Company is required").not().isEmpty(),
			// check("location", "Location is required!").not().isEmpty(),
			check("from", "From is required").not().isEmpty(),
			// check("to", "To is required!").not().isEmpty(),
			// check("current", "Current is required").not().isEmpty(),
			// check("description", "Description is required!").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { title, company, location, from, to, current, description } =
			req.body;
		const newExperience = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};
		try {
			let profile = await ProfileModel.findOne({ userId: req.user.id });
			if (!profile) {
				return res.status(400).json({ errors: [{ msg: "No Profile found" }] });
			}

			if (profile.experience.length === 3) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Max of three (3) experiences only" }] });
			}
			// profile = await ProfileModel.findOneAndUpdate(
			// 	{ userId: req.user.id },
			// 	{ experience: [newExperience, ...profile.experience] },
			// 	{ new: true }
			// );
			profile.experience.unshift(newExperience);
			await profile.save();
			res.send({ profile, msg: "success", loading: false });
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Network Error");
		}
	}
);

/* 
	! @serverRoute    PUT api/profile
	!	@additionalRoute /user/education
	* @desc         PUT/ADD current user education array
	? @access       Private needs authMiddleware
	* since this is post need express-validator
 */

ProfileRouter.put(
	"/user/education",
	[
		authMiddleware,
		[
			check("school", "School is required!").not().isEmpty(),
			check("degree", "Degree is required").not().isEmpty(),
			// check("fieldofstudy", "Fieldofstudy is required!").not().isEmpty(),
			check("from", "From is required").not().isEmpty(),
			// check("to", "To is required!").not().isEmpty(),
			// check("current", "Current is required").not().isEmpty(),
			// check("description", "Description is required!").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { school, degree, fieldofstudy, from, to, current, description } =
			req.body;
		const newEducation = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description,
		};
		try {
			let profile = await ProfileModel.findOne({ userId: req.user.id });
			if (!profile) {
				return res.status(400).json({ errors: [{ msg: "No Profile found" }] });
			}

			if (profile.education.length === 3) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Max of three (3) education only" }] });
			}
			// profile = await ProfileModel.findOneAndUpdate(
			// 	{ userId: req.user.id },
			// 	{ education: [newEducation, ...profile.education] },
			// 	{ new: true }
			// );
			profile.education.unshift(newEducation);
			await profile.save();
			res.send({ profile, msg: "success", loading: false });
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Network Error");
		}
	}
);

/* 
	! @serverRoute    DELETE api/profile
	!	@additionalRoute /user/delete
	* @desc         DELETE current user profile
	? @access       Private needs authMiddleware
 */

ProfileRouter.delete("/user/delete", authMiddleware, async (req, res) => {
	try {
		const profile = await ProfileModel.findOneAndDelete({
			userId: req.user.id,
		});
		if (!profile) {
			return res.status(400).json({ errors: [{ msg: "No Profile found" }] });
		}
		res.send({ msg: "User profile deleted" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Network Error");
	}
});

/* 
	! @serverRoute    DELETE api/profile
	!	@additionalRoute /user/experience/:experience_id
	* @desc         DELETE current user experience
	? @access       Private needs authMiddleware
*/
// todo: delete each experience
ProfileRouter.delete(
	"/user/experience/:experience_id",
	authMiddleware,
	async (req, res) => {
		try {
			let profile = await ProfileModel.findOne({ userId: req.user.id });
			let newExperiences = profile.experience.filter((each) => {
				if (each.id !== req.params.experience_id) {
					return each;
				}
			});
			// console.log(newExperiences);
			// profile = await ProfileModel.findOneAndUpdate(
			// 	{ userId: req.user.id },
			// 	{ experience: newExperiences },
			// 	{ new: true }
			// );
			profile.experience = [...newExperiences];
			await profile.save();
			res.send({ profile, msg: "Experience deleted", loading: false });
		} catch (error) {
			console.log(error.message);
			if (error.kind == "ObjectId") {
				return res
					.status(400)
					.json({ errors: [{ msg: "Profile not found!" }] });
			}
			res.status(500).send("Network Error");
		}
	}
);

/* 
	! @serverRoute    DELETE api/profile
	!	@additionalRoute /user/education/:education_id
	* @desc         DELETE current user experience
	? @access       Private needs authMiddleware
*/
// todo: delete each education
ProfileRouter.delete(
	"/user/education/:education_id",
	authMiddleware,
	async (req, res) => {
		try {
			let profile = await ProfileModel.findOne({ userId: req.user.id });
			let newEducations = profile.education.filter((each) => {
				if (each.id !== req.params.education_id) {
					return each;
				}
			});
			// console.log(newEducations);
			// profile = await ProfileModel.findOneAndUpdate(
			// 	{ userId: req.user.id },
			// 	{ education: newEducations },
			// 	{ new: true }
			// );
			profile.education = [...newEducations];
			await profile.save();
			res.send({ profile, msg: "Education deleted", loading: false });
		} catch (error) {
			console.log(error.message);
			if (error.kind == "ObjectId") {
				return res
					.status(400)
					.json({ errors: [{ msg: "Profile not found!" }] });
			}
			res.status(500).send("Network Error");
		}
	}
);

module.exports = ProfileRouter;
