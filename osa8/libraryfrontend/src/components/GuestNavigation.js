import {useEffect, useState} from 'react';
import Books from './Books';
import Login from './Login';
import {useNavValue, useNavDispatch} from '../reducers/NavReducer';
import NewUser from './NewUser';
import AuthorsGuest from './GuestAuthors';

const NavigationGuest = ({token, setToken}) => {
	const navValue = useNavValue();
	const [page, setPage] = useState(navValue);
	const navDispatch = useNavDispatch();

	useEffect(() => {
		setPage(navValue);
		switch (navValue) {
			case 'Authors':
				return window.history.replaceState({page: 1}, ``, `/Authors`);
			case 'Books':
				return window.history.replaceState({page: 2}, ``, `/Books`);
			case 'Login':
				return window.history.replaceState({page: 3}, ``, `/Login`);
			case 'NewUser':
				return window.history.replaceState({page: 4}, ``, `/CreateNewUser`);
			default:
				return window.history.go(0);
		} // eslint-disable-next-line
	}, [navValue]);

	const navigate = (page) => {
		switch (page) {
			case 'Authors':
				return navDispatch('Authors');
			case 'Books':
				return navDispatch('Books');
			case 'Login':
				return navDispatch('Login');
			case 'NewUser':
				return navDispatch('NewUser');
			default:
				return window.history.go(0);
		}
	};

	const navButtonsStyles = {
		all: 'unset',
		cursor: 'pointer',
		marginRight: '5px',
		marginBottom: '5px',
		padding: '5px',
		lineHeight: '100%',
		fontFamily: 'Bowlby One SC, cursive',
		fontWeight: 'bold',
		fontSize: '3vh',
		color: '#ffffff',
	};

	return (
		<div>
			<div style={{marginBottom: '5px'}}>
				<input
					type='button'
					value='Authors'
					onClick={() => navigate('Authors')}
					style={{...navButtonsStyles, backgroundColor: page === 'Authors' ? '#2F4F4F' : '#000000'}}
				/>
				<input
					type='button'
					value='Books'
					onClick={() => navigate('Books')}
					style={{...navButtonsStyles, backgroundColor: page === 'Books' ? '#2F4F4F' : '#000000'}}
				/>
				<input
					type='button'
					value='Login'
					onClick={() => navigate('Login')}
					style={{...navButtonsStyles, marginRight: 0, backgroundColor: '#000000'}}
				/>
			</div>
			<AuthorsGuest show={page === 'Authors'} token={token} />
			<Books show={page === 'Books'} />
			<Login show={page === 'Login'} setToken={setToken} />
			<NewUser show={page === 'NewUser'} />
		</div>
	);
};

export default NavigationGuest;
