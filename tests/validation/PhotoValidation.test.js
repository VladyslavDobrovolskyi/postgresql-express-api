import generateUserAndDoRequest from '../Functions/generateUserAndDoRequest.js'

describe('[POST] /users', () => {
  test('The photo is required.', async () => {
    const response = await generateUserAndDoRequest({ photo: '' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo is required.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })

  test('The photo should be in JPG/JPEG format.', async () => {
    const response = await generateUserAndDoRequest({ imageFormat: 'png' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo should be in JPG/JPEG format.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })

  test('The photo dimensions must be 84x84 pixels.', async () => {
    const response = await generateUserAndDoRequest({
      imageWidth: 95,
      imageHeight: 95,
    })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo dimensions must be 84x84 pixels.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })

  xtest('Invalid image format.', async () => {
    const response = await generateUserAndDoRequest({ imageFormat: 'gif' })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['Invalid image format.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })

  xtest('The photo size must not exceed 5MB.', async () => {
    const response = await generateUserAndDoRequest({
      imageWidth: 2456,
      imageHeight: 1336,
    })
    const expectedResponse = {
      success: false,
      message: 'Validation failed',
      fails: {
        photo: ['The photo size must not exceed 5MB.'],
      },
    }
    expect(response.status).toBe(422)
    expect(response.body).toEqual(expectedResponse)
  })
})
