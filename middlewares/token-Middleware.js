import TokenService from '../services/token-service.js'

export default function validateToken(req, res, next) {
  const { token } = req.headers
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token is required.' })
  }

  try {
    TokenService.verifyToken(token)
    TokenService.useToken(token)
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Token is expired.' })
  }
}
