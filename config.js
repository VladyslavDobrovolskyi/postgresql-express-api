import dotenv from 'dotenv'

// Загружаем переменные окружения из .env файла
dotenv.config()

// Задаем значения для хоста и порта приложения
const HOST = process.env.APP_HOST || '127.0.0.1' // Используем APP_HOST вместо HOST
const PORT = process.env.APP_PORT || 3000 // Используем APP_PORT вместо PORT
const TOKEN_ACCESS_SECRET = process.env.TOKEN_ACCESS_SECRET

// Формируем путь к изображениям
const IMG_PATH = `http://${HOST}:${PORT}/images/users/`

// Конфигурация базы данных
const DB_CONFIG = {
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.POSTGRES_HOST || 'database', // Предполагаем, что имя контейнера с PostgreSQL - 'database'
	port: process.env.POSTGRES_PORT || 5432, // Устанавливаем значение по умолчанию для порта
	database: process.env.POSTGRES_DB,
	parseInt8: true,
}

// Экспортируем переменные для использования в других частях приложения
export { DB_CONFIG, HOST, IMG_PATH, PORT, TOKEN_ACCESS_SECRET }
