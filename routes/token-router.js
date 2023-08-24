import { Router } from 'express'
import TokenController from '../controllers/token-controller.js'

const router = Router()

router.get('/', TokenController.getToken)

export default router
