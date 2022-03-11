const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
	{
		thumbnail: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		designation: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Team = mongoose.model('Team', teamSchema)
module.exports = Team
