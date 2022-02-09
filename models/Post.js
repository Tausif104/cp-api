const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post
