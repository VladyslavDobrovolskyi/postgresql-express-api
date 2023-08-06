const TokenController = require('../controllers/token-Controller')
const Router = require('express').Router
const router = new Router()

router.get('/', TokenController.getToken)

module.exports = router
