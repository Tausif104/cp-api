const express = require('express')
const dotenv = require('dotenv')
const multer = require('multer')
const connectDB = require('./config/db')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const newsLetterRouter = require('./routes/newsletter')
const contactRouter = require('./routes/contact')
const teamRouter = require('./routes/team')

const app = express()
dotenv.config()
connectDB()

app.use(express.json())

app.get('/', (req, res) => {
	res.json('Server found')
})

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, req.body)
	},
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded')
})

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/newsletters', newsLetterRouter)
app.use('/api/contact', contactRouter)
app.use('/api/member', contactRouter)
app.use('/api/team', teamRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
