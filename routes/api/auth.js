const express = require("express");
const AuthRouter = express.Router();
const authMiddleware = require("../../middleware/auth");
const UserModel = require("../../models/UserModel");

// @UserRoute    Get api/auth
// @desc         Test route
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

module.exports = AuthRouter;
