const request = require('supertest')
const app = 'http://localhost:3000'

describe('[GET] /users ', () => {
  test('Page not found', async () => {
    const response = await request(app).get(`/users`).query({ page: 999 })
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body.users).toBeUndefined()
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Page not found')
  })

  test('The page must be an integer.', async () => {
    const response = await request(app).get(`/users`).query({ page: 'Text' })
    expect(response.statusCode).toBe(422)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body.users).toBeUndefined()
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Validation failed')
    expect(response.body.fails.page).toEqual(['The page must be an integer.'])
  })

  test('The page must be at least 1.', async () => {
    const response = await request(app).get(`/users`).query({ page: 0 })
    expect(response.statusCode).toBe(422)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body.users).toBeUndefined()
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Validation failed')
    expect(response.body.fails.page).toEqual(['The page must be at least 1.'])
  })

  test('The count must be an integer.', async () => {
    const response = await request(app).get(`/users`).query({ count: 'Text' })
    expect(response.statusCode).toBe(422)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body.users).toBeUndefined()
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Validation failed')
    expect(response.body.fails.count).toEqual(['The count must be an integer.'])
  })

  test('The count must be at least 1.', async () => {
    const response = await request(app).get(`/users`).query({ count: 0 })
    expect(response.statusCode).toBe(422)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body.users).toBeUndefined()
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Validation failed')
    expect(response.body.fails.count).toEqual(['The count must be at least 1.'])
  })

  test('The count may not be greater than 100.', async () => {
    const response = await request(app).get(`/users`).query({ count: 101 })
    expect(response.statusCode).toBe(422)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body.users).toBeUndefined()
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Validation failed')
    expect(response.body.fails.count).toEqual([
      'The count may not be greater than 100.',
    ])
  })
})
