const express = require("express");
const UserRouter = express.Router();
const { check, validationResult } = require("express-validator");
const UserModel = require("../../models/UserModel");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @UserRoute    POST api/users
// @desc         Register user
// @access       Public

UserRouter.get("/", (req, res) => {
	res.send("ger user");
});

UserRouter.post(
	"/",
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
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exist!" }] });
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

			res.send("User registered!");
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Network Error");
		}
		// res.send("User");
	}
);

module.exports = UserRouter;
