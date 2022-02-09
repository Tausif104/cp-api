const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const newsLetterRouter = require('./routes/newsletter')
const contactRouter = require('./routes/contact')

const app = express()
dotenv.config()
connectDB()

app.use(express.json())

app.get('/', (req, res) => {
	res.json('Server found')
})

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/newsletters', newsLetterRouter)
app.use('/api/contact', contactRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
