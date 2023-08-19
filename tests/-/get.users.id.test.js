const request = require('supertest')
const app = 'http://localhost:3000'
const invalid_data = 'Not_integer'

describe('/positions', () => {
  test('Status code is 400', async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(response.statusCode).toBe(400)
  })

  test('Content-Type is application/json', async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
  })

  test("Has 'success' in response body", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    const responseBody = response.body
    expect(responseBody.success).toBeDefined()
  })

  test('Success status is false', async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    const responseBody = response.body
    const successStatus = responseBody.success
    expect(successStatus).toBe(false)
  })

  test('Does not have user object in response', async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    const responseBody = response.body
    const user = responseBody.user
    expect(user).toBeUndefined()
  })

  test("Has 'message' property", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(response.body).toHaveProperty('message')
  })

  test("'message' property is 'Validation failed'", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(response.body.message).toBe('Validation failed')
  })

  test("Has 'fails' property", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(response.body).toHaveProperty('fails')
  })

  test("'fails' property is an object", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(typeof response.body.fails).toBe('object')
  })

  test("Has 'user_id' property in 'fails'", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(response.body.fails).toHaveProperty('user_id')
  })

  test("'user_id' property in 'fails' is an array", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
  })

  test("'user_id' property in 'fails' contains 'The user id must be an integer.'", async () => {
    const response = await request(app).get(`/users/${invalid_data}`)
    expect(response.body.fails.user_id).toContain(
      'The user id must be an integer.'
    )
  })
})
