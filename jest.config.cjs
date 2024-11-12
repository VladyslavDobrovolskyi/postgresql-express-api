module.exports = {
	testRunner: 'jest-jasmine2',
	testEnvironment: 'node',
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	moduleFileExtensions: ['js'],
	testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
	setupFilesAfterEnv: ['jest-allure/dist/setup'],
}
