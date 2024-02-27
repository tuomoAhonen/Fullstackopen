import {Box, Typography, List, ListItem, ListItemText, Divider} from '@mui/material';
import {/*Entry, */ Diagnose, OccupationalHealthCareEntry} from '../../../../types';
import DiagnosePage from '../DiagnosePage';

const OccupationalHealthCareEntryPage = ({
	entry,
	diagnoses,
}: {
	entry: OccupationalHealthCareEntry;
	diagnoses: Diagnose[] | null;
}): React.ReactElement => {
	const styles = {margin: 0, padding: 0};
	return (
		<Box>
			<ListItem>
				<ListItemText sx={styles}>Occupational health care</ListItemText>
				<ListItemText sx={styles}>{entry.date}</ListItemText>
				<ListItemText sx={styles}></ListItemText>
			</ListItem>
			<ListItem>
				<ListItemText sx={styles}>Employer: {entry.employerName}</ListItemText>
			</ListItem>
			{entry.sickLeave && entry.sickLeave.startDate && (
				<ListItem>
					<ListItemText sx={styles}>
						Sick leave started on {entry.sickLeave.startDate}
						{entry.sickLeave.endDate && ` and ended on ${entry.sickLeave.endDate}`}
					</ListItemText>
				</ListItem>
			)}
			<ListItem>
				<ListItemText sx={styles}>{entry.description}</ListItemText>
			</ListItem>
			{/*<Divider />*/}
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
			<Divider sx={{marginTop: `5px`, marginBottom: `5px`}} />
		</Box>
	);
};

export default OccupationalHealthCareEntryPage;
