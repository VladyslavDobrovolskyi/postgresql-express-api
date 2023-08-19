const request = require('supertest')
const { faker } = require('@faker-js/faker')
const axios = require('axios')
const app = 'http://localhost:3000'

generateUser = async ({
  name = 'Fake',
  email = 'Fake',
  phone = 'Fake',
  position_id = 'Fake',
  photo = 'Fake',
  imageWidth,
  imageHeight,
  imageFormat,
} = {}) => {
  const userName = name === 'Fake' ? faker.person.firstName() : name
  const userEmail =
    email === 'Fake' ? faker.internet.email().toLowerCase() : email
  const userPhone =
    phone === 'Fake' ? faker.phone.number('+380#########') : phone
  const userPosition_id =
    position_id === 'Fake' ? Math.floor(Math.random() * 4) + 1 : position_id
  const userPhoto =
    photo === 'Fake'
      ? faker.image.urlLoremFlickr({
          width: imageWidth || 84,
          height: imageHeight || 84,
          category: 'abstract',
        })
      : photo

  const data = {
    userName,
    userEmail,
    userPhone,
    userPosition_id,
    userPhoto,
  }

  const tokenResponse = await request(app).get('/token')
  const token = tokenResponse.body.token

  const photoStream = userPhoto
    ? await axios.get(data.userPhoto, {
        responseType: 'stream',
      })
    : ''

  const response = await request(app)
    .post('/users')
    .set('Token', token)
    .attach('photo', photoStream.data, {
      filename: `photo.${imageFormat || 'jpg'}`,
    })
    .field('name', data.userName)
    .field('email', data.userEmail)
    .field('phone', data.userPhone)
    .field('position_id', data.userPosition_id)

  return response
}

describe('[POST] /users', () => {
  test('The email must be a valid email address according to RFC2822.', async () => {
    const response = await generateUser({ email: 'test@mail' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        email: [
          'The email must be a valid email address according to RFC2822.',
        ],
      },
    })
  })
  test('The phone number should start with the code of Ukraine (+380).', async () => {
    const response = await generateUser({ phone: '+385731828194' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        phone: [
          'The phone number should start with the code of Ukraine (+380).',
        ],
      },
    })
  })
  test('The phone number is required.', async () => {
    const response = await generateUser({ phone: '' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        phone: ['The phone number is required.'],
      },
    })
  })
  test('The name must be at least 2 characters.', async () => {
    const response = await generateUser({ name: 'W' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        name: ['The name must be at least 2 characters.'],
      },
    })
  })
  test('The name must not exceed 60 characters.', async () => {
    const response = await generateUser({ name: `'A'${'a'.repeat(60)}` })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        name: ['The name must not exceed 60 characters.'],
      },
    })
  })
  test('The position id must be an integer.', async () => {
    const response = await generateUser({ position_id: 'Security' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        position_id: ['The position id must be an integer.'],
      },
    })
  })
  test('The photo is required.', async () => {
    const response = await generateUser({ photo: '' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo is required.'],
      },
    })
  })
})
