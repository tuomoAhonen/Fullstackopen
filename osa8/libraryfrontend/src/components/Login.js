import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {loginUser} from '../apollo/queries';
//import NewUser from './NewUser';
import {useNavDispatch} from '../reducers/NavReducer';

const Login = ({show, setToken}) => {
	//const [newUserActive, setNewUserActive] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navDispatch = useNavDispatch();

	const [loginMutation] = useMutation(loginUser, {
		onError: (error) => console.log(error.message),
		onCompleted: (data) => {
			//console.log(data);
			localStorage.setItem('jwt', data.login.jwt);
			setToken(data.login.jwt);
			return navDispatch('Authors');
		},
	});

	const submitLogin = (e) => {
		e.preventDefault();

		if (!username || !password) {
			//console.log('nope');
			return null;
		}

		return (async () => {
			return await loginMutation({variables: {username: username, password: password}});
		})();
	};

	const basicStyles = {
		display: 'block',
		width: '100%',
		boxSizing: 'inherit',
	};

	if (!show) {
		return null;
	}

	/*
	if (newUserActive) {
		return <NewUser setNewUserActive={setNewUserActive} />;
	}
  */

	return (
		<div>
			<form
				onSubmit={submitLogin}
				style={{
					width: '264px',
					//margin: 'auto',
					marginBottom: '10px',
					backgroundColor: 'darkslategray',
					color: '#ffffff',
					padding: '5px',
					boxSizing: 'border-box',
				}}
			>
				<div style={{...basicStyles}}>
					<label style={{...basicStyles}}>Username:</label>
					<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} style={{...basicStyles}} />
				</div>
				<div style={{...basicStyles, marginTop: '5px'}}>
					<label style={{...basicStyles}}>Password:</label>
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{...basicStyles}} />
				</div>
				<div style={{...basicStyles, minHeight: '28px'}}>
					<input
						type='submit'
						value='Login'
						style={{display: 'inline-block', width: 'auto', marginTop: '5px', marginLeft: '5px', float: 'right', boxSizing: 'inherit'}}
					/>
					<input
						type='button'
						value='Cancel'
						onClick={() => {
							return navDispatch('Authors');
						}}
						style={{display: 'inline-block', width: 'auto', marginTop: '5px', float: 'right', boxSizing: 'inherit'}}
					/>
				</div>
			</form>
			<div
				style={{
					...basicStyles,
					width: '264px',
					//margin: 'auto',
					backgroundColor: 'darkslategray',
					color: '#ffffff',
					padding: '5px',
					boxSizing: 'border-box',
				}}
			>
				<input type='button' value='Create new user account' onClick={() => navDispatch('NewUser')} style={{...basicStyles}} />
			</div>
		</div>
	);
};

export default Login;
