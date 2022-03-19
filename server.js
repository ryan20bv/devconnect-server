require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;
const app = express();

connectDB();

app.get("/", (req, res) => {
	res.send("API running");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// define routes
const UserRouter = require("./routes/api/users");
app.use("/api/users", UserRouter);
const AuthRouter = require("./routes/api/auth");
app.use("/api/auth", AuthRouter);
const ProfileRouter = require("./routes/api/profile");
app.use("/api/profile", ProfileRouter);
const PostsRouter = require("./routes/api/posts");
app.use("/api/posts", PostsRouter);
