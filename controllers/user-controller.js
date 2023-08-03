const db = require('../helpers/db-connect')
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
      const users = await UserService.getUserById(id)
      res.json(users)
    } catch (error) {
      console.log(error.message)
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body)
      res.json({ success: true, newUser })
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = new UserController()
