import PositionService from '../services/position-service.js'

class PositionController {
  async getPositions(req, res) {
    try {
      const positions = await PositionService.getPositions()
      if (positions.length > 0)
        res.json({ success: true, positions: positions })
      else
        res.status(422).json({
          success: false,
          message: 'Positions not found.',
        })
    } catch (error) {
      res.status(404).json({ success: false, message: error.message }) //?
    }
  }
}

export default new PositionController()
