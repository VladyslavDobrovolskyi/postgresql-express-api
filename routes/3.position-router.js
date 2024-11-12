import { Router } from 'express'
import PositionController from '../controllers/position-controller.js'

const router = Router()

/**
 * @swagger
 * /positions:
 *   get:
 *     summary: Получить список позиций для регистрации пользователя.
 *     description: Возвращает список всех доступных позиций для пользователей.
 *     tags:
 *       - Получение позиций
 *     responses:
 *       200:
 *         description: Успешный ответ с массивом позиций
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 positions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Security"
 *               example:
 *                 success: true
 *                 positions:
 *                   - id: 1
 *                     name: "Security"
 *                   - id: 2
 *                     name: "Designer"
 *                   - id: 3
 *                     name: "Content manager"
 *                   - id: 4
 *                     name: "Lawyer"
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
 *         description: Ошибка валидации, позиции не найдены
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
 *                   example: "Positions not found"
 */

router.get('/', PositionController.getPositions)

export default router
