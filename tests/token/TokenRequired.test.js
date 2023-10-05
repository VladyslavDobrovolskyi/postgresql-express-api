import generateUserAndDoRequest from '../Functions/generateUserAndDoRequest.js'

describe('[POST] /users', () => {
  test('Token is required.', async () => {
    const response = await generateUserAndDoRequest({
      token: '',
    })
    const expectedResponse = {
      success: false,
      message: 'Token is required.',
    }
    expect(response.status).toBe(401)

    expect(response.body).toEqual(expectedResponse)
  })
})
