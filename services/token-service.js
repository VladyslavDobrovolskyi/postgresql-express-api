const { TOKEN_ACCESS_SECRET } = require('../config')
const jwt = require('jsonwebtoken')
const TokenStorage = new Set() //INFO При перезагрузке сервера сторейдж сбрасывается и можно зарегистрировать еще раз на токен, но если он не протух

class TokenService {
  async generateToken(payload = Date.now()) {
    const token = jwt.sign({ payload }, TOKEN_ACCESS_SECRET, {
      expiresIn: '40m',
    })
    return token
  }
  useToken(token) {
    if (!TokenStorage.has(token)) {
      TokenStorage.add(token)
    } else throw new Error('Token expired.')
  }
}

module.exports = new TokenService()
