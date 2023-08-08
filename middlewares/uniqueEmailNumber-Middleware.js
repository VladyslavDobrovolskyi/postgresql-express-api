const db = require('../helpers/db-connect')

async function uniqueEmailNumber(req, res, next) {
  const { email, phone } = req.body
  try {
    const user = await db.query(
      'SELECT * FROM users WHERE email = $1 OR phone = $2 LIMIT 1;',
      [email, phone]
    )
    if (user.rowCount > 0) {
      console.log(user)
      throw new Error()
    }
    next()
  } catch (error) {
    return res.status(409).json({
      success: 'false',
      message: 'User with this phone or email already exist',
    })
  }
}

module.exports = uniqueEmailNumber
