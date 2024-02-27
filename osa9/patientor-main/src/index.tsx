import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import {MessageContextProvider} from './reducers/MessageReducer';

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
	<Router>
		<MessageContextProvider>
			<App />
		</MessageContextProvider>
	</Router>
);

