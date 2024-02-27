import {Typography, List, ListItem, ListItemText, Divider} from '@mui/material';

const PatientInfo = ({patient}: any) => {
	return (
		<List data-testid='patient-info'>
			<ListItem>
				<Typography variant='h5' style={{marginBottom: 0}}>
					{patient.name}
				</Typography>
			</ListItem>
			<Divider />
			<ListItem>
				<ListItemText>Gender: {patient.gender}</ListItemText>
			</ListItem>
			<Divider />
			<ListItem>
				<ListItemText>SSN: {patient.ssn}</ListItemText>
			</ListItem>
			<Divider />
			<ListItem>
				<ListItemText>Birthdate: {patient.dateOfBirth}</ListItemText>
			</ListItem>
			<Divider />
			<ListItem>
				<ListItemText>Occupation: {patient.occupation}</ListItemText>
			</ListItem>
		</List>
	);
};

export default PatientInfo;

