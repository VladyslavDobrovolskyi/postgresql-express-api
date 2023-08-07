const { check, validationResult } = require('express-validator')

const validateFields = [
  check('name').notEmpty().withMessage('Имя пользователя обязательно'),
  check('email')
    .isEmail()
    .withMessage('The email must be a valid email address.'),
  check('phone')
    .isLength({ min: 6 })
    .withMessage('Пароль должен содержать минимум 6 символов'),
  check('position_id').notEmpty().withMessage('Позиция'),
  check('photo').notEmpty().withMessage('Фото обязательно'),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const validationErrors = errors.mapped()
      console.log(validationErrors)

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
