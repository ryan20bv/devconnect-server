const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	text: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
	likes: [
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		},
	],
	comments: [
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model("Post", postsSchema);
