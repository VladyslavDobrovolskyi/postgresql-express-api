const Router = require('express').Router
const router = new Router()

const UserController = require('../controllers/user-controller')

const tokenMiddleware = require('../middlewares/token-Middleware')
const uniqueEmailNumberMiddleware = require('../middlewares/uniqueEmailNumber-Middleware')
const imageUploadMiddleware = require('../middlewares/image-upload-Middleware')
const imageSaveMiddleware = require('../middlewares/image-save-Middleware')
const validationMiddleware = require('../middlewares/validation-Middleware')

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', [
  tokenMiddleware,
  imageUploadMiddleware,
  validationMiddleware,
  uniqueEmailNumberMiddleware,
  imageSaveMiddleware(),
  UserController.createUser,
])

module.exports = router
