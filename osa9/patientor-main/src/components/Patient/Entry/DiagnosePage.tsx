import {Box, ListItem, ListItemText, Divider} from '@mui/material';
import {Diagnose} from '../../../types';

const DiagnosePage = ({
	index,
	dcode,
	diagnose,
	dcLength,
}: {
	index: number;
	dcode: string;
	diagnose: Diagnose | null;
	dcLength: number | null;
}) => {
	const styles = {margin: 0, padding: 0};
	return (
		<Box>
			<ListItem>
				<ListItemText sx={styles}>
					{dcode}: {diagnose?.name}
				</ListItemText>
			</ListItem>
			{dcLength !== index + 1 && dcLength !== null && <Divider />}
		</Box>
	);
};

export default DiagnosePage;
