import { app, request } from '../settings.js'

describe('[GET] /users/?count=', () => {
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
