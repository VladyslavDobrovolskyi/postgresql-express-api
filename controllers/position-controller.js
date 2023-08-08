const PositionService = require('../services/position-service')

class PositionController {
  async getPositions(req, res) {
    try {
      const positions = await PositionService.getPositions()
      res.json({ success: 'true', posistions: positions })
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}

module.exports = new PositionController()
