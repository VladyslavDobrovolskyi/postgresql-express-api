const request = require('supertest')
const app = 'http://localhost:3000'

describe('/positions', () => {
  test('Status code is 200', async () => {
    const response = await request(app).get('/positions')
    expect(response.statusCode).toBe(200)
  })

  test('Content-Type is application/json', async () => {
    const response = await request(app).get('/positions')
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
  })

  test("Has 'success' in response body", async () => {
    const response = await request(app).get('/positions')
    const responseBody = response.body
    expect(responseBody.success).toBeDefined()
  })

  test('Success status is true', async () => {
    const response = await request(app).get('/positions')
    const responseBody = response.body
    const successStatus = responseBody.success
    expect(successStatus).toBe(true)
  })

  test('Response has positions array', async () => {
    const response = await request(app).get('/positions')
    const responseBody = response.body
    const positions = responseBody.positions
    expect(Array.isArray(positions)).toBe(true)
  })

  test('Positions have [id, name]', async () => {
    const response = await request(app).get('/positions')
    const responseBody = response.body
    const positions = responseBody.positions

    positions.forEach(position => {
      expect(position).toHaveProperty('id')
      expect(position).toHaveProperty('name')
    })
  })
})
