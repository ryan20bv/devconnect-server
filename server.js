require("dotenv").config();
const express = require("express");

const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json({ extended: false }));
connectDB();

app.get("/", (req, res) => {
	res.send("API running");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// define routes
const UserRouter = require("./routes/api/users");
app.use("/api/users", UserRouter);

const AuthRouter = require("./routes/api/auth");
app.use("/api/auth", AuthRouter);

const ProfileRouter = require("./routes/api/profile");
app.use("/api/profile", ProfileRouter);

const PostsRouter = require("./routes/api/posts");
app.use("/api/posts", PostsRouter);
