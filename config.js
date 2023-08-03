require('dotenv').config()

module.exports = {
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000,

  DB_URI: process.env.DB_URI,
  LOG_LEVEL: process.env.LOG_LEVEL || 'dev',
}
