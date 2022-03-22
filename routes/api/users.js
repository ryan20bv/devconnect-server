const express = require("express");
const UserRouter = express.Router();
const { check, validationResult } = require("express-validator");

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
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		res.send("User Router");
	}
);

module.exports = UserRouter;
