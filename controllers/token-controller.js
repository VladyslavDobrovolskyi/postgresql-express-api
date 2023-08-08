const TokenService = require('../services/token-service')

class TokenController {
  async getToken(req, res) {
    try {
      const token = await TokenService.generateToken()
      res.json({ success: 'true', token })
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new TokenController()
