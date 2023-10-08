# Описание API:
**REST API**, реализованный на Express и подключенный к базе данных posgreSQL с помощью библиотеки pg, предоставляет возможность клиентским приложениям выполнять операции CRUD (create, read, update, delete) с данными в базе данных, используя HTTP-запросы. 

**tags:** `Node.js` `Express` `Express-validator`  `PostgreSQL` `JWT` `Jest`  

**features:** `Одноразовый токен для выполнения POST-запроса` `Валидация текстовых данных` `Валидация изображения` `Пагинация` `API-тестирование`

--- 
### 🟢 GET `/users`

Возвращает список всех пользователей.

#### Пример запроса

`GET` `/users`

#### Успешный ответ
`Status: 200 OK`
`Response:`
```
{
"success": true,
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxNjk2NzYyMTMxMjk1LCJpYXQiOjE2OTY3NjIxMzEsImV4cCI6MTY5Njc2NDUzMX0.-TJx-W5WPEBIrMqcrGpKg6MNHaCrt7Jwzjt4aZSovao"
}
```

#### Ошибки

- Если произошла ошибка на стороне сервера, API вернет ошибку `{ success: false, message: 'Internal Server Error' }`
