const request = require('supertest')
const app = 'http://localhost:3000'

test('Status code is 200', async () => {
  const response = await request(app).get('/users')
  expect(response.status).toBe(200)
})

test('Content-Type is application/json', async () => {
  const response = await request(app).get('/users')
  const contentType = response.headers['content-type']
  expect(contentType).toContain('application/json')
})

test("Has 'success' in response body", async () => {
  const response = await request(app).get('/users')
  const responseBody = response.body
  expect(responseBody.success).toBeDefined()
})

test('Success status is true', async () => {
  const response = await request(app).get('/users')
  const responseBody = response.body
  const successStatus = responseBody.success
  expect(successStatus).toBe(true)
})

test("Has 'users' array in response", async () => {
  const response = await request(app).get('/users')
  const responseBody = response.body
  const users = responseBody.users
  const isArray = Array.isArray(users)
  expect(isArray).toBe(true)
})
