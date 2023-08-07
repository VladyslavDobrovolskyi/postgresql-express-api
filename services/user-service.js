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
    const fetchedUsersData = await db.query(`SELECT
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
    return fetchedUsersData.rows
  }
  async getUserById(id) {
    const fetchedUserData = await db.query(
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
    return fetchedUserData.rows[0]
  }
}

module.exports = new UserService()
