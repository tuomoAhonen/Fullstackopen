import {useState} from 'react';
import moment from 'moment';
import {postNewFlightDiary} from '../services/flightdiaryService';
import {Weather, WeatherType, Visibility, VisibilityType, FlightDiary} from '../types';
import ErrorMessage from './ErrorMessage';

// eslint-disable-next-line
const NewFlightDiary = ({
	setPassData,
}: {
	setPassData: React.Dispatch<React.SetStateAction<FlightDiary | undefined>>;
}): React.ReactElement => {
	const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
	const [weather, setWeather] = useState<WeatherType>('sunny');
	const [visibility, setVisibility] = useState<VisibilityType>('good');
	const [comment, setComment] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	const resetStates = (): void => {
		setDate(moment().format('YYYY-MM-DD'));
		setWeather('sunny');
		setVisibility('good');
		return setComment('');
	};

	const showError = (message: string): ReturnType<typeof setTimeout> => {
		setErrorMessage(message);
		return setTimeout((): void => {
			return setErrorMessage('');
		}, 5000);
	};

	const getWeather = (): Weather => {
		return Object.keys(Weather).find((w) => w.toString() === weather) as Weather;
	};

	const getVisibility = (): Visibility => {
		return Object.keys(Visibility).find((v) => v.toString() === visibility) as Visibility;
	};

	const submitNewFlightDiary = (e: React.SyntheticEvent): Promise<FlightDiary | void> | null => {
		e.preventDefault();
		if (date && weather && visibility) {
			(async () => {
				try {
					const result = await postNewFlightDiary({
						date: moment(date).format('YYYY-MM-DD'),
						weather: getWeather(),
						visibility: getVisibility(),
						comment: comment,
					});
					resetStates();
					setPassData(result);
					return result;
				} catch (error: unknown) {
					if (error instanceof Error) {
						return showError(error.message);
					}
					return console.log(error);
				}
			})();
		}
		return null;
	};

	const stylesInput: React.CSSProperties = {
		display: 'block',
		width: '300px',
		margin: 0,
		marginBottom: '5px',
	};

	return (
		<div>
			<ErrorMessage errorMessage={errorMessage} />
			<form
				onSubmit={submitNewFlightDiary}
				style={{
					display: 'block',
					height: '102px',
					width: '300px',
					boxSizing: 'border-box',
					marginBottom: '20px',
				}}
			>
				<input
					type='date'
					name='date'
					//placeholder={moment().format('YYYY-MM-DD')}
					min='2010-01-01'
					max={moment().format('YYYY-MM-DD')}
					value={date}
					onChange={(e): void => setDate(e.target.value)}
					//pattern='\d{4}-\d{2}-\d{2}'
					required
					style={stylesInput}
				/>
				<input
					type='text'
					name='comment'
					placeholder='Comment...'
					value={comment}
					onChange={(e): void => setComment(e.target.value)}
					style={stylesInput}
				/>
				<select
					name='weather'
					defaultValue={weather}
					value={weather}
					onChange={(e): void => {
						//console.log(e.target.value);
						return setWeather(e.target.value as WeatherType);
					}}
					required
					style={stylesInput}
				>
					<option value='sunny'>Sunny</option>
					<option value='cloudy'>Cloudy</option>
					<option value='rainy'>Rainy</option>
					<option value='windy'>Windy</option>
				</select>
				<select
					name='visibility'
					defaultValue={visibility}
					value={visibility}
					onChange={(e): void => {
						//console.log(e.target.value);
						return setVisibility(e.target.value as VisibilityType);
					}}
					required
					style={stylesInput}
				>
					<option value='good'>Good</option>
					<option value='poor'>Poor</option>
				</select>
				<input type='submit' value='Submit' style={{float: 'right', marginLeft: '5px'}} />
				<input type='button' value='Cancel' onClick={(): void => resetStates()} style={{float: 'right'}} />
			</form>
		</div>
	);
};

export default NewFlightDiary;
