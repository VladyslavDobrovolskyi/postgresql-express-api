const TokenService = require('../services/token-service')

class TokenController {
  async getToken(req, res) {
    try {
      const token = await TokenService.generateToken()
      res.json({ success: 'true', token })
    } catch (error) {
      console.log(error.message) // TODO Internal Server Error
    }
  }
}

module.exports = new TokenController()
