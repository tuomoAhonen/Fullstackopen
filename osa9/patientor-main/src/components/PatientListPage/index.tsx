import {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import axios from 'axios';
import {useMessageDispatch} from '../../reducers/MessageReducer';
import {PatientFormValues, Patient} from '../../types';
import AddPatientModal from '../AddPatientModal';
import patientService from '../../services/patients';
import PatientList from './PatientList';

interface Props {
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({patients, setPatients}: Props) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const dispatchMessage = useMessageDispatch();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const submitNewPatient = async (values: PatientFormValues) => {
		try {
			const patient = await patientService.create(values);
			setPatients(patients.concat(patient));
			setModalOpen(false);
			dispatchMessage(`${patient.name} added to patientlist`, `success`);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === `string`) {
					const message = e.response.data.replace(`Something went wrong. Error: `, ``);
					console.error(message);
					setError(message);
				} else {
					setError(`Unrecognized axios error`);
				}
			} else {
				console.error(`Unknown error`, e);
				setError(`Unknown error`);
			}
		}
	};

	return (
		<Box>
			<Box>
				<Typography align='center' variant='h5'>
					Patient list
				</Typography>
			</Box>
			<PatientList patients={patients} />
			<AddPatientModal modalOpen={modalOpen} onSubmit={submitNewPatient} error={error} onClose={closeModal} />
			<Button data-testid='addNewPatient' variant='contained' onClick={() => openModal()}>
				Add New Patient
			</Button>
		</Box>
	);
};

export default PatientListPage;

