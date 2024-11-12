import { Router } from 'express'
import UserController from '../controllers/user-controller.js'
import imageSaveMiddleware from '../middlewares/image-save-Middleware.js'
import imageUploadMiddleware from '../middlewares/image-upload-Middleware.js'
import paginationMiiddleware from '../middlewares/pagination-Middleware.js'
import pagValidationMiddleware from '../middlewares/pagvalidation-Middleware.js'
import tokenMiddleware from '../middlewares/token-Middleware.js'
import uniqueEmailNumberMiddleware from '../middlewares/uniqueEmailNumber-Middleware.js'
import validationMiddleware from '../middlewares/validation-Middleware.js'

const router = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список пользователей
 *     description: Возвращает данные пользователей из базы данных, разделённые на страницы и отсортированные по дате создания в порядке убывания. Можно указать параметры **count**, **offset** и **page**, которые соответствуют количеству пользователей на странице, пропущенному числу записей и номеру страницы. Если указан параметр **offset**, параметр **page** будет игнорирован. Для навигации по страницам используйте ссылки в ответе сервера*:* **next_url** для перехода на следующую страницу и **prev_url** для возврата на предыдущую. Если следующая или предыдущая страница не существует, значение **next_url** или **prev_url** будет равно `null`.
 *     tags:
 *       - Получение пользователей
 *
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Укажите страницу, которую вы хотите получить
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *       - name: offset
 *         in: query
 *         required: false
 *         description: Укажите номер пропущенной записи
 *         schema:
 *           type: integer
 *           minimum: 0
 *           example: 1
 *       - name: count
 *         in: query
 *         required: false
 *         description: Укажите количество элементов, которые будут получены на странице
 *         schema:
 *           type: integer
 *           default: 5
 *           minimum: 1
 *           maximum: 100
 *           example: 5
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 total_pages:
 *                   type: integer
 *                   example: 10
 *                 total_users:
 *                   type: integer
 *                   example: 47
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 links:
 *                   type: object
 *                   properties:
 *                     next_url:
 *                       type: string
 *                       example: "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=2&count=5"
 *                     prev_url:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "30"
 *                       name:
 *                         type: string
 *                         example: "Angel"
 *                       email:
 *                         type: string
 *                         example: "angel.williams@example.com"
 *                       phone:
 *                         type: string
 *                         example: "+380496540023"
 *                       position:
 *                         type: string
 *                         example: "Designer"
 *                       position_id:
 *                         type: string
 *                         example: "4"
 *                       registration_timestamp:
 *                         type: integer
 *                         example: 1537777441
 *                       photo:
 *                         type: string
 *                         example: "https://frontend-test-assignment-api.abz.agency/images/users/5b977ba13fb3330.jpeg"
 *       404:
 *         description: Страница не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Page not found"
 *       422:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 fails:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "The count must be an integer."
 *                     page:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "The page must be at least 1."
 */
router.get('/', pagValidationMiddleware, paginationMiiddleware, UserController.getUsers)
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Получить информацию о пользователе с помощью ID
 *     description: Возвращает информацию о пользователе по его ID. Этот метод может быть использован для получения данных конкретного пользователя.
 *     tags:
 *       - Получение пользователей
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           oneOf:
 *              - type: integer
 *              - type: string
 *         description: The id of the user
 *         example: 1
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Superstar"
 *                     email:
 *                       type: string
 *                       example: "Superstar@gmail.com"
 *                     phone:
 *                       type: string
 *                       example: "+380957398462"
 *                     position:
 *                       type: string
 *                       example: "Security"
 *                     position_id:
 *                       type: integer
 *                       example: 2
 *                     photo:
 *                       type: string
 *                       format: uri
 *                       example: "https://frontend-test-assignment-api.abz.agency/images/users/5b9626f0157d224.jpeg"
 *       400:
 *         description: Bad Request, validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 fails:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["The user_id must be an integer."]
 *       404:
 *         description: Not Found, user does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "The user with the requested identifier does not exist"
 *                 fails:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["User not found"]
 */

router.get('/:id', UserController.getUserById)
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Регистрация нового пользователя в системе.
 *     description: Добавляет нового пользователя с обязательными полями **name**, **email**, **phone**, **position_id** и **photo**. Все поля обязательны для заполнения и должны соответствовать указанным требованиям.
 *     tags:
 *       - Регистрация пользователя
 *     parameters:
 *       - in: header
 *         name: Token
 *         required: true
 *         schema:
 *           type: string
 *         description: Токен, который был получен с помощью /token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 60
 *                 description: Username should contain 2-60 characters
 *                 example: "Jhon"
 *               email:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 pattern: "^\\S+@\\S+\\.\\S+$"
 *                 description: User email, must be a valid email according to RFC2822
 *                 example: "jhon@example.com"
 *               phone:
 *                 type: string
 *                 pattern: "^\\+380[0-9]{9}$"
 *                 description: User phone number. Number should start with code of Ukraine +380
 *                 example: "+380955388485"
 *               position_id:
 *                 type: integer
 *                 minimum: 1
 *                 description: User's position id. You can get a list of all positions with their IDs using the API method GET api/v1/positions
 *                 example: 3
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb.
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user_id:
 *                   type: integer
 *                   example: 23
 *                 message:
 *                   type: string
 *                   example: "New user successfully registered"
 *       401:
 *         description: Unauthorized, token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "The token expired."
 *       409:
 *         description: Conflict, user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User with this phone or email already exist"
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 fails:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["The name must be at least 2 characters."]
 *                     email:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["The email must be a valid email address."]
 *                     phone:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["The phone field is required."]
 *                     position_id:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["The position id must be an integer."]
 *                     photo:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["The photo may not be greater than 5 Mbytes.", "Image is invalid."]
 */
router.post('/', [
	tokenMiddleware,
	imageUploadMiddleware,
	validationMiddleware,
	uniqueEmailNumberMiddleware,
	imageSaveMiddleware(),
	UserController.createUser,
])

export default router
