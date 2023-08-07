const { IMG_PATH } = require('../config')

module.exports = function (req, res, next) {
  if (req.file) req.body.photo = IMG_PATH + req.file.filename
  next()
}
