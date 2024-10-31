import { HOST, PORT } from '../config.js'
import supertest from 'supertest'
export const app = `https://frontend-test-assignment-api.abz.agency/api/v1`
// export const app = `http://${HOST}:${PORT}`

export const request = supertest
export const userRange = 2
