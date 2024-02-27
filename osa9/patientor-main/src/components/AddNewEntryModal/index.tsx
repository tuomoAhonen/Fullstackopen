import {useEffect, useState} from 'react';
import moment from 'moment';
import {Box, Button, Divider, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
//import patientService from '../../services/patients';
import patientService from '../../services/patients';
import {Patient, EntryWithoutId, EntryType, Diagnose, HealthCheckRating} from '../../types';
import EntryTypeSpecificFields from './EntryTypeSpecificFields';
import {useValue} from '../../reducers/EntryTypeReducer';
import {useMessageDispatch} from '../../reducers/MessageReducer';

const AddNewEntryModal = ({
	patient,
	diagnoses,
	setModalOpen,
}: {
	patient: Patient;
	diagnoses: Diagnose[];
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	//const [patients, setPatients] = useState<Patient[]>([]);
	const [type, setType] = useState<EntryType>(Object.values(EntryType)[0]);
	const [date, setDate] = useState<String>(moment().format(`YYYY-MM-DD`));
	const [description, setDescription] = useState<String>(``);
	const [specialist, setSpecialist] = useState<string>(``);
	const [newDiagnoseCode, setNewDiagnoseCode] = useState<String>(diagnoses && diagnoses[0].code);
	const [diagnoseCodes, setDiagnoseCodes] = useState<String[]>([]);
	const [specificFields, setSpecificFields] = useState<any>();
	const [checkBox, setCheckBox] = useState(false);
	const [employer, setEmployer] = useState<String>(``);

	const reducerValue = useValue();
	const messageDispatch = useMessageDispatch();
	//console.log(checkBox);

	useEffect(() => {
		//console.log('new specificFields Value');
		if (typeof reducerValue === `object`) {
			return setSpecificFields({...reducerValue});
		} else {
			return setSpecificFields(reducerValue);
		}
		// eslint-disable-next-line
	}, [reducerValue]);

	//console.log(type);

	const addDiagnoseCode = () => {
		if (!diagnoseCodes.find((dcode) => dcode === newDiagnoseCode)) {
			return setDiagnoseCodes([...diagnoseCodes, newDiagnoseCode]);
		}
	};

	const removeDiagnoseCode = () => {
		setDiagnoseCodes([...diagnoseCodes.filter((dcode) => dcode !== newDiagnoseCode)]);
	};

	const submitNewEntryModal = (): void | null => {
		if (!type) return messageDispatch(`Choose type`, `error`);
		if (!date) return messageDispatch(`Choose date`, `error`);
		if (!description) return messageDispatch(`Fill Description field`, `error`);
		if (!specialist) return messageDispatch(`Fill Specialist field`, `error`);

		let newEntry: any = {
			date,
			description,
			specialist,
			diagnosisCodes: diagnoseCodes && diagnoseCodes,
			type: type,
		};

		if (type === EntryType.HealthCheck) {
			if (typeof specificFields === `string`) {
				//newEntry.healthCheckRating = specificFields;
				const hCr: any = Object.entries(HealthCheckRating).find((e) => e[1] === specificFields);
				newEntry.healthCheckRating = Number(hCr[0]);
			} else {
				return messageDispatch(`Something went wrong with Health check rating`, `error`);
			}
		} else if (type === EntryType.Hospital) {
			if (checkBox) {
				//console.log(specificFields);
				if (
					specificFields &&
					specificFields.discharge &&
					specificFields.discharge.date &&
					specificFields.discharge.criteria
				) {
					newEntry = {...newEntry, ...specificFields};
				} else {
					return messageDispatch(`Fill date and criteria for discharge or remove tick from the checkBox`, `error`);
				}
			}
		} else if (type === EntryType.OccupationalHealthcare) {
			if (!employer) return messageDispatch(`Fill employer field`, `error`);
			newEntry.employerName = employer;
			if (checkBox) {
				//console.log(specificFields);
				if (specificFields) {
					newEntry = {...newEntry, ...specificFields};
				}
			}
		}
		//console.log(newEntry);

		(async () => {
			try {
				//console.log(newEntry);
				const result = await patientService.postNewEntry(newEntry as EntryWithoutId, patient.id);
				console.log(result);
				patient.entries.push(result);
				console.log(patient);
				messageDispatch(`New entry added to patient`, `success`);
				return setModalOpen(false);
			} catch (error: unknown) {
				if (error instanceof Error) {
					return messageDispatch(error.message, `error`);
				}
				console.log(`This error needs to be solved and handled to figure out message for it`);
				console.log(error);
				return messageDispatch(`Unknown error`, `error`);
			}
		})();
	};

	const styles = {marginBottom: `5px`};

	if (!patient /* || !patients || (patients && patients.length === 0)*/) {
		return null;
	}

	//console.log(type);

	return (
		<Box
			data-testid='addNewEntry'
			sx={{
				//display: 'block',
				position: `absolute`,
				zIndex: 1,
				//boxSizing: 'inherit',
				minWidth: `300px`,
				top: `10px`,
				padding: `5px`,
				//left: 'auto',
				//right: 'auto',
				backgroundColor: `#ffffff`,
				boxShadow: `0px 0px 10px 10px #A9A9A9`,
			}}
		>
			<Typography variant='h6' style={{marginBottom: 0}}>
				Add new entry
			</Typography>

			<InputLabel htmlFor='type' variant='standard'>
				Type
			</InputLabel>
			<Select
				id='type'
				name='type'
				//label='Type'
				//defaultValue={type}
				value={type}
				onChange={(e) => setType(e.target.value as EntryType)}
				fullWidth
				sx={styles}
			>
				{Object.values(EntryType).map((t, index) => (
					<MenuItem key={index} value={t}>
						{t}
					</MenuItem>
				))}
			</Select>

			<InputLabel htmlFor='date' variant='standard'>
				Date
			</InputLabel>
			<TextField
				id='date'
				name='date'
				type='date'
				value={date}
				onChange={(e) => setDate(moment(e.target.value).format(`YYYY-MM-DD`))}
				fullWidth
				sx={styles}
			/>

			<InputLabel htmlFor='description' variant='standard'>
				Description
			</InputLabel>
			<TextField
				id='description'
				name='description'
				type='text'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				multiline={true}
				rows={5}
				fullWidth
				required
				autoFocus={true}
				sx={styles}
			/>

			<InputLabel htmlFor='specialist' variant='standard'>
				Specialist
			</InputLabel>
			<TextField
				id='specialist'
				name='specialist'
				type='text'
				value={specialist}
				onChange={(e) => setSpecialist(e.target.value)}
				required
				fullWidth
				sx={styles}
			/>

			<Typography sx={{fontSize: `inherit`}}>Add diagnose codes</Typography>
			{/*<TextField type='text' label='New code...' sx={styles} />*/}
			<Box sx={{...styles, display: `flex`}}>
				<Select
					//defaultValue={diagnoses && diagnoses[0].code}
					value={newDiagnoseCode}
					onChange={(e) => setNewDiagnoseCode(e.target.value)}
					sx={{...styles, flexGrow: 1}}
				>
					{diagnoses &&
						diagnoses.map((d) => (
							<MenuItem key={d.code} value={d.code}>
								{d.code}
							</MenuItem>
						))}
				</Select>
				<Button
					variant='contained'
					color='primary'
					onClick={() => removeDiagnoseCode()}
					sx={{width: `auto`, marginLeft: `5px`}}
				>
					Remove
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={() => addDiagnoseCode()}
					sx={{width: `auto`, marginLeft: `5px`}}
				>
					Add
				</Button>
			</Box>
			<Box sx={{...styles, display: `flex`}}>
				<TextField
					type='text'
					label='Diagnosis codes...'
					value={
						diagnoseCodes &&
						diagnoseCodes
							.map((dcode) => dcode)
							.join(`, `)
							.trim()
					}
					inputProps={{readOnly: true}}
					fullWidth
					sx={{...styles, flexGrow: 1}}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={() => setDiagnoseCodes([])}
					sx={{width: `auto`, marginLeft: `5px`}}
				>
					Remove All
				</Button>
			</Box>

			<Divider sx={{marginTop: `10px`, marginBottom: `10px`}} />
			{
				//this would been the easy way to do the type specific fields without reducer
				//and demonstrating with employerName/employer field
				//also the checkbox-thingy for the two other types would had been moven inside the EntryTypeSpecificFields-files, so I went with the easy route.
			}
			{type && type === EntryType.OccupationalHealthcare && (
				<Box>
					<InputLabel htmlFor='emplyer' variant='standard'>
						Employer
					</InputLabel>
					<TextField
						name='employer'
						type='text'
						value={employer}
						onChange={(e) => setEmployer(e.target.value)}
						required
						fullWidth
						sx={styles}
					/>
				</Box>
			)}

			{type && (
				<Box>
					{type === EntryType.Hospital && (
						<Box sx={{display: `block`}}>
							<Typography sx={{display: `inline-block`, fontSize: `inherit`}}>
								Include fields below to submit:
							</Typography>
							<Checkbox
								sx={{display: `inline-block`, marginLeft: `5px`}}
								onChange={() => setCheckBox(checkBox ? false : true)}
							/>
						</Box>
					)}
					{type === EntryType.OccupationalHealthcare && (
						<Box sx={{display: `block`}}>
							<Typography sx={{display: `inline-block`, fontSize: `inherit`}}>
								Include fields below to submit:
							</Typography>
							<Checkbox
								sx={{display: `inline-block`, marginLeft: `5px`}}
								onChange={() => setCheckBox(checkBox ? false : true)}
							/>
						</Box>
					)}
					<EntryTypeSpecificFields type={type} />
				</Box>
			)}

			<Button
				variant='contained'
				color='primary'
				onClick={() => submitNewEntryModal()}
				sx={{marginLeft: `5px`, float: `right`}}
			>
				Submit
			</Button>
			<Button variant='contained' color='info' onClick={() => setModalOpen(false)} sx={{float: `right`}}>
				Cancel
			</Button>
		</Box>
	);
};

export default AddNewEntryModal;

/*
useEffect(() => {
  (async () => {
    const result = await patientService.getAll();
    setPatients(result);
  })();
}, []);

useEffect(() => {
  if (
    (!patient && patients && patients.length > 0) ||
    (patient && Object.keys(patient).length === 0 && patients && patients.length > 0)
  ) {
    setPatient(patients[0]);
  } // eslint-disable-next-line
}, [patients]);
  */

/*
  <InputLabel variant='standard'>Patient</InputLabel>
  <Select
    label='Patient'
    defaultValue={patient.name}
    value={patient.name}
    onChange={(e) => setPatient(patients.find((p) => p.name === e.target.value) as Patient)}
    fullWidth
  >
    {patients.map((p) => (
      <MenuItem key={p.id} value={p.name}>
        {p.name}
      </MenuItem>
    ))}
  </Select>
*/

