const UserController = require('../controllers/user-controller')
const Router = require('express').Router
const router = new Router()

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', UserController.createUser)

module.exports = router
