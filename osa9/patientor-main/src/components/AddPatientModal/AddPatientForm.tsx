import {useState, SyntheticEvent} from 'react';
import {Box, TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent} from '@mui/material';
import {PatientFormValues, Gender} from '../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
	value: Gender;
	label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
	value: v,
	label: v.toString(),
}));

const inputStyles = {
	marginBottom: `5px`,
};

const AddPatientForm = ({onCancel, onSubmit}: Props) => {
	const [name, setName] = useState(``);
	const [occupation, setOccupation] = useState(``);
	const [ssn, setSsn] = useState(``);
	const [dateOfBirth, setDateOfBirth] = useState(``);
	const [gender, setGender] = useState(Gender.Other);

	const onGenderChange = (event: SelectChangeEvent<string>) => {
		event.preventDefault();
		if (typeof event.target.value === `string`) {
			const value = event.target.value;
			const gender = Object.values(Gender).find((g) => g.toString() === value);
			if (gender) {
				setGender(gender);
			}
		}
	};

	const addPatient = (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({
			name,
			occupation,
			ssn,
			dateOfBirth,
			gender,
		});
	};

	return (
		<Box>
			<form onSubmit={addPatient}>
				<TextField
					id='name'
					label='Name'
					fullWidth
					value={name}
					onChange={({target}) => setName(target.value)}
					style={inputStyles}
				/>
				<TextField
					id='ssn'
					label='Social security number'
					fullWidth
					value={ssn}
					onChange={({target}) => setSsn(target.value)}
					style={inputStyles}
				/>
				<TextField
					id='birthdate'
					label='Date of birth'
					placeholder='YYYY-MM-DD'
					fullWidth
					value={dateOfBirth}
					onChange={({target}) => setDateOfBirth(target.value)}
					style={inputStyles}
				/>
				<TextField
					id='occupation'
					label='Occupation'
					fullWidth
					value={occupation}
					onChange={({target}) => setOccupation(target.value)}
					style={inputStyles}
				/>

				<InputLabel>Gender</InputLabel>
				<Select id='gender' label='Gender' fullWidth value={gender} onChange={onGenderChange} style={inputStyles}>
					{genderOptions.map((option) => (
						<MenuItem id={option.value} key={option.label} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>

				<Grid>
					<Grid item>
						<Button color='secondary' variant='contained' style={{float: `left`}} type='button' onClick={onCancel}>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: `right`,
							}}
							data-testid='submitPatient'
							type='submit'
							variant='contained'
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default AddPatientForm;

