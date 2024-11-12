import { HOST, PORT } from '../config.js'
import supertest from 'supertest'
export const app = `http://localhost:3000`
// export const app = `http://${HOST}:${PORT}`

export const request = supertest
export const userRange = 2
