import jwt from 'jsonwebtoken'
import { TOKEN_ACCESS_SECRET } from '../config.js'

class TokenService {
  constructor() {
    this.TokenStorage = new Set()
  }

  async generateToken(payload = Date.now()) {
    const token = jwt.sign({ payload }, TOKEN_ACCESS_SECRET, {
      expiresIn: '40m',
    })
    return token
  }

  useToken(token) {
    if (!this.TokenStorage.has(token)) {
      this.TokenStorage.add(token)
    } else {
      throw new Error('Token expired.')
    }
  }
}

export default new TokenService()
