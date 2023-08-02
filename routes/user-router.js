const UserController = require('../controllers/user-controller')
const Router = require('express').Router
const router = new Router()

router.get('/', UserController.getUsers)

module.exports = router
