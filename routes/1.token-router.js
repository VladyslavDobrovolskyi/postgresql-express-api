import { Router } from 'express'
import TokenController from '../controllers/token-controller.js'

const router = Router()
/**
 * @swagger
 * /token:
 *   get:
 *     summary: Получить токен для регистрации пользователя.
 *     description: Метод возвращает токен, необходимый для регистрации нового пользователя. Токен действует в течение 40 минут и может быть использован только один раз. Для следующей регистрации потребуется получить новый токен.
 *     tags:
 *       - Получение токена
 *     responses:
 *       200:
 *         description: Успешный ответ с токеном
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Одноразовый токен, действующий 40 минут
 *                   example: "eyJpdiI6Im9mV1NTMlFZQTlJeWlLQ3liVks1MGc9PSIsInZhbHVlIjoiRTJBbUR4dHp1dWJ3ekQ4bG85WVZya3ZpRGlMQ0g5ZHk4M05UNUY4Rmd3eFM3czc2UDRBR0E4SDR5WXlVTG5DUDdSRTJTMU1KQ2lUQmVZYXZZOHJJUVE9PSIsIm1hYyI6ImE5YmNiODljZjMzMTdmMDc4NjEwN2RjZTVkNzBmMWI0ZDQyN2YzODI5YjQxMzE4MWY0MmY0ZTQ1OGY4NTkyNWQifQ=="
 */
router.get('/', TokenController.getToken)

export default router
