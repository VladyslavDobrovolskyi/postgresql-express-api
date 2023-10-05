import generateUserAndDoRequest from '../Functions/generateUserAndDoRequest.js'

describe('[POST] /users', () => {
  test('User with this (phone) or email already exist', async () => {
    const response = await generateUserAndDoRequest({ phone: '+380900071441' })
    const expectedResponse = {
      success: false,
      message: 'User with this phone or email already exist',
    }
    expect(response.status).toBe(409)
    expect(response.body).toEqual(expectedResponse)
  })

  test('User with this phone or (email) already exist', async () => {
    const response = await generateUserAndDoRequest({
      email: 'raymundo92@yahoo.com',
    })
    const expectedResponse = {
      success: false,
      message: 'User with this phone or email already exist',
    }
    expect(response.status).toBe(409)
    expect(response.body).toEqual(expectedResponse)
  })
})
