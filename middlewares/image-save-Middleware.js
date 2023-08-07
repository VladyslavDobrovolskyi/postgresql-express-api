const { IMG_PATH } = require('../config')
const fs = require('fs')
const crypto = require('crypto')

module.exports = function () {
  return function (req, res, next) {
    if (req.file) {
      let newPhotoName = `${crypto.randomBytes(8).toString('hex')}.jpg`
      req.body.photo = IMG_PATH + newPhotoName
      const filePath = `public/images/users/${newPhotoName}`
      fs.writeFileSync(filePath, req.file.buffer)
      next()
    }
  }
}

//TODO Нужно try catch проверка
