import crypto from 'crypto'
import fs from 'fs'
import { IMG_PATH } from '../config.js'

export default function () {
	return function (req, res, next) {
		if (req.file) {
			try {
				let newPhotoName = `${crypto
					.randomBytes(8)
					.toString('hex')}.jpg` //TODO Проверка на название и если нету ОК, если да - пересоздать
				req.body.photo = IMG_PATH + newPhotoName
				const filePath = `public/images/users/${newPhotoName}`
				fs.writeFileSync(filePath, req.file.buffer)
				next()
			} catch (error) {
				console.error(error)
				res.status(500).send('Internal Server Error')
			}
		}
	}
}
