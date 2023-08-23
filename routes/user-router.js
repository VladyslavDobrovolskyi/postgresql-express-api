import { Router } from 'express'
import UserController from '../controllers/user-controller.js'
import imageSaveMiddleware from '../middlewares/image-save-Middleware.js'
import imageUploadMiddleware from '../middlewares/image-upload-Middleware.js'
import paginationMiiddleware from '../middlewares/pagination-Middleware.js'
import pagValidationMiddleware from '../middlewares/pagvalidation-Middleware.js'
import tokenMiddleware from '../middlewares/token-Middleware.js'
import uniqueEmailNumberMiddleware from '../middlewares/uniqueEmailNumber-Middleware.js'
import validationMiddleware from '../middlewares/validation-Middleware.js'

const router = Router()

router.get(
  '/',
  pagValidationMiddleware,
  paginationMiiddleware,
  UserController.getUsers
)
router.get('/:id', UserController.getUserById)
router.post('/', [
  tokenMiddleware,
  imageUploadMiddleware,
  validationMiddleware,
  uniqueEmailNumberMiddleware,
  imageSaveMiddleware(),
  UserController.createUser,
])

export default router
