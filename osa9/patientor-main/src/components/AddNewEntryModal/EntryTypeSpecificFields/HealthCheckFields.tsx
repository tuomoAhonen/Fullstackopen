import {useState, useEffect} from 'react';
import {Box, InputLabel, MenuItem, Select} from '@mui/material';
import {HealthCheckRating} from '../../../types';
import {useDispatch} from '../../../reducers/EntryTypeReducer';

const HealthCheckFields = () => {
	const [healthCheckRating, setHealthCheckRating] = useState(Object.values(HealthCheckRating)[0]);

	const dispatch = useDispatch();

	useEffect(() => {
		//console.log(healthCheckRating);
		return dispatch(healthCheckRating);
		// eslint-disable-next-line
	}, [healthCheckRating]);

	return (
		<Box sx={{marginBottom: `5px`}}>
			<InputLabel variant='standard'>Health check rating</InputLabel>
			<Select
				//label='Health check rating'
				//defaultValue={Object.values(HealthCheckRating)[0]}
				value={healthCheckRating}
				onChange={(e) => setHealthCheckRating(e.target.value)}
				fullWidth
			>
				{Object.keys(HealthCheckRating).map((hcr, index): any => {
					//console.log(Number.isNaN(Number(hcr)));
					if (Number.isNaN(Number(hcr))) {
						return (
							<MenuItem key={index} value={hcr}>
								{hcr}
							</MenuItem>
						);
					}
					return null;
				})}
			</Select>
			{/*<TextField type='text' fullWidth />*/}
		</Box>
	);
};

export default HealthCheckFields;
