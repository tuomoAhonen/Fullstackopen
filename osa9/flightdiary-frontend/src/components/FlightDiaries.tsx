import {useEffect, useState} from 'react';
import {FlightDiary} from '../types';
import {getFlightDiaries} from '../services/flightdiaryService';
import FlightDiaryContent from './FlightDiary';

const FlightDiaries = ({passData}: {passData: FlightDiary | undefined}): React.ReactElement => {
	const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([]);

	const fetchFlightDiaries = async (): Promise<void | string | unknown> => {
		try {
			const result = await getFlightDiaries();
			return setFlightDiaries(result);
		} catch (error: unknown) {
			if (error instanceof Error) {
				return error.message;
			}
			return error;
		}
	};

	useEffect(() => {
		//console.log('useEffect');
		(async () => await fetchFlightDiaries())();
	}, [passData]);

	return (
		<div>
			<h2 style={{margin: 0, marginBottom: '10px'}}>Ilari&#39; Flight Diaries</h2>
			{flightDiaries
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.map((flightDiary, index) => (
					<FlightDiaryContent key={index} flightDiary={flightDiary} />
				))}
		</div>
	);
};

//.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())

export default FlightDiaries;
