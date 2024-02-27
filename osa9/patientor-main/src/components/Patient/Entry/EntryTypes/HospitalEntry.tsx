import {Box, Typography, List, ListItem, ListItemText, Divider} from '@mui/material';
import {/*Entry, */ Diagnose, HospitalEntry} from '../../../../types';
import DiagnosePage from '../DiagnosePage';

const HospitalEntryPage = ({
	entry,
	diagnoses,
}: {
	entry: HospitalEntry;
	diagnoses: Diagnose[] | null;
}): React.ReactElement => {
	const styles = {margin: 0, padding: 0};
	return (
		<Box>
			<ListItem>
				<ListItemText sx={styles}>Hospital visit</ListItemText>
				<ListItemText sx={styles}>{entry.date}</ListItemText>
				<ListItemText sx={styles}></ListItemText>
			</ListItem>
			{entry.discharge ? (
				<ListItem>
					<ListItemText sx={styles}>
						Discharged: {entry.discharge.date} on criteria "{entry.discharge.criteria}"
					</ListItemText>
				</ListItem>
			) : (
				<ListItem>
					<ListItemText sx={styles}>
						Discharged: still in care / not released from the hospital / discharge not registered to the system yet
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

export default HospitalEntryPage;
