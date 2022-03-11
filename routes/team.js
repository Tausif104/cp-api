const express = require('express')
const router = express.Router()
const Team = require('../models/Team')
const auth = require('../verifyToken')

// post
router.post('/', auth, async (req, res) => {
	if (req.user.isAdmin) {
		const team = {
			thumbnail: req.body.thumbnail,
			name: req.body.name,
			designation: req.body.designation,
		}

		const newTeam = new Team(team)
		const createdTeam = await newTeam.save()
		if (createdTeam) {
			res.status(201).json(createdTeam)
		}
	}
})

// get
router.get('/', async (req, res) => {
	const teamMembers = await Team.find({})
	if (teamMembers.length > 0) {
		res.json(teamMembers)
	} else {
		res.json({ msg: 'No members found' })
	}
})

// put
router.put('/:id', auth, async (req, res) => {
	if (req.user.isAdmin) {
		const team = await Team.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{
				new: true,
			}
		)
		res.json(team)
	}
})

// delete
router.delete('/:id', auth, async (req, res) => {
	if (req.user.isAdmin) {
		const team = await Team.findByIdAndDelete(req.params.id)
		if (team) {
			res.json(team)
		}
	}
})

module.exports = router
