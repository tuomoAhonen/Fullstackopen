import {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';
import {Formik} from 'formik';

import {LoginForm} from '../../components/login/Login';

const initialValues = {
	username: '',
	password: '',
};

const Login = ({submitLogin}) => {
	const handleSubmit = async (values) => {
		const {username, password} = values;
		submitLogin({username, password});
	};

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			{({handleSubmit}) => <LoginForm handleSubmit={handleSubmit} />}
		</Formik>
	);
};

describe('login testing', () => {
	it('filling login inputs and submitting form', async () => {
		const submitLogin = jest.fn();

		render(<Login submitLogin={submitLogin} />);

		screen.debug();

		fireEvent.changeText(screen.getByPlaceholderText('Username'), 'admin');
		fireEvent.changeText(screen.getByPlaceholderText('Password'), 'admin');
		fireEvent.press(screen.getByText('Login'));

		await waitFor(() => {
			expect(submitLogin).toHaveBeenCalledTimes(1);
			expect(submitLogin.mock.lastCall[0]).toEqual({username: 'admin', password: 'admin'});
			//expect(submitLogin.mock.calls[0][0]).toEqual({username: 'admin', password: 'admin'});
		});
	});
});
