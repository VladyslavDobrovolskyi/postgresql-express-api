const request = require('supertest')
const { faker } = require('@faker-js/faker')
const axios = require('axios')

const app = 'http://localhost:3000'
const id = Math.floor(Math.random() * 35) + 1

generateUser = async ({
  token = 'Generate',
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
  const userToken = token === 'Generate' ? tokenResponse.body.token : token

  const photoStream = userPhoto
    ? await axios.get(data.userPhoto, {
        responseType: 'stream',
      })
    : ''

  const response = await request(app)
    .post('/users')
    .set('Token', userToken)
    .attach('photo', photoStream.data, {
      filename: `photo.${imageFormat || 'jpg'}`,
    })
    .field('name', data.userName)
    .field('email', data.userEmail)
    .field('phone', data.userPhone)
    .field('position_id', data.userPosition_id)

  return response
}

describe('[POST] /users ', () => {
  test('The photo should be in JPG/JPEG format.', async () => {
    const response = await generateUser({ imageFormat: 'png' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo should be in JPG/JPEG format.'],
      },
    })
  })
  test('The photo dimensions must be 84x84 pixels.', async () => {
    const response = await generateUser({ imageWidth: 95, imageHeight: 95 })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo dimensions must be 84x84 pixels.'],
      },
    })
  })

  xtest('Invalid image format.', async () => {
    const response = await generateUser({ imageFormat: 'gif' })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['Invalid image format.'],
      },
    })
  })
  xtest('The photo size must not exceed 5MB.', async () => {
    const response = await generateUser({ imageWidth: 2456, imageHeight: 1336 })
    expect(response.status).toBe(422)
    expect(JSON.parse(response.text)).toEqual({
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo size must not exceed 5MB.'],
      },
    })
  })
})
