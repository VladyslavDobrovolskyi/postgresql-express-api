const { app, request, userRange } = require('../settings')

describe('[GET] /users/:id', () => {
  test('Validating /users/:id endpoint response', async () => {
    const response = await request(app).get(
      `/users/${Math.floor(Math.random() * userRange) + 1}`
    )

    expect(response.status).toBe(200)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body.success).toBe(true)

    const user = response.body.user
    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('phone')
    expect(user).toHaveProperty('position_id')
    expect(user).toHaveProperty('position')
    expect(user).toHaveProperty('photo')
  })
})
