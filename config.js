import dotenv from 'dotenv'
dotenv.config()

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000
const TOKEN_ACCESS_SECRET = process.env.TOKEN_ACCESS_SECRET
const IMG_PATH = `http://${process.env.HOST}:${process.env.PORT}/images/users/`
const DB_CONFIG = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  parseInt8: true,
}

export { DB_CONFIG, HOST, IMG_PATH, PORT, TOKEN_ACCESS_SECRET }
