const request = require('supertest')
const app = 'http://localhost:3000'
const id = Math.floor(Math.random() * 35) + 1

describe('[GET] /users/:id', () => {
  test('Validating /users/:id endpoint response', async () => {
    const response = await request(app).get(`/users/${id}`)
    const responseBody = response.body

    expect(response.status).toBe(200)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(responseBody.success).toBeDefined()
    const successStatus = responseBody.success
    expect(successStatus).toBe(true)

    const user = responseBody.user
    expect(typeof user).toBe('object')

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('phone')
    expect(user).toHaveProperty('position_id')
    expect(user).toHaveProperty('position')
    expect(user).toHaveProperty('photo')
  })
})
