const axios = require('axios')
const FormData = require('form-data')
const { faker } = require('@faker-js/faker')

async function generateAndCreateUsers(userCount) {
  try {
    for (let i = 0; i < userCount; i++) {
      const name = faker.person.firstName()
      const email = faker.internet.email().toLowerCase()
      const phone = faker.phone.number('+380#########')
      const position_id = Math.floor(Math.random() * 4) + 1
      const photo = faker.image.urlLoremFlickr({
        width: 84,
        height: 84,
        category: 'abstract',
      })

      const data = {
        name,
        email,
        phone,
        position_id,
        photo,
      }

      console.log('Генерация данных для пользователя', i + 1)
      const token = await getToken()
      await createUser(data, token)
    }
  } catch (error) {
    console.error(
      'Ошибка:',
      error.response ? error.response.data : error.message
    )
  }
}

async function createUser(data, token) {
  const form = new FormData()
  form.append('name', data.name)
  form.append('email', data.email)
  form.append('phone', data.phone)
  form.append('position_id', data.position_id)

  const photoStream = await axios.get(data.photo, { responseType: 'stream' })
  form.append('photo', photoStream.data, { filename: 'photo.jpg' })

  const headers = {
    token: token,
    ...form.getHeaders(),
  }

  const responseUser = await axios.post('http://localhost:3000/users', form, {
    headers,
  })

  console.log('Ответ:', responseUser.data)
}

async function getToken() {
  try {
    const response = await axios.get('http://localhost:3000/token')
    return response.data.token
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error.message)
    throw error
  }
}

generateAndCreateUsers(1)
