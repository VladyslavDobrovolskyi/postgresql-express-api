import { check, validationResult } from 'express-validator'
import sharp from 'sharp'

const validateFields = [
	check('name')
		.isLength({ min: 2 })
		.withMessage('The name must be at least 2 characters.')
		.isLength({ max: 60 })
		.withMessage('The name must not exceed 60 characters.'),

	check('email').isEmail().withMessage('The email must be a valid email address according to RFC2822.'),

	check('phone').custom(value => {
		if (!value) {
			throw new Error('The phone number is required.')
		}
		if (!value.startsWith('+380')) {
			throw new Error('The phone number should start with the code of Ukraine (+380).')
		}
		return true
	}),

	check('position_id').isInt().withMessage('The position id must be an integer.'),
	check('photo').custom(async (value, { req }) => {
		if (!req.file) {
			throw new Error('The photo is required.')
		}

		const allowedExtensions = ['.jpg', '.jpeg']
		const allowedMimeTypes = ['image/jpeg']
		const allowedSize = 5 * 1024 * 1024

		const fileExtension = req.file.originalname.toLowerCase().substring(req.file.originalname.lastIndexOf('.'))
		const mimeType = req.file.mimetype

		if (!allowedMimeTypes.includes(mimeType)) {
			throw new Error('Invalid image format.')
		}
		if (!allowedExtensions.includes(fileExtension)) {
			throw new Error('The photo should be in JPG/JPEG format.')
		}
		if (req.file.size > allowedSize) {
			throw new Error('The photo size must not exceed 5MB.')
		}
		const image = sharp(req.file.buffer)
		const metadata = await image.metadata()
		const maxWidth = 70
		const maxHeight = 70
		const imageWidth = metadata.width
		const imageHeight = metadata.height

		if (imageWidth > maxWidth || imageHeight > maxHeight) {
			throw new Error(`The photo dimensions must be ${maxWidth}x${maxHeight} pixels.`)
		}

		return true
	}),
	(req, res, next) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const validationErrors = errors.mapped()

			const fails = {}
			Object.keys(validationErrors).forEach(field => {
				fails[field] = [validationErrors[field].msg]
			})

			return res.status(422).json({
				success: false,
				message: 'Validation failed',
				fails: fails,
			})
		}
		next()
	},
]

export default validateFields
