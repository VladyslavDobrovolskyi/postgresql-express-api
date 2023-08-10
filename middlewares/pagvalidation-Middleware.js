const { query, validationResult } = require('express-validator')

const validateFields = [
  query('count')
    .optional()
    .isInt()
    .withMessage('The count must be an integer.')
    .custom(value => value > 0)
    .withMessage('The count must be at least 1.')
    .custom(value => value <= 100)
    .withMessage('The count may not be greater than 100.')
    .toInt(),
  query('page')
    .optional()
    .isInt()
    .withMessage('The page must be an integer.')
    .custom(value => value > 0)
    .withMessage('The page must be at least 1.')
    .toInt(),
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

module.exports = validateFields
