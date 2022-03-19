const express = require("express");
const AuthRouter = express.Router();

// @UserRoute    Get api/auth
// @desc         Test route
// @access       Public

AuthRouter.get("/", (req, res) => {
	res.send("Auth Router");
});

module.exports = AuthRouter;
