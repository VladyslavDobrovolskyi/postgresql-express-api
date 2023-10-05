import TokenService from '../services/token-service.js'

class TokenController {
  getToken(req, res) {
    try {
      const token = TokenService.generateToken()
      res.json({ success: true, token })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }
}

export default new TokenController()
