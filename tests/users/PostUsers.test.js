const generateUserAndDoRequest = require('../Functions/generateUserAndDoRequest')

describe('[POST] /users', () => {
  test('Validating /users endpoint response', async () => {
    const response = await generateUserAndDoRequest()

    expect(response.status).toBe(200)

    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')

    expect(response.body.success).toBe(true)

    expect(response.body).toHaveProperty('user_id')
    expect(response.body).toHaveProperty(
      'message',
      'New user successfully registered'
    )
  }) //Возможно передалать сравнение Json на toHave Property
})
