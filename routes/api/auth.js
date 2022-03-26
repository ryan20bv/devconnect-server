const express = require("express");
const AuthRouter = express.Router();
const authMiddleware = require("../../middleware/authMidd");
const UserModel = require("../../models/UserModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

// @UserRoute    Get api/auth
// @desc         authenticate
// @access       Public

AuthRouter.get("/", authMiddleware, async (req, res) => {
	try {
		const user = await UserModel.findById(req.user.id).select("-password");
		res.send(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ errors: [{ msg: "Server error!" }] });
	}
});

// @UserRoute    POST api/auth
// @desc         Log in user
// @access       Public

AuthRouter.post(
	"/",
	// ! Validate request using express-validator
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Password is required!").exists(),
	],
	async (req, res) => {
		// to get if there are errors in validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			// check if user exists
			const user = await UserModel.findOne({ email: email }).select(
				"-password"
			);
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Incorrect Username/Email or Password!" }] });
			}

			// user is found email is valid
			// check or decode password using bcryptjs compare
			const isMatched = await bcrypt.compare(password, user.password);
			// if isMatched = false
			if (!isMatched) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Incorrect Username/Email or Password!" }] });
			}

			// if isMatched = true produce token
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
			res.status(500).send("Network Error");
		}
	}
);

module.exports = AuthRouter;
