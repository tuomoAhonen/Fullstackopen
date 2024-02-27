import {useState, useEffect} from 'react';
import axios from 'axios';
import {Route, Link, Routes, useMatch} from 'react-router-dom';
import {Box, Button, Divider, Container, Typography} from '@mui/material';
import {apiBaseUrl} from './constants';
import {Patient, Diagnose} from './types';
import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/Patient/PatientPage';
import diagnoseService from './services/diagnoses';
import Message from './components/Notification/Notification';
import {useMessageValue} from './reducers/MessageReducer';
//import AddNewEntryModal from './components/AddNewEntryModal';

// useState of patients should have reducer, but it is not relevant for this exercise,
// so I will let it slide and pass it with waterfall-style
const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
	const [message, setMessage] = useState<any>(null);

	const messageValue = useMessageValue();

	useEffect(() => {
		setMessage(messageValue);
	}, [messageValue]);
	//console.log(patients);

	useEffect(() => {
		(async () => {
			try {
				void axios.get<void>(`${apiBaseUrl}/ping`);
			} catch (e) {
				return console.log(e);
			}
		})();

		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();
	}, []);

	useEffect(() => {
		//console.log('kuinka monta kertaa');
		(async () => {
			try {
				const d: Diagnose[] = await diagnoseService.getDiagnoses();
				setDiagnoses(d);
			} catch (error: unknown) {
				if (error instanceof Error) {
					return console.log(error.message);
				}
				return console.log(error);
			}
		})();
	}, []);

	const match = useMatch(`/patient/:id`);
	const id = match ? match.params.id : null;

	return (
		<Box className='App'>
			<Container>
				{message && <Message message={message} />}
				<Typography variant='h3' style={{marginBottom: `0.5em`}}>
					Patientor
				</Typography>
				<Button component={Link} to='/' variant='contained' color='primary' sx={{marginRight: `5px`}}>
					Home
				</Button>
				{/*<Button
					component={Link}
					to='/AddNewEntry'
					variant='contained'
					color='primary'>
				>
					Add New Entry
				</Button>
        */}
				<Divider hidden />
				<Routes>
					<Route path='/' element={<PatientListPage patients={patients} setPatients={setPatients} />} />
					{/*<Route path='/AddNewEntry' element={<AddNewEntryModal />} />*/}
					<Route path='/patient/:id' element={<PatientPage id={id} diagnoses={diagnoses} />} />
				</Routes>
			</Container>
		</Box>
	);
};

export default App;

