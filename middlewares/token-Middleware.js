import jwt from 'jsonwebtoken'
import { TOKEN_ACCESS_SECRET } from '../config.js'
import TokenService from '../services/token-service.js'

export default function validateToken(req, res, next) {
  const { token } = req.headers
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token is required.' })
  }

  try {
    jwt.verify(token, TOKEN_ACCESS_SECRET)
    TokenService.useToken(token)
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Token is expired.' })
  }
}
