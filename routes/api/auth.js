const express = require("express");
const AuthRouter = express.Router();
const authMiddleware = require("../../middleware/authMiddleware.js");
const UserModel = require("../../models/UserModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

/* 
	! @UserRoute    Get api/auth
	!	@additionalRoute /
	* @desc         authenticate
	? @access       Private need authMiddleware
 */

AuthRouter.get("/", authMiddleware, async (req, res) => {
	try {
		// user.id is from AuthMiddleware
		const user = await UserModel.findById(req.user.id).select("-password");
		res.send(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ errors: [{ msg: "Server error!" }] });
	}
});

/* 
	! @UserRoute    POST api/auth
	!	@additionalRoute /login
	* @desc         Log in user
	? @access       Public
	* since this is post needs express-validator
 */

AuthRouter.post(
	"/login",
	// ! Validate request using express-validator
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Please enter a password with 6 or more characters")
			.not()
			.isEmpty(),
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
			const user = await UserModel.findOne({ email: email });
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
				res.json({ token: token, msg: "success" });
			});
			// res.send("auth");
		} catch (error) {
			console.log(error.message);
			res.status(500).send("Auth Network Error");
		}
	}
);

module.exports = AuthRouter;
