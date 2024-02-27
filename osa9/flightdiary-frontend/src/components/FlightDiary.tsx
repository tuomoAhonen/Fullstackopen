import {FlightDiary} from '../types';

const FlightDiaryContent = ({flightDiary}: {flightDiary: FlightDiary}): React.ReactElement => {
	const stylesDiv: React.CSSProperties = {margin: 0, marginBottom: '10px', padding: 0};
	const stylesP: React.CSSProperties = {margin: 0, padding: 0};

	return (
		<div style={stylesDiv}>
			<h3 style={stylesP}>{flightDiary.date}</h3>
			{/*<p style={stylesP}>{flightDiary.comment}</p>*/}
			<p style={stylesP}>Weather: {flightDiary.weather}</p>
			<p style={stylesP}>Visibility: {flightDiary.visibility}</p>
		</div>
	);
};

export default FlightDiaryContent;
