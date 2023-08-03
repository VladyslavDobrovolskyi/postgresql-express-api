const TokenController = require('../controllers/token-controller')
const Router = require('express').Router
const router = new Router()

router.get('/', TokenController.getToken)

module.exports = router
