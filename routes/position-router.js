import { Router } from 'express'
import PositionController from '../controllers/position-Controller.js'

const router = Router()

router.get('/', PositionController.getPositions)

export default router
