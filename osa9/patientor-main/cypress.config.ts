import {defineConfig} from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: `http://localhost:3000`,
	},
	screenshotOnRunFailure: false,
	video: false,
	defaultCommandTimeout: 10000,
	retries: 10,
});

