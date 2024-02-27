import {Link} from 'react-router-dom';
import {Table, TableHead, TableCell, TableRow, TableBody} from '@mui/material';
import {Patient} from '../../types';
import HealthRatingBar from '../HealthRatingBar';

interface Props {
	patients: Patient[];
}

const PatientList = ({patients}: Props) => {
	return (
		<Table data-testid='patients-table' style={{marginBottom: `1em`}}>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Gender</TableCell>
					<TableCell>Occupation</TableCell>
					<TableCell>Health Rating</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{Object.values(patients).map((patient: Patient) => (
					<TableRow key={patient.id}>
						<TableCell>
							<Link to={`/patient/${patient.id}`} style={{textDecoration: `none`, color: `#3f51b5`}}>
								{patient.name}
							</Link>
						</TableCell>
						<TableCell>{patient.gender}</TableCell>
						<TableCell>{patient.occupation}</TableCell>
						<TableCell>
							<HealthRatingBar showText={false} rating={1} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default PatientList;
