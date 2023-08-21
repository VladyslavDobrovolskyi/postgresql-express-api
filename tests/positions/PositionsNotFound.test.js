const { app, request } = require('../settings')

describe('[GET] /positions', () => {
  xtest('Returning "Positions not found." response', async () => {
    const response = await request(app).get('/positions')

    const expectedResponse = {
      success: false,
      message: 'Positions not found.',
    }

    expect(response.statusCode).toBe(422)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body).toEqual(expectedResponse)
  })
})
