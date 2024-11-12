import express from 'express'
import { HOST, PORT } from './config.js'
import swaggerSetup from './swagger.js'
const app = express()

import TokenRouter from './routes/1.token-router.js'
import UserRouter from './routes/2.user-router.js'
import PositionRouter from './routes/3.position-router.js'

app.use(express.static('public'))
app.use(express.json())

app.use('/token', TokenRouter)
app.use('/users', UserRouter)
app.use('/positions', PositionRouter)

swaggerSetup(app)

app.listen(PORT, error => {
	error
		? console.log(`Server: ${error.message}`)
		: console.log(`Server: Started successfully,
            Listening on ${HOST}:${PORT}`)
})
