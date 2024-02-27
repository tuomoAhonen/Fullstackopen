import {render, screen} from '@testing-library/react';
import {diagnoses, healthCheckEntry} from './mocks';
import HealthCheckEntry from '../src/components/Patient/Entry/EntryTypes/HealthCheckEntry';

describe(`Testing HealthCheckEntryPage`, () => {
	test(`Mocking data to display entry`, () => {
		const diagnosesMock = jest.fn(() => diagnoses);
		const healthCheckEntryMock = jest.fn(() => healthCheckEntry);

		render(<HealthCheckEntry entry={healthCheckEntryMock()} diagnoses={diagnosesMock()} />);

		expect(screen.getByText(`Health check`)).toBeVisible();
		expect(screen.getByText(healthCheckEntryMock().date)).toBeVisible();
		expect(screen.getByTestId(`FavoriteIcon`)).toBeVisible();
		expect(screen.getByText(healthCheckEntryMock().description)).toBeVisible();
		expect(screen.getByText(`Diagnose by ${healthCheckEntryMock().specialist}`)).toBeVisible();
	});
});

