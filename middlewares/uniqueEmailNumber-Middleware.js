const db = require('../helpers/db-connect')

async function uniqueEmailNumber(req, res, next) {
  const { email, phone } = req.body
  try {
    const user = await db.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $2 LIMIT 1;', //TODO обработчик ошибок на этот запрос?
      [email, phone]
    )
    if (user.rowCount > 0) {
      res.status(409).json({
        success: false,
        message: 'User with this phone or email already exist',
      })
    }
  } catch (error) {
    console.error('Error executing query', error)
    res.status(500).json({
      error: 'Internal Server Error',
    })
  }
  next()
}

module.exports = uniqueEmailNumber
