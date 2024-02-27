const {defaults} = require(`jest-config`);

/** @type {import('jest').Config} */
const config = {
	moduleFileExtensions: [...defaults.moduleFileExtensions, `mts`, `ts`, `tsx`, `js`, `jsx`],
	moduleDirectories: [`node_modules`, `src`, `<rootDir>`],
	moduleNameMapper: {
		axios: `axios/dist/node/axios.cjs`,
	},
	setupFilesAfterEnv: [`<rootDir>/tests/jest-setup.js`],
	roots: [`<rootDir>/src/`, `<rootDir>/tests/`, `<rootDir>`],
	bail: 1,
	verbose: true,
	silent: false,
	testEnvironment: `jest-environment-jsdom`,
};

module.exports = config;
