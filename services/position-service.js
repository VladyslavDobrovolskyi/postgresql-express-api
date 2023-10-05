import db from '../helpers/db-connect.js'

class PositionService {
  async getPositions() {
    try {
      const fetchedPositionsData = await db.query(`SELECT * FROM positions`)
      return fetchedPositionsData.rows
    } catch (error) {
      console.log('Error:', error)
      throw new Error('Internal Server Error.')
    }
  }
}

export default new PositionService()
