const UserService = require('../services/user-service')

class UserController {
  async getUsers(req, res) {
    try {
      const users = await UserService.getUsers()
      res.json(users)
    } catch (error) {
      console.log(error.message)
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params
      const user = await UserService.getUserById(id)
      res.json({ success: 'true', user: user })
    } catch (error) {
      console.log(error.message)
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
      console.log(error.message)
    }
  }
}

module.exports = new UserController()
