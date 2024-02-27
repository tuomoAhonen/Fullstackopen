import {useState, useEffect} from 'react';
import {Patient, Diagnose} from '../../types';
import patientService from '../../services/patients';
//import diagnoseService from '../../../services/diagnoses';
import {Box, Typography, List, ListItem, ListItemText, Divider, Button} from '@mui/material';
import EntryPage from './Entry/EntryPage';
import AddNewEntryModal from '../AddNewEntryModal';
import {EntryTypeContextProvider} from '../../reducers/EntryTypeReducer';
import PatientInfo from './PatientInfo';

const PatientPage = ({
	id,
	diagnoses,
}: {
	id: string | null | undefined;
	diagnoses: Diagnose[];
}): null | React.ReactElement => {
	const [patient, setPatient] = useState<Patient>();
	const [modalOpen, setModalOpen] = useState(false);
	//const [diagnoses, setDiagnoses] = useState<Diagnose[]>();

	useEffect(() => {
		if (id && id !== null) {
			(async () => {
				try {
					const p: Patient = await patientService.getPatientById(id);
					//console.log(p);
					setPatient(p);
				} catch (error: unknown) {
					if (error instanceof Error) {
						return console.log(error.message);
					}
					return console.log(error);
				}
			})();
		}
	}, [id]);

	if (!id || id === null) {
		return null;
	}

	return (
		<Box>
			{patient && modalOpen === true && (
				<EntryTypeContextProvider>
					<AddNewEntryModal patient={patient} diagnoses={diagnoses} setModalOpen={setModalOpen} />
				</EntryTypeContextProvider>
			)}
			{patient && Object.keys(patient).length > 0 && (
				<>
					<PatientInfo patient={patient} />
					<Button variant='contained' color='primary' onClick={() => setModalOpen(true)}>
						Add New Entry
					</Button>
					{patient.entries && patient.entries.length > 0 ? (
						<List data-testid='patient-entries'>
							<ListItem>
								<ListItemText>
									<Typography variant='h6' style={{marginBottom: 0}}>
										Entries
									</Typography>
								</ListItemText>
							</ListItem>
							<Divider sx={{marginBottom: `5px`}} />
							{patient.entries.map((e, index) => {
								return (
									<EntryPage key={index} entry={e} diagnoses={diagnoses && diagnoses.length > 0 ? diagnoses : null} />
								);
							})}
						</List>
					) : (
						<Box sx={{paddingLeft: `15px`}}>
							<Typography variant='h6' style={{marginBottom: 0}}>
								No entries found
							</Typography>
						</Box>
					)}
				</>
			)}
		</Box>
	);
};

export default PatientPage;

/*<List>
		<ListItem>
			<Typography variant='h6' style={{marginBottom: 0}}>
				Entries
			</Typography>
		</ListItem>
		<Divider />
		{patient.entries.map((e, index) => {
			return (
				<Box key={index}>
					<ListItem>
						<ListItemText>{e.description}</ListItemText>
					</ListItem>
					<Divider />
					<ListItem>
						{e.diagnosisCodes && e.diagnosisCodes.length > 0 && (
							<List>
								<ListItem>
									<Typography variant='h6' style={{marginBottom: 0}}>
										Diagnoses
									</Typography>
								</ListItem>
								{e.diagnosisCodes.map((dcode, index2) => {
									const dcLength = e.diagnosisCodes ? e.diagnosisCodes.length : null;
									const diagnose = diagnoses
										? diagnoses.length > 0
											? diagnoses.find((d) => d.code === dcode)
											: null
										: null;
									//console.log(dcLength, index);
									return (
										<Box key={index2}>
											<ListItem>
												<ListItemText>
													{dcode}: {diagnose?.name}
												</ListItemText>
											</ListItem>
											{dcLength !== index2 + 1 && dcLength !== null && <Divider />}
										</Box>
									);
								})}
							</List>
						)}
					</ListItem>
				</Box>
			);
		})}
	</List>*/

