import { app, request } from '../settings.js'

describe('[GET] /users/:id', () => {
  test('The user id must be an integer', async () => {
    const response = await request(app).get(`/users/Invalid`)
    const expectedResponse = {
      success: false,
      fails: {
        user_id: ['The user id must be an integer.'],
      },
      message: 'Validation failed',
    }

    expect(response.statusCode).toBe(400)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body).toEqual(expectedResponse)
  })
})
