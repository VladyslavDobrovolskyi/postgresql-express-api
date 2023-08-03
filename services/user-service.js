const db = require('../helpers/db-connect')

class UserService {
  async createUser({
    name,
    email,
    phone,
    position_id,
    photo,
    registration_timestamp = Date.now(),
  }) {
    const CreatedUserData = await db.query(
      `INSERT INTO users (name, email, phone, position_id, photo, registration_timestamp) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, email, phone, position_id, photo, registration_timestamp]
    )
    return CreatedUserData.rows[0]
  }
  async getUsers() {
    const FetchedUsersData = await db.query(`SELECT
    users.id,
    users.name,
    users.email,
    users.phone,
    positions.name AS position,
    positions.id AS position_id,
    users.photo,
    users.registration_timestamp
  FROM
    users
    JOIN positions ON users.position_id = positions.id`)
    return FetchedUsersData.rows
  }
  async getUserById(id) {
    const FetchedUserData = await db.query(
      `SELECT
    users.id,
    users.name,
    users.email,
    users.phone,
    positions.name AS position,
    positions.id AS position_id,
    users.photo
  FROM
    users
    JOIN positions ON users.position_id = positions.id
  WHERE
    users.id = ${id};`
    )
    return FetchedUserData.rows[0]
  }
}

module.exports = new UserService()
