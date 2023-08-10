const UserService = require('../services/user-service')
const TokenService = require('../services/token-service')

class UserController {
  async getUsers(req, res) {
    const { count, offset, page } = req.pagination
    try {
      const users = await UserService.getUsers(count, offset, page)
      res.json(users)
    } catch (error) {
      console.log(error.message) // TODO Internal Server Error
    }
  }

  async getUserById(req, res) {
    const { id } = req.params
    const isNumber = Number.isInteger(Number(id))
    if (!isNumber) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        fails: {
          user_id: ['The user_id must be an integer.'],
        },
      })
    }
    try {
      const user = await UserService.getUserById(id)
      if (user) {
        res.status(200).json({ success: true, user })
      } else {
        res.status(404).json({
          success: false,
          message: 'The user with the requested identifier does not exist',
          fails: {
            user_id: ['User not found.'],
          },
        })
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error.',
      })
    }
  }

  async createUser(req, res) {
    try {
      const { id } = await UserService.createUser(req.body)
      res.json({
        success: true,
        user_id: id,
        message: 'New user successfully registered',
      })
    } catch (error) {
      console.log(error.message) // TODO Internal Server Error
    }
  }
}
module.exports = new UserController()
