const request = require('supertest')
const app = 'http://localhost:3000'
const id = Math.floor(Math.random() * 35) + 1

test('Status code is 200', async () => {
  const response = await request(app).get(`/users/${id}`)
  expect(response.statusCode).toBe(200)
})

test('Content-Type is application/json', async () => {
  const response = await request(app).get(`/users/${id}`)
  const contentType = response.headers['content-type']
  expect(contentType).toContain('application/json')
})

test("Has 'success' in response body", async () => {
  const response = await request(app).get(`/users/${id}`)
  const responseBody = response.body
  expect(responseBody.success).toBeDefined()
})

test('Success status is true', async () => {
  const response = await request(app).get(`/users/${id}`)
  const responseBody = response.body
  const successStatus = responseBody.success
  expect(successStatus).toBe(true)
})

test('Has user object in response', async () => {
  const response = await request(app).get(`/users/${id}`)
  const responseBody = response.body
  const user = responseBody.user
  expect(typeof user).toBe('object')
})

test('User object has [id, name, email, phone, position_id, position, photo]', async () => {
  const response = await request(app).get(`/users/${id}`)
  const responseBody = response.body
  const user = responseBody.user
  expect(user).toHaveProperty('id')
  expect(user).toHaveProperty('name')
  expect(user).toHaveProperty('email')
  expect(user).toHaveProperty('phone')
  expect(user).toHaveProperty('position_id')
  expect(user).toHaveProperty('position')
  expect(user).toHaveProperty('photo')
})
