import { app, request } from '../settings.js'

describe('[GET] /positions', () => {
  xtest('Returning "Page not found." response', async () => {
    const response = await request(app).get('/positions')

    const expectedResponse = {
      success: false,
      message: 'Page not found.',
    }
    expect(response.statusCode).toBe(404)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body).toEqual(expectedResponse)
  })
})
