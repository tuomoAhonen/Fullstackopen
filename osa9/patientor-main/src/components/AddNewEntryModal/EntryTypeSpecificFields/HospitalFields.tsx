import {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch} from '../../../reducers/EntryTypeReducer';
import {Box, InputLabel, TextField} from '@mui/material';

const HospitalFields = () => {
	const [dischargeDate, setDischargeDate] = useState<string>(moment().format(`YYYY-MM-DD`));
	const [criteria, setCriteria] = useState<string>(``);

	const dispatch = useDispatch();

	useEffect(() => {
		return dispatch({discharge: {date: dischargeDate, criteria: criteria}});
		// eslint-disable-next-line
	}, [criteria, dischargeDate]);

	return (
		<Box sx={{marginBottom: `5px`}}>
			<TextField
				id='dischargedate'
				name='dischargedate'
				label='Discharge date'
				type='date'
				value={dischargeDate}
				onChange={(e) => setDischargeDate(moment(e.target.value).format(`YYYY-MM-DD`))}
				fullWidth
				sx={{marginBottom: `5px`}}
			/>
			<InputLabel variant='standard'>Criteria for discharge</InputLabel>
			<TextField
				type='text'
				id='criteria'
				name='criteria'
				value={criteria}
				onChange={(e) => setCriteria(e.target.value)}
				fullWidth
			/>
		</Box>
	);
};

export default HospitalFields;

