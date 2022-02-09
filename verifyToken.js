const jwt = require('jsonwebtoken')

function auth(req, res, next) {
	const authHeader = req.headers.token
	if (authHeader) {
		const token = authHeader.split(' ')[1]
		jwt.verify(token, process.env.SECRET, (err, user) => {
			if (err) {
				res.json('Token not found')
			} else {
				req.user = user
				next()
			}
		})
	} else {
		return res.json('You are not authenticated')
	}
}

module.exports = auth
