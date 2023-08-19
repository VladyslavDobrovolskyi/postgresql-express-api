const request = require('supertest')
const { faker } = require('@faker-js/faker')
const axios = require('axios')
const app = 'http://localhost:3000'

const generateUser = async () => {
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

  const tokenResponse = await request(app).get('/token')
  const token = tokenResponse.body.token

  const photoStream = await axios.get(data.photo, { responseType: 'stream' })

  const response = await request(app)
    .post('/users')
    .set('Token', token)
    .attach('photo', photoStream.data, { filename: 'photo.jpg' })
    .field('name', data.name)
    .field('email', data.email)
    .field('phone', data.phone)
    .field('position_id', data.position_id)

  return response
}

describe('[POST] /users', () => {
  test('Status code is 200', async () => {
    const response = await generateUser()
    expect(response.statusCode).toBe(200)
  })

  test('Content-Type is application/json', async () => {
    const response = await generateUser()
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
  })

  test("Has 'success' in response body", async () => {
    const response = await generateUser()
    const responseBody = response.body
    expect(responseBody.success).toBeDefined()
  })

  test('Success status is true', async () => {
    const response = await generateUser()
    const responseBody = response.body
    const successStatus = responseBody.success
    expect(successStatus).toBe(true)
  })

  test('Response has [user_id, message: "New user successfully registered"]', async () => {
    const response = await generateUser()
    const responseBody = response.body
    expect(responseBody).toHaveProperty('user_id')
    expect(responseBody).toHaveProperty(
      'message',
      'New user successfully registered'
    )
  })
})
