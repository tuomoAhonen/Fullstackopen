import {ReactJSXElement} from '@emotion/react/types/jsx-namespace';
import {Entry, Diagnose} from '../../../types';
import HealthCheckEntryPage from './EntryTypes/HealthCheckEntry';
import HospitalEntryPage from './EntryTypes/HospitalEntry';
import OccupationalHealthCareEntryPage from './EntryTypes/OccupationalHealthCareEntry';

const EntryPage = ({entry, diagnoses}: {entry: Entry; diagnoses: Diagnose[] | null}): ReactJSXElement | null => {
	//const styles = {margin: 0, padding: 0};
	switch (entry.type) {
	case `HealthCheck`:
		return <HealthCheckEntryPage entry={entry} diagnoses={diagnoses} />;
	case `Hospital`:
		return <HospitalEntryPage entry={entry} diagnoses={diagnoses} />;
	case `OccupationalHealthcare`:
		return <OccupationalHealthCareEntryPage entry={entry} diagnoses={diagnoses} />;
	default:
		return null;
	}
};

export default EntryPage;

/*
	return (
		<Box>
			<ListItem>
				<ListItemText sx={styles}>{entry.date}</ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText sx={styles}>{entry.description}</ListItemText>
			</ListItem>
			{entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
				<ListItem sx={styles}>
					<List dense={true} sx={styles}>
						<ListItem>
							<Typography variant='h6' style={{marginTop: 0, marginBottom: 0}}>
								Diagnoses
							</Typography>
						</ListItem>
						{entry.diagnosisCodes.map((dcode, index) => {
							const dcLength = entry.diagnosisCodes ? entry.diagnosisCodes.length : null;
							const diagnose = diagnoses
								? diagnoses.length > 0
									? diagnoses.find((d) => d.code === dcode)
									: null
								: null;
							//console.log(dcLength, index);
							return (
								<DiagnosePage
									key={index}
									index={index}
									dcode={dcode}
									diagnose={diagnose ? diagnose : null}
									dcLength={dcLength ? dcLength : null}
								/>
							);
						})}
					</List>
				</ListItem>
			)}
			<ListItem>
				<ListItemText sx={styles}>Diagnose by {entry.specialist}</ListItemText>
			</ListItem>
			<Divider sx={{marginTop: '5px', marginBottom: '5px'}} />
		</Box>
	);
*/

/*
	<Box key={index2}>
		<ListItem>
			<ListItemText>
				{dcode}: {diagnose?.name}
			</ListItemText>
		</ListItem>
		{dcLength !== index2 + 1 && dcLength !== null && <Divider />}
	</Box>
*/
