import { app, request } from '../settings.js'

describe('[GET] /token', () => {
  test('Returning valid Token response', async () => {
    const response = await request(app).get('/token')

    expect(response.status).toBe(200)

    expect(response.header['content-type']).toContain('application/json')

    expect(response.body.success).toBe(true)
    expect(response.body.token).toBeDefined()
    expect(response.body.token.length).toBe(160)
  })
})
