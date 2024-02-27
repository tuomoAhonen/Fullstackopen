import {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch} from '../../../reducers/EntryTypeReducer';
import {Box, TextField, Typography} from '@mui/material';

const OccupationalHealthcareFields = () => {
	const [startDate, setStartDate] = useState<string>(moment().format(`YYYY-MM-DD`));
	const [endDate, setEndDate] = useState<string>(moment().format(`YYYY-MM-DD`));

	const dispatch = useDispatch();

	useEffect(() => {
		//console.log('useEffect');
		return dispatch({
			sickLeave: {startDate: moment(startDate).format(`YYYY-MM-DD`), endDate: moment(endDate).format(`YYYY-MM-DD`)},
		});
		// eslint-disable-next-line
	}, [startDate, endDate]);

	return (
		<Box sx={{marginBottom: `5px`}}>
			<Typography variant='h6' sx={{marginBottom: `5px`}}>
				Sick leave dates
			</Typography>
			<TextField
				type='date'
				label='Start date'
				value={startDate}
				onChange={(e) => setStartDate(moment(e.target.value).format(`YYYY-MM-DD`))}
				fullWidth
				sx={{marginBottom: `10px`}}
			/>
			<TextField
				type='date'
				label='End date'
				value={endDate}
				onChange={(e) => setEndDate(moment(e.target.value).format(`YYYY-MM-DD`))}
				fullWidth
			/>
		</Box>
	);
};

export default OccupationalHealthcareFields;
