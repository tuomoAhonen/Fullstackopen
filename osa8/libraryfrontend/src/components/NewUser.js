import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {createUser} from '../apollo/queries';
import {useNavDispatch} from '../reducers/NavReducer';

const NewUser = (props /*{setNewUserActive}*/) => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [favoriteGenre, setFavoriteGenre] = useState('');

	const emptyFields = () => {
		setName('');
		setUsername('');
		setPassword('');
		setFavoriteGenre('');
	};

	const navDispatch = useNavDispatch();

	const [createUserMutation] = useMutation(createUser, {
		onError: (error) => console.log(error),
		onCompleted: (data) => {
			emptyFields();
			return navDispatch('Login');
			/*return setNewUserActive(false);*/
		},
	});

	const submitNewUser = (e) => {
		e.preventDefault();
		//console.log(username);
		//console.log(password);
		//console.log(name);
		(async () => {
			await createUserMutation({variables: {username: username, password: password, name: name, favoriteGenre: favoriteGenre}});
		})();
	};

	const basicStyles = {
		display: 'block',
		width: '100%',
		boxSizing: 'inherit',
	};

	if (!props.show) {
		return null;
	}

	return (
		<div>
			<form
				onSubmit={submitNewUser}
				style={{
					display: 'block',
					width: '264px',
					minHeight: '195px',
					//margin: 'auto',
					backgroundColor: 'darkslategray',
					color: '#ffffff',
					padding: '5px',
					boxSizing: 'border-box',
				}}
			>
				<label>Name:</label>
				<input type='text' required value={name} onChange={(e) => setName(e.target.value)} style={basicStyles} />
				<label>Username:</label>
				<input type='text' required value={username} onChange={(e) => setUsername(e.target.value)} style={basicStyles} />
				<label>Password:</label>
				<input type='password' required value={password} onChange={(e) => setPassword(e.target.value)} style={basicStyles} />
				<label>Favorite genre:</label>
				<input type='text' value={favoriteGenre} onChange={(e) => setFavoriteGenre(e.target.value)} style={basicStyles} />
				<input
					type='submit'
					value='Submit'
					style={{display: 'inline-block', width: 'auto', marginTop: '5px', marginLeft: '5px', float: 'right', boxSizing: 'inherit'}}
				/>
				<input
					type='button'
					value='Cancel'
					onClick={() => {
						emptyFields();
						return navDispatch('Login');
						/*return setNewUserActive(false);*/
					}}
					style={{display: 'inline-block', width: 'auto', marginTop: '5px', float: 'right', boxSizing: 'inherit'}}
				/>
			</form>
		</div>
	);
};

export default NewUser;
