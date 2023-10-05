import generateUserAndDoRequest from '../Functions/generateUserAndDoRequest.js'

describe('[POST] /users', () => {
  test('Token is expired.', async () => {
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxNjkyNTIwMDE5MDU2LCJpYXQiOjE2OTI1MjAwMTksImV4cCI6MTY5MjUyMjQxOX0.xR9nNhuDeS6ePNGdR3I9hDs6YkljEaIRyGugCpSZHWk'

    await generateUserAndDoRequest({ token: expiredToken })

    const response = await generateUserAndDoRequest({ token: expiredToken })

    const expectedResponse = {
      success: false,
      message: 'Token is expired.',
    }

    expect(response.status).toBe(401)

    expect(response.body).toEqual(expectedResponse)
  })
})
