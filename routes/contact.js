const express = require('express')
const Contact = require('../models/Contact')
const router = express.Router()
const auth = require('../verifyToken')

// POST - post a contact info
router.post('/', async (req, res) => {
	try {
		const contactInfo = {
			name: req.body.name,
			email: req.body.email,
			company: req.body.company,
			phone: req.body.phone,
			message: req.body.message,
		}

		const newContact = new Contact(contactInfo)
		const savedContact = await newContact.save()
		if (savedContact) {
			res.status(201).json(savedContact)
		}
	} catch (err) {
		res.status(500).json(err)
	}
})

// GET - get all contact infos
router.get('/', async (req, res) => {
	try {
		const contacts = await Contact.find({})
		res.status(200).json(contacts)
	} catch (err) {
		res.status(500).json(err)
	}
})

// DELETE - delete contact
router.delete('/:id', auth, async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const contact = await Contact.findByIdAndDelete(req.params.id)
			if (contact) {
				res.json(contact)
			}
		}
	} catch (err) {
		res.json(err)
	}
})

module.exports = router
