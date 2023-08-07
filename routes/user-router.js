const Router = require('express').Router
const router = new Router()

const UserController = require('../controllers/user-Controller')

const imageUploadMiddleware = require('../middlewares/image-upload-Middleware')
const imageSaveMiddleware = require('../middlewares/image-save-Middleware')
const errorHandler = require('../middlewares/error-handler-Middleware')
const validationMiddleware = require('../middlewares/validation-Middleware')
const upload = require('../middlewares/image-upload-Middleware')

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', [
  imageUploadMiddleware,
  validationMiddleware,
  imageSaveMiddleware(),
  UserController.createUser,
  errorHandler,
])

module.exports = router
