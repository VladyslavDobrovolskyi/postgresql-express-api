const request = require('supertest')
const app = 'http://localhost:3000'

describe('[GET] /users', () => {
  test('Validating /users endpoint response', async () => {
    const response = await request(app).get('/users')
    const responseBody = response.body

    expect(response.status).toBe(200)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(responseBody.success).toBeDefined()
    const successStatus = responseBody.success
    expect(successStatus).toBe(true)

    const users = responseBody.users
    const isArray = Array.isArray(users)
    expect(isArray).toBe(true)
  })
})
