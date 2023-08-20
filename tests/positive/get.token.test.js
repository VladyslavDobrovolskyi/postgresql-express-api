const request = require('supertest')
const app = 'http://localhost:3000'

describe('[GET] /token', () => {
  test('Validating /token endpoint response', async () => {
    const response = await request(app).get('/token')

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toContain('application/json')

    const responseBody = response.body
    expect(responseBody.success).toBeDefined()
    expect(responseBody.token).toBeDefined()
    expect(responseBody.success).toBe(true)
    expect(responseBody.token.length).toBe(160)
  })
})
