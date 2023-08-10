require('dotenv').config()

module.exports = {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,
  TOKEN_ACCESS_SECRET: process.env.TOKEN_ACCESS_SECRET,
  IMG_PATH: `http://${process.env.HOST}:${process.env.PORT}/images/users/`,
  DB_CONFIG: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    parseInt8: true,
  },
}
