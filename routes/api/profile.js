const express = require("express");
const ProfileRouter = express.Router();

// @UserRoute    Get api/Profile
// @desc         Test route
// @access       Public
ProfileRouter.get("/", (req, res) => {
	res.send("Profile Router");
});

module.exports = ProfileRouter;
