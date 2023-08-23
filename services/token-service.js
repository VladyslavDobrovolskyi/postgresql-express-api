import jwt from 'jsonwebtoken'
import { TOKEN_ACCESS_SECRET } from '../config.js'

const TokenStorage = new Set()

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
    } else {
      throw new Error('Token expired.')
    }
  }
}

export default new TokenService()
