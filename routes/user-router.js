const Router = require('express').Router
const router = new Router()

const UserController = require('../controllers/user-Controller')

const imageUploadMiddleware = require('../middlewares/image-upload-Middleware')
const imageRenameMiddleware = require('../middlewares/image-rename-Middleware')

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', [
  imageUploadMiddleware.single('photo'),
  imageRenameMiddleware,
  UserController.createUser,
])

module.exports = router
