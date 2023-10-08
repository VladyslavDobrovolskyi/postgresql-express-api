# Описание API:
**REST API**, реализованный на Express и подключенный к базе данных posgreSQL с помощью библиотеки pg, предоставляет возможность клиентским приложениям выполнять операции CRUD (create, read, update, delete) с данными в базе данных, используя HTTP-запросы. 

**tags:** `Node.js` `Express` `Express-validator`  `PostgreSQL` `JWT` `Jest`  

**features:** `Одноразовый токен для выполнения POST-запроса` `Валидация текстовых данных` `Валидация изображения` `Пагинация` `API-тестирование`

--- 
### 🟢 GET `/token`

Возвращает список всех пользователей.

#### Пример запроса

`GET` `/token`

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

- Если произошла ошибка на стороне сервера, API вернет ошибку `{ success: false, message: 'Internal Server Error' }` со статусом ответа `500`

### 🟢 GET `/users`

Возвращает список пользователей.


#### Параметры запроса
 - page: (integer - minimum: 1) 
 - offset: (integer - minimum: 0)
 - count: (integer - default: 5 - minimum: 1 - maximum: 100)
#### Примеры запроса
`GET` `/users?count=10&page=2`
`GET` `/users?count=10&offset=15`

#### Успешный ответ
`Status: 200 OK`
`Response:`
```
{
"success": true,
"total_pages": 83,
"total_users": 414,
"count": 5,
"page": 1,
"links": {
"next_url": "/users?count=5&page=2",
"prev_url": null
},
"users": [
{
"id": 1,
"name": "Dodo",
"email": "dodo@gmail.com",
"phone": "+3807318281",
"position": "Designer",
"position_id": 2,
"registration_timestamp": 1691672474,
"photo": "http://127.0.0.1:3000/images/users/cadc28928411c5fe.jpg"
}
...
```

#### Ошибки
- Если запрашивается несуществующая страница, API вернет ошибку `{"success": false, "message": "Page not found"}` со статусом ответа `404`
- Если запрос не пройдет валидацию по параметрам запроса API вернёт ошибку `{
    "success": false,
    "message": "Validation failed",
    "fails": {
        "count": [
            "The count must be an integer."
        ],
        "page": [
            "The page must be at least 1."
        ]
    }
}`
- Если произошла ошибка на стороне сервера, API вернет ошибку `{ success: false, message: 'Internal Server Error' }` со статусом ответа `500`
