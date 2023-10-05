import jwt from 'jsonwebtoken'
import { TOKEN_ACCESS_SECRET } from '../config.js'

class TokenService {
  constructor() {
    this.tokenStorage = new Set()
  }

  generateToken(payload = Date.now()) {
    const token = jwt.sign({ payload }, TOKEN_ACCESS_SECRET, {
      expiresIn: '40m',
    })
    return token
  }
  verifyToken(token) {
    jwt.verify(token, TOKEN_ACCESS_SECRET)
  }

  useToken(token) {
    if (!this.tokenStorage.has(token)) {
      this.tokenStorage.add(token)
    } else {
      throw new Error('Token expired.')
    }
  }
}

export default new TokenService()
