const generateUserAndDoRequest = require('../Functions/generateUserAndDoRequest')
describe('[POST] /users', () => {
  test('The phone number should start with the code of Ukraine (+380).', async () => {
    const response = await generateUserAndDoRequest({ phone: '+385731828194' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        phone: [
          'The phone number should start with the code of Ukraine (+380).',
        ],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })

  test('The phone number is required.', async () => {
    const response = await generateUserAndDoRequest({ phone: '' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        phone: ['The phone number is required.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })
})
