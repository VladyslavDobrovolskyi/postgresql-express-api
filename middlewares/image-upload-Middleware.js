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
  fileFilter: function (req, file, callback) {
    const allowedExtensions = ['.jpg', '.jpeg']
    const ext = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf('.'))
    if (allowedExtensions.includes(ext)) {
      callback(null, true)
    } else {
      callback(
        new Error('The accepted format for the file is not .jpg or .jpeg.')
      )
    }
  },
})

module.exports = upload
