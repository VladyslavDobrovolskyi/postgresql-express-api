import generateUserAndDoRequest from '../Functions/generateUserAndDoRequest.js'

describe('[POST] /users', () => {
  test('The email must be a valid email address according to RFC2822.', async () => {
    const response = await generateUserAndDoRequest({ email: 'test@mail' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        email: [
          'The email must be a valid email address according to RFC2822.',
        ],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })
})
