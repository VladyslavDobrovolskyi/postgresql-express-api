require('dotenv').config()

const express = require('express')
const app = express()
const UserRouter = require('./routes/user-router')

app.listen(3000)

app.use('/users', UserRouter)
