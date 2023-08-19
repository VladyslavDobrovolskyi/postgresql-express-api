const request = require('supertest')
const app = 'http://localhost:3000'

describe('/users', () => {
  test('Status code is 200', async () => {
    const response = await request(app).get('/users')
    expect(response.statusCode).toBe(200)
  })

  test('Content-Type is application/json', async () => {
    const response = await request(app).get('/users')
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
  })

  test('Has "success" property', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('success')
  })

  test('"success" property is true', async () => {
    const response = await request(app).get('/users')
    expect(response.body.success).toBe(true)
  })

  test('Has "total_pages" property', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('total_pages')
  })

  test('Has "total_users" property', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('total_users')
  })

  test('Has "count" property', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('count')
  })

  test('Has "page" property', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('page')
  })

  test('Has "links" property', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('links')
  })

  test('Has "users" property', async () => {
    const response = await request(app).get('/users')
    expect(response.body).toHaveProperty('users')
  })

  test('"users" property is an array', async () => {
    const response = await request(app).get('/users')
    expect(Array.isArray(response.body.users)).toBe(true)
  })

  test('Has at least one user in "users" array', async () => {
    const response = await request(app).get('/users')
    expect(response.body.users.length).toBeGreaterThan(0)
  })

  test('Each user has "id", "name", "email", "phone", "position", "position_id", "registration_timestamp", and "photo" properties', async () => {
    const response = await request(app).get('/users')
    const users = response.body.users
    users.forEach(user => {
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')
      expect(user).toHaveProperty('phone')
      expect(user).toHaveProperty('position')
      expect(user).toHaveProperty('position_id')
      expect(user).toHaveProperty('registration_timestamp')
      expect(user).toHaveProperty('photo')
    })
  })
})
