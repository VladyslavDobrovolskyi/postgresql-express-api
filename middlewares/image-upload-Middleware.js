const multer = require('multer')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/users')
  },
  filename: function (req, file, cb) {
    cb(null, (file.filename = `${crypto.randomBytes(8).toString('hex')}.jpg`))
  },
})

const upload = multer({
  storage: storage,
})

module.exports = upload
