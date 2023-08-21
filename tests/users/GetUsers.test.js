const { app, request } = require('../settings')

describe('[GET] /users', () => {
  test('Validating /users endpoint response', async () => {
    const response = await request(app).get('/users')

    expect(response.status).toBe(200)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body.success).toBe(true)

    const users = response.body.users
    expect(Array.isArray(users)).toBe(true)

    //Проверить проперти юзера
  })
})
