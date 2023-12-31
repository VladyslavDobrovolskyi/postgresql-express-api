import db from '../helpers/db-connect.js'

class UserService {
  async createUser({
    name,
    email,
    phone,
    position_id,
    photo,
    registration_timestamp = parseInt(Date.now().toString().slice(0, 10)),
  }) {
    const CreatedUserData = await db.query(
      `INSERT INTO users (name, email, phone, position_id, photo, registration_timestamp) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, email, phone, position_id, photo, registration_timestamp]
    )
    return CreatedUserData.rows[0]
  }

  async getUsers(count, offset, page) {
    try {
      const totalUsers = await db.query('SELECT COUNT(*) FROM users')
      const totalCount = parseInt(totalUsers.rows[0].count)

      const totalPages = Math.ceil(totalCount / count)

      const startIndex = (page - 1) * count + offset
      const endIndex = page * count

      const hasNextPage = endIndex < totalCount && offset + count < totalCount
      const hasPrevPage = startIndex > 0 || offset - count >= 0

      let nextPage = null
      if (hasNextPage) {
        nextPage = `/users?count=${count}&${
          offset || offset == 0
            ? `offset=${offset + count}`
            : `page=${page + 1}`
        }`
      }

      let prevPage = null
      if (hasPrevPage) {
        prevPage = `/users?count=${count}&${
          offset ? `offset=${offset - count}` : `page=${page - 1}`
        }`
      }

      const result = await db.query(
        `SELECT
          users.id,
          users.name,
          users.email,
          users.phone,
          positions.name AS position,
          positions.id AS position_id,
          registration_timestamp,
          users.photo
        FROM
          users
          JOIN positions ON users.position_id = positions.id
        ORDER BY registration_timestamp ASC
        LIMIT $1 OFFSET $2`,
        [count, offset ? offset : startIndex]
      )

      const users = result.rows

      const hasOffset = offset ? true : false

      if (users.length > 0) {
        const response = {
          success: true,
          total_pages: totalPages,
          total_users: totalCount,
          count: users.length,
          ...(hasOffset ? { offset } : { page }),
          links: {
            next_url: nextPage,
            prev_url: prevPage,
          },
          users,
        }
        return response
      } else {
        return {
          success: false,
          message: 'Page not found',
        }
      }
    } catch (error) {
      console.error('Error executing query', error)
    }
  }

  async getUserById(id) {
    const fetchedUserData = await db.query(
      `SELECT
        users.id,
        users.name,
        users.email,
        users.phone,
        positions.id AS position_id,
        positions.name AS position,
        users.photo
      FROM
        users
        JOIN positions ON users.position_id = positions.id
      WHERE
        users.id = $1;`,
      [id]
    )
    return fetchedUserData.rows[0]
  }
}

export default new UserService()
