# Описание API:
**REST API**, реализованный на `express` и подключенный к базе данных `PosgreSQL` с помощью библиотеки `pg`, предоставляет возможность клиентским приложениям регистрировать пользователя в базе данных используя HTTP-запросы, а так же получать их из базы с параметрами `пагинации`. Реализована валидация данных c помощью `express-validator` и доступ к POST-запросу по одноразовому `jwt` токену. Ключевая особенность это валидация изображения, которая происходит без сохранения файла на сервер для реализации этого была использована библиотека `multer`. В проекте присутствуют тесты, которые покрывают представленный функционал с помощью библиотек `jest` и `supertest`.

**tags:** `Node.js` `Express` `Express-Validator`  `PostgreSQL` `JWT` `Jest`  

**features:** `Пагинация` `Одноразовый токен для выполнения POST-запроса` `Валидация текстовых данных` `Валидация изображения`  `API-тестирование`

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
 - `page`: (integer - minimum: 1) 
 - `offset`: (integer - minimum: 0)
 - `count`: (integer - default: 5 - minimum: 1 - maximum: 100)
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

### 🟢 GET `/users/:id`

Возвращает пользователя по его id.

#### Параметры запроса:


`GET` `/users/60d7e29b0f2bb638d6a7a18d`


#### Успешный ответ
`Status: 200 OK`
`Response:`
```
{
    "success": true,
    "user": {
        "id": 1,
        "name": "Dodo",
        "email": "dodo@gmail.com",
        "phone": "+3807318281",
        "position_id": 2,
        "position": "Designer",
        "photo": "http://127.0.0.1:3000/images/users/cadc28928411c5fe.jpg"
    }
}
```

#### Ошибки

- Если пользователь с указанным id не найден, API вернет ошибку со статусом ответа `404`:
```
{
    "success": false,
    "message": "The user with the requested identifier does not exist.",
    "fails": {
        "user_id": [
            "User not found."
        ]
    }
}
```
- Если параметр id не является целочисленным, API вернет ошибку со статусом ответа `400`:
```
{
    "success": false,
    "message": "Validation failed",
    "fails": {
        "user_id": [
            "The user id must be an integer."
        ]
    }
}

```
- Если произошла ошибка на стороне сервера, API вернет ошибку `{ success: false, message: 'Internal Server Error' }` со статусом ответа `500`

### 🟢 GET `/positions`

Возвращает доступные позиции.

#### Параметры запроса:


`GET` `/posisitions`


#### Успешный ответ
`Status: 200 OK`
`Response:`
```
{
    "success": true,
    "positions": [
        {
            "id": 1,
            "name": "Security"
        },
        {
            "id": 2,
            "name": "Designer"
        },
        {
            "id": 3,
            "name": "Content manager"
        },
        {
            "id": 4,
            "name": "Lawyer"
        }
    ]
}
```

#### Ошибки

- Если доступные позиции отсутствуют в базе данных, API вернет ошибку со статусом ответа `410`:
```
{
  "success": false,
  "message": "Positions not found"
}
```
- Если произошла ошибка на стороне сервера, API вернет ошибку `{ success: false, message: 'Internal Server Error' }` со статусом ответа `500`

### 🟣 POST `/users`

Создает нового пользователя.
#### Заголовки запроса:
`token` - должно содержать валидный токен сгенерированный с помощью `GET` `/token`
#### Тело запроса: 
`name` - имя пользователя, должно состоять из 2-60 символов
`email` - электронная почта пользователя, должна быть действительной в соответствии с RFC2822
`phone` - номер телефона пользователя, должен начинаться с кода Украины +380
`position_id` - идентификатор позиции пользователя. Список всех позиций с их идентификаторами можно получить с помощью метода API GET api/v1/positions
`photo` - фотография пользователя должна быть jpg/jpeg изображением, с разрешением не более 84x84px и размером не более 5 МБ.

#### Пример запроса
`POST` `/users`
`Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxNjk2NzYyMTMxMjk1LCJpYXQiOjE2OTY3NjIxMzEsImV4cCI6MTY5Njc2NDUzMX0.-TJx-W5WPEBIrMqcrGpKg6MNHaCrt7Jwzjt4aZSovao"`
`Content-Type: application/json`

```
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "+380123456789",
    "position_id": 4,
    "photo": {{photo.jpg\jpeg}}
    
}
```

#### Успешный ответ
`Status: 201 Created`
`Response:`
```
{
  "success" : true,
  "user_id" : 89,
  "message" : "New user successfully registered"
}
```
### Ошибки 
- Если токен истёк API вернёт сообщение со статусом ответа `401`:
```
{
    "success": false,
    "message": "The token expired."
}
```
- Если пользователь с таким номером или почтой существует API вернёт ошибку со статусом ответа `409`:
```
{
  "success": false,
  "message": "User with this phone or email already exist"
}
```
- Если данные не проходят валидацию API вернёт ошибку со статусом `422`:
```
{
    "success": false,
    "message": "Validation failed",
    "fails": {
        "name": [
            "The name must be at least 2 characters."
        ],
        "email": [
            "The email must be a valid email address."
        ],
        "phone": [
            "The phone field is required."
        ],
        "position_id": [
            "The position id must be an integer."
        ],
        "photo": [
            "The photo may not be greater than 5 Mbytes.",
            "Image is invalid."
        ]
    }
}
```
### Структура тестов: 
```
├── Functions
|  ├── createUser.js - (Функция запуска generateUserAndDoReques() и вывода результата в консоль)
|  └── generateUserAndDoRequest.js (Функция создания пользователя. Используется во множестве тестов.)
├── pagination
|  ├── CountPagination.test.js (Проверки: The count must be an integer, The count must be at least 1, The count may not be greater than 100)  
|  └── PagePagination.test.js (Проверки: The page must be an integer, The page must be at least 1, Page not found)
├── positions
|  ├── GetPositions.test.js (Проверки: Get positions)
|  ├── PositionPageNotFound.test.js (Проверки: Page not found)
|  └── PositionsNotFound.test.js (Проверки: Positions not found.)
├── token
|  ├── GetToken.test.js (Проверки: Get Token)
|  ├── TokenExpired.test.js (Проверки: Token is expired)
|  └── TokenRequired.test.js Проверки: Tokent is required)
├── users
|  ├── GetUserById.test.js (Get user by id)
|  ├── GetUsers.test.js (Get users)
|  ├── PostUsers.test.js (Create user)
|  ├── UserIdMustBeAnInteger.test.js (The user id must be an integer)
|  └── UserWithReqIdentDoesNotExist.test.js (The user with the requested identifier does not exist.)
└── validation
   ├── EmailValidation.test.js (The email must be a valid email address according to RFC2822)
   ├── NameValidation.test.js (The name must be at least 2 characters, The name must not exceed 60 characters)
   ├── PhoneNumberValidation.test.js (The phone number is required, The phone number should start with the code of Ukraine (+380))
   ├── PhotoValidation.test.js (The photo is required, The photo should be in JPG/JPEG format, The photo dimensions must be 84x84 pixels, Invalid image format, The photo size must not exceed 5MB)
   ├── PositionIdValidation.test.js (The position id must be an integer)
   └── UserExistenceValidation.test.js (User with this (phone) or email already exist, User with this phone or (email) already exist)
```
