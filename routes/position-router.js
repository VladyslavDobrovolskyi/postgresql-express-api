const PositionController = require('../controllers/position-Controller')
const Router = require('express').Router
const router = new Router()

router.get('/', PositionController.getPositions)

module.exports = router
