const express = require('express')
const Post = require('../models/Post')
const auth = require('../verifyToken')

const router = express.Router()

// POST - create post route
router.post('/', auth, async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const post = {
				title: req.body.title,
				thumbnail: req.body.thumbnail,
				description: req.body.description,
			}

			const newPost = new Post(post)
			const createdPost = await newPost.save()
			if (createdPost) {
				res.json(createdPost)
			}
		} else {
			res.json({ msg: 'You are not the admin' })
		}
	} catch (err) {
		res.json(err)
	}
})

// GET - get all blog posts
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find({})
		const postCount = await Post.count()
		if (posts.length > 0) {
			res.json(posts)
		} else {
			res.json({ msg: 'No posts found' })
		}
	} catch (err) {
		res.json(err)
	}
})

// GET - get a single blog post
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post) {
			res.json(post)
		} else {
			res.json({ msg: 'Post not found' })
		}
	} catch (err) {
		res.json(err)
	}
})

// DELETE - delete blog post
router.delete('/:id', auth, async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const post = await Post.findByIdAndDelete(req.params.id)
			if (post) {
				res.json(post)
			}
		}
	} catch (err) {
		res.json(err)
	}
})

// PUT - update blog post
router.put('/:id', auth, async (req, res) => {
	try {
		if (req.user.isAdmin) {
			const post = await Post.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			if (post) {
				res.json(post)
			}
		}
	} catch (err) {
		res.json(err)
	}
})

module.exports = router
