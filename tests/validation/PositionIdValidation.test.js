const generateUserAndDoRequest = require('../Functions/generateUserAndDoRequest')
describe('[POST] /users', () => {
  test('The position id must be an integer.', async () => {
    const response = await generateUserAndDoRequest({ position_id: 'Security' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        position_id: ['The position id must be an integer.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })
})
