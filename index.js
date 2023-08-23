import express from 'express'
import { HOST, PORT } from './config.js'

const app = express()

import PositionRouter from './routes/position-router.js'
import TokenRouter from './routes/token-router.js'
import UserRouter from './routes/user-router.js'

app.use(express.static('public'))
app.use(express.json())

app.use('/token', TokenRouter)
app.use('/users', UserRouter)
app.use('/positions', PositionRouter)

app.listen(PORT, error => {
  error
    ? console.log(`Server: ${error.message}`)
    : console.log(`Server: Started successfully,
            Listening on ${HOST}:${PORT}`)
})
