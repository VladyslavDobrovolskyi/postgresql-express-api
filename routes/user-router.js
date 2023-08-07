const Router = require('express').Router
const router = new Router()

const UserController = require('../controllers/user-Controller')

const imageUploadMiddleware = require('../middlewares/image-upload-Middleware')
const imageSaveMiddleware = require('../middlewares/image-save-Middleware')
const validationMiddleware = require('../middlewares/validation-Middleware')

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', [
  imageUploadMiddleware,
  validationMiddleware,
  imageSaveMiddleware(),
  UserController.createUser,
])

module.exports = router
