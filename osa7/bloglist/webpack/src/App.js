import {useEffect, useState} from 'react';
import axios from 'axios';

const useNotes = (url) => {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		axios.get(url).then((response) => {
			setNotes(response.data);
		});
	}, [url]);

	return notes;
};

const App = () => {
	const [counter, setCounter] = useState(0);
	const [values, setValues] = useState([]);
	const notes = useNotes(BACKEND_URL);

	const handleClick = () => {
		setCounter(counter + 1);
		setValues(values.concat(counter));
	};

	const defaultStyles = {
		marginTop: 0,
		marginBottom: '5px',
	};

	return (
		<div className='container'>
			<h2 style={defaultStyles}>Webpack app</h2>
			<div style={{...defaultStyles, display: 'inline-block', marginRight: '5px'}}>{counter}</div>
			<input type='button' value='+' onClick={() => handleClick()} style={{defaultStyles, display: 'inline-block'}} />
			{notes && notes.length > 0 && (
				<div>
					{notes.length} notes on server {BACKEND_URL}
				</div>
			)}
		</div>
	);
};

export default App;
