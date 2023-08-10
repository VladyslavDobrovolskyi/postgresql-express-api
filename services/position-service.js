const db = require('../helpers/db-connect')

class PositionService {
  async getPositions() {
    try {
      const fetchedPositionsData = await db.query(`SELECT * FROM positions`)
      return fetchedPositionsData.rows
    } catch (error) {
      console.error('Failed to fetch positions:', error)
      throw new Error('Failed to fetch positions from the database.') //?
    }
  }
}

module.exports = new PositionService()
