import {View, Text, TextInput, Pressable} from 'react-native';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {useState} from 'react';

const Greeting = ({name}) => {
	return (
		<View>
			<Text>Hello {name}</Text>
		</View>
	);
};

const Form = ({onSubmit}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		onSubmit({username, password});
	};

	return (
		<View>
			<TextInput value={username} onChangeText={(e) => setUsername(e)} placeholder='Username' />
			<TextInput value={password} onChangeText={(e) => setPassword(e)} placeholder='Password' />
			<Pressable onPress={handleSubmit}>
				<Text>Submit</Text>
			</Pressable>
		</View>
	);
};

describe('example', () => {
	it('works', () => {
		expect(1).toBe(1);
	});
});

describe('greeting', () => {
	it('renders a greeting message based on the name prop', () => {
		render(<Greeting name='Tuomo' />);

		screen.debug();

		expect(screen.getByText('Hello Tuomo')).toBeDefined();
	});
});

describe('form', () => {
	it('calls function provided by onSubmit prop after pressing the submit button', () => {
		//jest.fn() luo onSubmitille "vale-funktion/teko-funktion/jäljitedyn-funktion",
		//jota on nimeltään "mock"-function. Sen etu on, että se voi toimia melkeinpä minkä
		//tahansa funktion testi toimintojen/ominaisuuksien toteuttajana. Eli se "esittää" funktiota
		const onSubmit = jest.fn();
		render(<Form onSubmit={onSubmit} />);

		fireEvent.changeText(screen.getByPlaceholderText('Username'), 'Testaaja');
		fireEvent.changeText(screen.getByPlaceholderText('Password'), 'salainensana');
		fireEvent.press(screen.getByText('Submit'));

		screen.debug();

		expect(onSubmit).toHaveBeenCalledTimes(1);
		//onSubmitille on siis muodostunut mock-functio, joka saa testissä käydyt toiminnot ja ominaisuudet
		//mock-function calls-taulukon indeksin ensimmäinen attribuutti "[0]" sisältää taulukon,
		//josta on myös valittu indeksin ensimmäinen attribuutti,
		//jonka pitäisi sisältää objektin muodoltaan {username, password}
		expect(onSubmit.mock.calls[0][0]).toEqual({username: 'Testaaja', password: 'salainensana'});
	});
});
