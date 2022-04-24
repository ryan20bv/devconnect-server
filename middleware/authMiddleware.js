const jwt = require("jsonwebtoken");
const config = require("config");
const jwtSecret = config.get("jwtSecret");

module.exports = AuthMiddleware = function (req, res, next) {
	// console.log(req.header("x-auth-token"));
	const token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.send({ error: { msg: "No token, authorization denied!" } });
	}
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(500).send({ error: { msg: "Token is not valid!" } });
	}
};
