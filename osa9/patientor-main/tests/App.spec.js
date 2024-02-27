//import {act} from 'react-dom/test-utils';
import {BrowserRouter as Router} from 'react-router-dom';
import {render, screen, act, waitFor} from '@testing-library/react';
import axiosMock from 'axios';
import App from '../src/App';
import {MessageContextProvider} from '../src/reducers/MessageReducer';
import {diagnoses, patients} from './mocks';

jest.mock(`axios`);
const message = jest.fn();

describe(`Testing App-component`, () => {
	test(`Mocking data`, async () => {
		axiosMock.get.mockResolvedValueOnce({
			data: {
				patients: patients,
			},
		});

		axiosMock.get.mockResolvedValueOnce({
			data: {
				diagnoses: diagnoses,
			},
		});

		// act() is for React's states, setting, updating or deleting states
		await act(async () => {
			return render(
				<Router>
					<MessageContextProvider value={{message}}>
						<App />
					</MessageContextProvider>
				</Router>
			);
		});

		expect(axiosMock.get).toHaveBeenCalledTimes(3);
		expect(await screen.findByText(`Patientor`)).toBeVisible();
	});
});

