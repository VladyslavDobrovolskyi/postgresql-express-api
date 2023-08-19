const request = require('supertest')
const app = 'http://localhost:3000'

describe('[GET] /positions ', () => {
  xtest('Positions not found.', async () => {
    const response = await request(app).get(`/positions`)
    expect(response.statusCode).toBe(422)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Positions not found.')
  })
  xtest('Page not found.', async () => {
    const response = await request(app).get(`/positions`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Page not found.')
  })
})
