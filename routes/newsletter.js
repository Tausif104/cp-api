const express = require('express')
const NewsLetter = require('../models/Newsletter')
const auth = require('../verifyToken')
const router = express.Router()

// POST - post a newsletter
router.post('/', async (req, res) => {
	try {
		const newsletter = {
			email: req.body.email,
		}

		const newNL = new NewsLetter(newsletter)
		const savedNL = await newNL.save()
		if (savedNL) {
			res.json(savedNL)
		}
	} catch (err) {
		res.json(err)
	}
})

// GET - all newsletters
router.get('/', async (req, res) => {
	try {
		const newsletters = await NewsLetter.find({})
		if (newsletters.length > 0) {
			res.json(newsletters)
		} else {
			res.json({ msg: 'Newsletters not found' })
		}
	} catch (err) {
		res.json(err)
	}
})

// DELETE - delete newsletter
router.delete('/:id', auth, async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const newsletter = await NewsLetter.findByIdAndDelete(req.params.id)
			if (newsletter) {
				res.json(newsletter)
			}
		}
	} catch (err) {
		res.json(err)
	}
})

module.exports = router
