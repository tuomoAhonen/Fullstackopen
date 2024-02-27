import {useState, useEffect} from 'react';
//import {useSubscription} from '@apollo/client';
//import Login from './components/Login';
import Navigation from './components/Navigation';
import {NavContextProvider} from './reducers/NavReducer';
import NavigationGuest from './components/GuestNavigation';
//import {addBookSubscription, getBooks} from './apollo/queries';

const initialUserObject = {favoriteGenre: '', id: null, name: '', username: ''};

const App = () => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState(initialUserObject);

	/*
	useSubscription(addBookSubscription, {
		onError: (error) => console.log(error.message),
		onData: ({data, client}) => {
			console.log(data);
			return client.cache.updateQuery({query: getBooks}, ({allBooks}) => {
				return {allBooks: allBooks.concat(data.data.bookAdded)};
			});
		},
		onComplete: (data) => {
			return console.log(data);
		},
	});
	*/

	//console.log(user);

	const logout = () => {
		setToken('');
		setUser(initialUserObject);
		localStorage.clear();
		return window.location.reload();
	};

	// eslint-disable-next-line
	const verifyTokenExpiration = () => {
		if (token) {
			//console.log(token);
			const jwt = JSON.parse(atob(token.split('.')[1]));
			if (jwt.exp * 1000 < Date.now()) {
				return logout();
			} else {
				return null;
			}
		}
	};

	//useEffect will set token for the session until the token is expired
	useEffect(() => {
		if (localStorage.jwt) {
			return setToken(localStorage.jwt);
		}
		// eslint-disable-next-line
	}, [localStorage]);

	//check for token and if it is expired
	useEffect(
		() => {
			if (token) {
				//atob decodes the encrypted token and it will be parsed object
				//console.log(token);
				const jwt = JSON.parse(atob(token.split('.')[1]));
				//console.log(jwt);

				//if the token is expired, logout-function will be used
				if (jwt.exp * 1000 < Date.now()) {
					return logout();
				}

				//console.log(jwt);

				if (jwt && jwt.data && Object.keys(jwt.data).length > 0) {
					return setUser(jwt.data);
				}
			}
		}, // eslint-disable-next-line
		[token]
	);

	if (token && user && user.username) {
		verifyTokenExpiration();
		return (
			<div>
				<NavContextProvider>
					<Navigation logout={logout} token={token} user={user} verifyTokenExpiration={verifyTokenExpiration} />
				</NavContextProvider>
			</div>
		);
	}

	return (
		<div>
			<NavContextProvider>
				<NavigationGuest token={token} setToken={setToken} />
			</NavContextProvider>
		</div>
	);
};

export default App;

