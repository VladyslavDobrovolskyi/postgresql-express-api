import { Router } from 'express'
import PositionController from '../controllers/position-controller.js'

const router = Router()

router.get('/', PositionController.getPositions)

export default router
