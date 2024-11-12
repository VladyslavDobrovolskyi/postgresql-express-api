import { app, request } from '../settings.js'

describe('[GET] /token', () => {
	test('Returning valid Token response', async () => {
		Allure.startStep('Sending GET request to /token endpoint')
		const response = await request(app).get('/token')
		Allure.endStep()

		Allure.startStep('Checking response status is 200')
		expect(response.status).toBe(200)
		Allure.endStep()

		Allure.startStep("Checking 'Content-Type' header is 'application/json'")
		expect(response.header['content-type']).toContain('application/json')
		Allure.endStep()

		Allure.startStep('Verifying response body success flag is true')
		expect(response.body.success).toBe(true)
		Allure.endStep()

		Allure.startStep(
			'Checking that token is defined and has the expected length'
		)
		expect(response.body.token).toBeDefined()
		expect(response.body.token.length).toBe(160)
		Allure.endStep()
	})
})
