import {useEffect, useState} from 'react';
import Authors from '../components/Authors';
import Books from '../components/Books';
import NewBook from '../components/NewBook';
import {useNavValue, useNavDispatch} from '../reducers/NavReducer';
import Recommendations from './Recommendations';

const Navigation = ({logout, user, verifyTokenExpiration}) => {
	const navValue = useNavValue();
	const [page, setPage] = useState(navValue);
	const navDispatch = useNavDispatch();

	/* 
		Tähän voisi tehdä useEffectin, joka kuuntelisi/reagoisi navDispatch-funktiota.
		Sen voisi laittaa re-freshaamaan tokenin, että se kestäisi tunnin pidempään.
		Näin ollen uloskirjautuminen automaattisesti toimisi vain silloin, kuin ei olla käytetty tuntiin käyttöliittymää,
		kuin, että tällä hetkellä kirjaudutaan pakolla ulos tunnin päästä siitä kun ollaan kirjauduttu sisään.

		Toinen vaihtoehto on että laitettaisiin tokenin refreshaaminen alemman olemassa olevan useEffectin sisään, mutta
		ehkä vähän siistimpää olisi niillä olla omansa.

		Näitä useEffectejä voitaisiin tehdä muihinkin kompopnentteihin eri toimintoja/funktioita varten tokenia re-freshaamaan.
		Vaihtoehtoisesti voitaisiin tehdä listener klikkauksille tai näppäimille, mutta se voisi olla enemmän kuormittava ohjelmalle.
	*/

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
			case 'NewBook':
				return window.history.replaceState({page: 5}, ``, `/NewBook`);
			case 'Recommendations':
				return window.history.replaceState({page: 6}, ``, `/Recommendations`);
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
			case 'NewBook':
				return navDispatch('NewBook');
			case 'Recommendations':
				return navDispatch('Recommendations');
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
					value='Recommendations'
					onClick={() => navigate('Recommendations')}
					style={{...navButtonsStyles, backgroundColor: page === 'Recommendations' ? '#2F4F4F' : '#000000'}}
				/>
				<input
					type='button'
					value='Books'
					onClick={() => navigate('Books')}
					style={{...navButtonsStyles, backgroundColor: page === 'Books' ? '#2F4F4F' : '#000000'}}
				/>
				<input
					type='button'
					value='New Book'
					onClick={() => navigate('NewBook')}
					style={{...navButtonsStyles, backgroundColor: page === 'NewBook' ? '#2F4F4F' : '#000000'}}
				/>
				<input
					type='button'
					value='Logout'
					onClick={() => {
						logout();
						return navigate('Authors');
					}}
					style={{...navButtonsStyles, marginRight: 0, backgroundColor: '#000000'}}
				/>
			</div>

			<Authors show={page === 'Authors'} verifyTokenExpiration={verifyTokenExpiration} />
			<Books show={page === 'Books'} />
			<NewBook show={page === 'NewBook'} user={user} verifyTokenExpiration={verifyTokenExpiration} />
			<Recommendations show={page === 'Recommendations'} user={user} />
		</div>
	);
};

export default Navigation;
