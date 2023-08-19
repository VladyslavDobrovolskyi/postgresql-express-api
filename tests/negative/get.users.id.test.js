const request = require('supertest')
const app = 'http://localhost:3000'
const Invalid_Data = ['Not_integer', 0]

describe('[GET] users/:id  -> Validation', () => {
  test('The user id must be an integer', async () => {
    const response = await request(app).get(`/users/${Invalid_Data[0]}`)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('fails')
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.user).toBeUndefined()
    expect(response.body.message).toBe('Validation failed')
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.fails.user_id).toContain(
      'The user id must be an integer.'
    )
    expect(response.body).toHaveProperty('message')
  })

  test('The user with the requested identifier does not exist.', async () => {
    const response = await request(app).get(`/users/${Invalid_Data[1]}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('fails')
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.user).toBeUndefined()
    expect(response.body.message).toBe(
      'The user with the requested identifier does not exist.'
    )
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.fails.user_id).toEqual(['User not found.'])
    expect(response.body).toHaveProperty('message')
  })
})
