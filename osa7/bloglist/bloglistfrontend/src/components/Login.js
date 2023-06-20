import {useState} from 'react';
import {logIn} from '../services/LoginService';
import PropTypes from 'prop-types';
import {useMutation} from '@tanstack/react-query';
import {InputText, InputButtonRight, LabelFull, LoginContainer, LoginForm, LoginSubmit} from '../styles/StyledComponents';

const Login = ({login, handleMessage}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

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
		<LoginContainer>
			<LoginForm id='loginForm' onSubmit={(e) => handleLogin(e)}>
				<LabelFull htmlFor='username'>Username: </LabelFull>
				<InputText id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} type='text' />
				<LabelFull htmlFor='password'>Password: </LabelFull>
				<InputText id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
				<LoginSubmit id='submitLogin' type='submit' value='Login' />
			</LoginForm>
		</LoginContainer>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

export default Login;
