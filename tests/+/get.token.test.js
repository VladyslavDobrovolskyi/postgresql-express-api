const request = require('supertest')
const app = 'http://localhost:3000'
describe('/token', () => {
  test('Status code is 200', async () => {
    const response = await request(app).get('/token')
    expect(response.status).toBe(200)
  })

  test('Content-Type is application/json', async () => {
    const response = await request(app).get('/token')
    expect(response.header['content-type']).toContain('application/json')
  })

  test("Has 'success' in response body", async () => {
    const response = await request(app).get('/token')
    expect(response.body.success).toBeDefined()
  })

  test("Has 'token' in response body", async () => {
    const response = await request(app).get('/token')
    expect(response.body.token).toBeDefined()
  })

  test('Success status is true', async () => {
    const response = await request(app).get('/token')
    expect(response.body.success).toBe(true)
  })

  test('Token length is equal to 160', async () => {
    const response = await request(app).get('/token')
    expect(response.body.token.length).toBe(160)
  })
})
