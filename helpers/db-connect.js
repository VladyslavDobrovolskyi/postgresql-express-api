const { DB_CONFIG } = require('../config')

const Pool = require('pg').Pool
const pool = new Pool(DB_CONFIG)

module.exports = pool
