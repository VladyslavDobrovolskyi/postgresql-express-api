//TODO Cделать кастомный класс ошибок
function errorHandler(err, req, res, next) {
  res.status(400).json({ success: false, message: err.message })
}

module.exports = errorHandler
