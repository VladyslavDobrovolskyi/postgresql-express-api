const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
}).single('photo')

module.exports = upload
