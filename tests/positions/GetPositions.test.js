const { app, request } = require('../settings')

describe('[GET] /positions', () => {
  test('Validating the response of the /positions endpoint', async () => {
    const response = await request(app).get('/positions')

    expect(response.statusCode).toBe(200)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body.success).toBe(true)

    const positions = response.body.positions
    expect(Array.isArray(positions)).toBe(true)

    positions.forEach(position => {
      expect(position).toHaveProperty('id')
      expect(position).toHaveProperty('name')
    })
  })
})
