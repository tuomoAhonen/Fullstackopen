import DisplayApp from './components/DisplayApp';
import Login from './components/Login';
import Notification from './components/Notification';
import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {useNotificationDispatch} from './reducers/NotificationReducer';
import {useUserAccountValue, useUserAccountDispatch} from './reducers/UserAccountReducer';
import {AppContainer} from './styles/StyledComponents';

const App = () => {
	//const [userCredentials, setUserCredentials] = useState(null);
	const userAccountValue = useUserAccountValue();
	const userAccountDispatch = useUserAccountDispatch();

	//console.log(userValue);

	const notificationDispatch = useNotificationDispatch();

	const setUser = (credentials, type) => {
		//console.log(credentials);
		//console.log(type);
		if (type === 'user') {
			userAccountDispatch({payload: credentials, type: 'user'});
		} else {
			userAccountDispatch({type: null});
		}
		//return setUserCredentials(credentials);
	};

	useEffect(() => {
		//console.log('useEffect 2');
		const loggedUserJSON = window.localStorage.getItem('loginInfo');
		//console.log(loggedUserJSON);

		const conditionsNotToMatch = ['null', null, 'undefined', undefined];

		if (loggedUserJSON && !conditionsNotToMatch.includes(loggedUserJSON)) {
			const user = JSON.parse(loggedUserJSON);
			//console.log(user);
			setUser(user, 'user');
		}
	}, []);

	const handleLogin = (user) => {
		setUser(user, 'user');
		//setUserCredentials(user);
		return window.localStorage.setItem('loginInfo', JSON.stringify(user));
	};

	const handleMessage = (msg, type) => {
		notificationDispatch({payload: msg, type: type});
		setTimeout(() => {
			return notificationDispatch({type: null});
		}, 2500);
	};

	//console.log(userValue.user);

	return (
		<AppContainer>
			{userAccountValue && userAccountValue.user !== null ? (
				<BrowserRouter>
					<DisplayApp userCredentials={userAccountValue.user} setUser={setUser} handleMessage={handleMessage} />
				</BrowserRouter>
			) : (
				<Login login={handleLogin} handleMessage={handleMessage} />
			)}
			<Notification />
		</AppContainer>
	);
};

export default App;
