import {useState, useEffect} from 'react';
import {logIn} from '../services/LoginService';
import PropTypes from 'prop-types';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

const Login = ({login, handleMessage}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [screenSize, setScreenSize] = useState(window.matchMedia('(max-width: 600px)').matches);

	useEffect(() => {
		window.matchMedia('(max-width: 600px)').addEventListener('change', (e) => setScreenSize(e.matches));
	}, []);

	const loginMutation = useMutation(logIn, {
		onSuccess: (user /*, data*/) => {
			//console.log(data);
			setUsername('');
			setPassword('');
			handleMessage('Login successful', 'success');
			return login(user);
		},
		onError: (/*error*/) => {
			//console.log(error);
			return handleMessage('Wrong user credentials, try again...', 'error');
		},
	});

	const handleLogin = (e) => {
		e.preventDefault();
		loginMutation.mutate({username: username, password: password});
	};

	return (
		<div
			style={{
				width: screenSize ? 'auto' : '21em',
				margin: 'auto',
				padding: '5px',
				paddingBottom: '8px',
				backgroundColor: '#5F9EA0',
				borderRadius: '5px',
			}}
		>
			<div style={{width: '18em', margin: 'auto', padding: 0}}>
				<form id='loginForm' onSubmit={(e) => handleLogin(e)}>
					<label htmlFor='username' style={{}}>
						Username:{' '}
					</label>
					<br />
					<input
						id='username'
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type='text'
						style={{width: '20em', marginBottom: '0.5em'}}
					/>
					<br />
					<label htmlFor='password' style={{}}>
						Password:{' '}
					</label>
					<br />
					<input
						id='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						style={{width: '20em', marginBottom: '1em'}}
					/>
					<br />
					<input id='submitLogin' type='submit' value='Login' style={{float: 'left', margin: 0}} />
					<br />
				</form>
			</div>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

export default Login;
