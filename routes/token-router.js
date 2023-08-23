import { Router } from 'express'
import TokenController from '../controllers/token-Controller.js'

const router = Router()

router.get('/', TokenController.getToken)

export default router
