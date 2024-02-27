import {Box, Typography, List, ListItem, ListItemText, Divider, SvgIcon} from '@mui/material';
import {Favorite, FavoriteBorder, HeartBroken, MonitorHeart} from '@mui/icons-material';
import {/*Entry, */ Diagnose, HealthCheckEntry} from '../../../../types';
import DiagnosePage from '../DiagnosePage';

const HealthCheckEntryPage = ({
	entry,
	diagnoses,
}: {
	entry: HealthCheckEntry;
	diagnoses: Diagnose[] | null;
}): React.ReactElement => {
	const styles = {margin: 0, padding: 0};

	const setHealthRatingIcon = () => {
		switch (entry.healthCheckRating) {
		case 0:
			return <SvgIcon component={Favorite} sx={{...styles, color: `green`}} />;
		case 1:
			return <SvgIcon component={FavoriteBorder} sx={{...styles, color: `yellow`}} />;
		case 2:
			return <SvgIcon component={MonitorHeart} sx={{...styles, color: `orange`}} />;
		case 3:
			return <SvgIcon component={HeartBroken} sx={{...styles, color: `red`}} />;
		default:
			return null;
		}
	};

	//console.log(entry.type);

	return (
		<Box>
			<ListItem>
				<ListItemText sx={styles}>Health check</ListItemText>
				<ListItemText sx={styles}>{entry.date}</ListItemText>
				<ListItemText sx={styles}>{setHealthRatingIcon()}</ListItemText>
			</ListItem>
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

export default HealthCheckEntryPage;

