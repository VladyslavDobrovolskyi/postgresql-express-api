import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Документация API', // Название вашего API
			version: '1.0.0', // Версия вашего API
			description: 'Документация к API для управления пользователями', // Описание вашего API
		},
		servers: [
			{
				url: 'http://localhost:3000', // URL сервера
			},
		],
	},
	apis: ['./routes/*.js'], // Укажите путь к файлам с маршрутами
}

// Генерация спецификаций
const swaggerSpec = swaggerJsDoc(swaggerOptions)

export default app => {
	// Настройка Swagger UI
	app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
