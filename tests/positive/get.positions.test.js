const request = require('supertest')
const app = 'http://localhost:3000'

describe('[GET] /positions', () => {
  test('Validating /positions endpoint response', async () => {
    const response = await request(app).get('/positions')

    expect(response.statusCode).toBe(200)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    const responseBody = response.body
    expect(responseBody.success).toBeDefined()
    expect(responseBody.success).toBe(true)

    const positions = responseBody.positions
    expect(Array.isArray(positions)).toBe(true)

    positions.forEach(position => {
      expect(position).toHaveProperty('id')
      expect(position).toHaveProperty('name')
    })
  })
})
