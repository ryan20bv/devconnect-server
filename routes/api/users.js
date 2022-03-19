const express = require("express");
const UserRouter = express.Router();

// @UserRoute    Get api/users
// @desc         Test route
// @access       Public

UserRouter.get("/", (req, res) => {
	res.send("User Router");
});

module.exports = UserRouter;
