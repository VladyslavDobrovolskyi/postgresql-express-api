const { app, request } = require('../settings')

describe('[GET] /users/?page= ', () => {
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
})
