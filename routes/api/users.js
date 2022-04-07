const express = require("express");
const UserRouter = express.Router();
const { check, validationResult } = require("express-validator");
const UserModel = require("../../models/UserModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");
const authMiddleware = require("../../middleware/authMiddleware");
const ProfileModel = require("../../models/ProfileModel");

/* 
	! @serverRoute    GET api/users
	!	@additionalRoute /
	* @desc         get user
	? @access       Public
 */

UserRouter.get("/", async (req, res) => {
	const users = await UserModel.find({});
	// res.send("ger user");

	res.send(users);
});

/* 
	! @UserRoute    POST api/users
	!	@additionalRoute /register
	* @desc         Register user
	? @access       Public
	* validate req / user input using 'express-validator'
*/

UserRouter.post(
	"/register",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please enter a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		try {
			let user = await UserModel.findOne({ email: email });
			if (user) {
				return res.status(400).json({ msg: "User already exist!" });
			}
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new UserModel({
				name: name,
				email: email,
				avatar: avatar,
				password: password,
			});

			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, salt);
			user.password = hashPassword;

			await user.save();
			// console.log(user);
			// res.send("User registered!");

			const payload = {
				user: {
					id: user._id,
				},
			};

			jwt.sign(payload, jwtSecret, { expiresIn: "5h" }, (err, token) => {
				if (err) throw err;
				res.json({ token: token });
			});
		} catch (error) {
			console.log(error.message);
			res.status(500).send("user Network Error");
		}
		// res.send("User");
	}
);

/* 
	! @UserRoute    DELETE api/users
	!	@additionalRoute /delete
	* @desc         DELETE user and user profile
	? @access       Private needs authMiddleware
 */

UserRouter.delete("/delete", authMiddleware, async (req, res) => {
	try {
		// todo: delete post
		// * delete profile of the user
		let profile = await ProfileModel.findOne({ userId: req.user.id });
		if (profile) {
			profile = await ProfileModel.findOneAndDelete({ userId: req.user.id });
		}
		// * delete the user
		await UserModel.findByIdAndDelete(req.user.id);
		res.send({ msg: "User deleted" });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("user Network Error");
	}
});

module.exports = UserRouter;
