import {useState} from 'react';
import FlightDiaries from './components/FlightDiaries';
import NewFlightDiary from './components/NewFlightDiary';
import {FlightDiary} from './types';

const App = () => {
	//This is not needed, but I wanted to test how could I pass data without reducer, if there is two separated components
	//The correct way in this exercise is to move NewFlightDiary into FlightDiaries app, so you can update the Diaries data
	//by passing fetch function or adding manually the new diary to FlightDiaries-array by passing the setState function to NewFlightDiary-component
	const [passData, setPassData] = useState<FlightDiary>();

	return (
		<div>
			<NewFlightDiary setPassData={setPassData} />
			<FlightDiaries passData={passData} />
		</div>
	);
};

export default App;

