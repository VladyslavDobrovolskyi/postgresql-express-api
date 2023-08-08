const db = require('../helpers/db-connect')

class PositionService {
  async getPositions() {
    const fetchedPositionsData = await db.query(`SELECT * FROM positions`)
    return fetchedPositionsData.rows
  }
}

module.exports = new PositionService()
