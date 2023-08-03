const { PORT, HOST } = require('./config')

const express = require('express')
const app = express()

const TokenRouter = require('./routes/token-router')
const UserRouter = require('./routes/user-router')
const PositionRouter = require('./routes/position-router')

app.use(express.json())

app.use('/token', TokenRouter)
app.use('/users', UserRouter)
app.use('/position', PositionRouter)

app.listen(PORT, error => {
  error
    ? console.log(`Server: ${error.message}`)
    : console.log(`Server: Started successfully,
            Listening on ${HOST}:${PORT}`)
})
