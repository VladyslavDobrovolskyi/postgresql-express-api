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

describe('Positive Testing:', () => {
  describe('[GET] /token', () => {
    test('Validating /token endpoint response', async () => {
      const response = await request(app).get('/token')

      expect(response.status).toBe(200)
      expect(response.header['content-type']).toContain('application/json')

      const responseBody = response.body
      expect(responseBody.success).toBeDefined()
      expect(responseBody.token).toBeDefined()
      expect(responseBody.success).toBe(true)
      expect(responseBody.token.length).toBe(160)
    })
  })
  describe('[POST] /users', () => {
    test('Validating /users endpoint response', async () => {
      const response = await generateUser()
      const responseBody = response.body

      expect(response.status).toBe(200)

      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')

      expect(responseBody.success).toBeDefined()
      const successStatus = responseBody.success
      expect(successStatus).toBe(true)

      expect(responseBody).toHaveProperty('user_id')
      expect(responseBody).toHaveProperty(
        'message',
        'New user successfully registered'
      )
    })
  })
  describe('[GET] /users ', () => {
    test('Validating /users endpoint response', async () => {
      const response = await request(app).get('/users')
      const responseBody = response.body

      expect(response.status).toBe(200)

      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')

      expect(responseBody.success).toBeDefined()
      const successStatus = responseBody.success
      expect(successStatus).toBe(true)

      const users = responseBody.users
      const isArray = Array.isArray(users)
      expect(isArray).toBe(true)
    })
  })
  describe('[GET] /users/:id ', () => {
    test('Validating /users/:id endpoint response', async () => {
      const response = await request(app).get(`/users/${id}`)
      const responseBody = response.body

      expect(response.status).toBe(200)

      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')

      expect(responseBody.success).toBeDefined()
      const successStatus = responseBody.success
      expect(successStatus).toBe(true)

      const user = responseBody.user
      expect(typeof user).toBe('object')

      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('name')
      expect(user).toHaveProperty('email')
      expect(user).toHaveProperty('phone')
      expect(user).toHaveProperty('position_id')
      expect(user).toHaveProperty('position')
      expect(user).toHaveProperty('photo')
    })
  })
  describe('[GET] /positions', () => {
    test('Validating /positions endpoint response', async () => {
      const response = await request(app).get('/positions')

      expect(response.statusCode).toBe(200)

      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')

      const responseBody = response.body
      expect(responseBody.success).toBeDefined()
      expect(responseBody.success).toBe(true)

      const positions = responseBody.positions
      expect(Array.isArray(positions)).toBe(true)

      positions.forEach(position => {
        expect(position).toHaveProperty('id')
        expect(position).toHaveProperty('name')
      })
    })
  })
})

describe('Negative Testing:', () => {
  describe('[GET] /users ', () => {
    test('Page not found', async () => {
      const response = await request(app).get(`/users`).query({ page: 999 })
      expect(response.statusCode).toBe(404)
      expect(response.body.success).toBe(false)
      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')
      expect(response.body.users).toBeUndefined()
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Page not found')
    })
    test('The page must be an integer.', async () => {
      const response = await request(app).get(`/users`).query({ page: 'Text' })
      expect(response.statusCode).toBe(422)
      expect(response.body.success).toBe(false)
      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')
      expect(response.body.users).toBeUndefined()
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Validation failed')
      expect(response.body.fails.page).toEqual(['The page must be an integer.'])
    })
    test('The page must be at least 1.', async () => {
      const response = await request(app).get(`/users`).query({ page: 0 })
      expect(response.statusCode).toBe(422)
      expect(response.body.success).toBe(false)
      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')
      expect(response.body.users).toBeUndefined()
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Validation failed')
      expect(response.body.fails.page).toEqual(['The page must be at least 1.'])
    })

    test('The count must be an integer.', async () => {
      const response = await request(app).get(`/users`).query({ count: 'Text' })
      expect(response.statusCode).toBe(422)
      expect(response.body.success).toBe(false)
      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')
      expect(response.body.users).toBeUndefined()
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Validation failed')
      expect(response.body.fails.count).toEqual([
        'The count must be an integer.',
      ])
    })

    test('The count must be at least 1.', async () => {
      const response = await request(app).get(`/users`).query({ count: 0 })
      expect(response.statusCode).toBe(422)
      expect(response.body.success).toBe(false)
      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')
      expect(response.body.users).toBeUndefined()
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Validation failed')
      expect(response.body.fails.count).toEqual([
        'The count must be at least 1.',
      ])
    })

    test('The count may not be greater than 100.', async () => {
      const response = await request(app).get(`/users`).query({ count: 101 })
      expect(response.statusCode).toBe(422)
      expect(response.body.success).toBe(false)
      const contentType = response.headers['content-type']
      expect(contentType).toContain('application/json')
      expect(response.body.users).toBeUndefined()
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toBe('Validation failed')
      expect(response.body.fails.count).toEqual([
        'The count may not be greater than 100.',
      ])
    })
  })
  describe('[POST] /users (token)', () => {
    test('Token is required.', async () => {
      const response = await generateUser({
        token: '',
      })

      console.log(response.body)
      expect(response.status).toBe(401)

      expect(JSON.parse(response.text)).toEqual({
        success: false,
        message: 'Token is required.',
      })
    })
    test('Token is expired.', async () => {
      const expireTokenRequest = await generateUser({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxNjkyNTIwMDE5MDU2LCJpYXQiOjE2OTI1MjAwMTksImV4cCI6MTY5MjUyMjQxOX0.xR9nNhuDeS6ePNGdR3I9hDs6YkljEaIRyGugCpSZHWk',
      })
      const response = await generateUser({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxNjkyNTIwMDE5MDU2LCJpYXQiOjE2OTI1MjAwMTksImV4cCI6MTY5MjUyMjQxOX0.xR9nNhuDeS6ePNGdR3I9hDs6YkljEaIRyGugCpSZHWk',
      })

      console.log(response.body)
      expect(response.status).toBe(401)

      expect(JSON.parse(response.text)).toEqual({
        success: false,
        message: 'Token is expired.',
      })
    })
  })

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
      const response = await generateUser({
        imageWidth: 2456,
        imageHeight: 1336,
      })
      expect(response.status).toBe(422)
      expect(JSON.parse(response.text)).toEqual({
        success: false,
        message: 'Validation failed',
        fails: {
          photo: ['The photo size must not exceed 5MB.'],
        },
      })
    })
    test('User with this (phone) or email already exist', async () => {
      const response = await generateUser({ phone: '+380900071441' })
      expect(response.status).toBe(409)
      expect(JSON.parse(response.text)).toEqual({
        success: false,
        message: 'User with this phone or email already exist',
      })
    })
    test('User with this phone or (email) already exist', async () => {
      const response = await generateUser({ email: 'raymundo92@yahoo.com' })
      expect(response.status).toBe(409)
      expect(JSON.parse(response.text)).toEqual({
        success: false,
        message: 'User with this phone or email already exist',
      })
    })
  })
})
describe('[GET] users/:id', () => {
  test('The user id must be an integer', async () => {
    const response = await request(app).get(`/users/Invalid`)
    expect(response.statusCode).toBe(400)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('fails')
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.user).toBeUndefined()
    expect(response.body.message).toBe('Validation failed')
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.fails.user_id).toContain(
      'The user id must be an integer.'
    )
    expect(response.body).toHaveProperty('message')
  })

  test('The user with the requested identifier does not exist.', async () => {
    const response = await request(app).get(`/users/0`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('fails')
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.user).toBeUndefined()
    expect(response.body.message).toBe(
      'The user with the requested identifier does not exist.'
    )
    expect(Array.isArray(response.body.fails.user_id)).toBe(true)
    expect(response.body.fails.user_id).toEqual(['User not found.'])
    expect(response.body).toHaveProperty('message')
  })
})
describe('[GET] /positions ', () => {
  xtest('Positions not found.', async () => {
    //?
    const response = await request(app).get(`/positions`)
    expect(response.statusCode).toBe(422)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Positions not found.')
  })
  xtest('Page not found.', async () => {
    //?
    const response = await request(app).get(`/positions`)
    expect(response.statusCode).toBe(404)
    expect(response.body.success).toBe(false)
    const contentType = response.headers['content-type']
    expect(contentType).toContain('application/json')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('Page not found.')
  })
})
