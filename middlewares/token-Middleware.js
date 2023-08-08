const jwt = require('jsonwebtoken')
const { TOKEN_ACCESS_SECRET } = require('../config')
const TokenService = require('../services/token-service')
function validateToken(req, res, next) {
  const { token } = req.headers
  if (!token) {
    return res
      .status(401)
      .json({ success: 'false', message: 'Token is required.' })
  }

  try {
    jwt.verify(token, TOKEN_ACCESS_SECRET) //TODO  Можно вынести функцию в TokenService
    TokenService.useToken(token)
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ success: 'false', message: 'Token is expired.' })
  }
}

module.exports = validateToken
