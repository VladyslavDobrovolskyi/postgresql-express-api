import { app, request } from '../settings.js'
describe('[GET] /users/:id', () => {
  test('The user with the requested identifier does not exist.', async () => {
    const response = await request(app).get(`/users/0`)
    const expectedResponse = {
      success: false,
      fails: {
        user_id: ['User not found.'],
      },
      message: 'The user with the requested identifier does not exist.',
    }
    expect(response.statusCode).toBe(404)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body).toEqual(expectedResponse)
  })
})
