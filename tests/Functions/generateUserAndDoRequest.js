import { faker } from '@faker-js/faker'
import axios from 'axios'
import request from 'supertest'

const app = 'http://localhost:3000'

async function generateUserAndDoRequest({
  token = 'Generate',
  name = 'Fake',
  email = 'Fake',
  phone = 'Fake',
  position_id = 'Fake',
  photo = 'Fake',
  imageWidth,
  imageHeight,
  imageFormat,
} = {}) {
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

export default generateUserAndDoRequest
