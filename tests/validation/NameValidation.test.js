import generateUserAndDoRequest from '../Functions/generateUserAndDoRequest.js'

describe('[POST] /users', () => {
  test('The name must be at least 2 characters.', async () => {
    const response = await generateUserAndDoRequest({ name: 'W' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        name: ['The name must be at least 2 characters.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })

  test('The name must not exceed 60 characters.', async () => {
    const response = await generateUserAndDoRequest({
      name: `'A'${'a'.repeat(60)}`,
    })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        name: ['The name must not exceed 60 characters.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })
})
