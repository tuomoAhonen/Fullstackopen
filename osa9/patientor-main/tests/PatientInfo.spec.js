import {render, screen} from '@testing-library/react';
import {patient} from './mocks';
import PatientInfo from '../src/components/Patient/PatientInfo';

describe(`Testing PatientInfo`, () => {
	test(`Mocking data to display patient`, () => {
		const patientMock = jest.fn(() => patient);

		render(<PatientInfo patient={patientMock()} />);

		expect(screen.getByText(patientMock().name)).toBeVisible();
		expect(screen.getByText(`Gender: ${patientMock().gender}`)).toBeVisible();
		expect(screen.getByText(`SSN: ${patientMock().ssn}`)).toBeVisible();
		expect(screen.getByText(`Birthdate: ${patientMock().dateOfBirth}`)).toBeVisible();
		expect(screen.getByText(`Occupation: ${patientMock().occupation}`)).toBeVisible();
	});
});

