const PositionController = require('../controllers/position-controller')
const Router = require('express').Router
const router = new Router()

router.get('/', PositionController.getPositions)

module.exports = router
