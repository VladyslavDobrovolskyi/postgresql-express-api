const PositionService = require('../services/position-service')

class PositionController {
  async getPositions(req, res) {
    try {
      const positions = await PositionService.getPositions()
      if (positions) res.json({ success: 'true', posistions: positions })
      else
        res.status(404).json({
          success: false,
          message: 'Positions not found.',
        })
    } catch (error) {
      res.json({ error: error.message }) //?
    }
  }
}

module.exports = new PositionController()
