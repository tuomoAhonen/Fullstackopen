import {Pressable, View, StyleSheet, Alert} from 'react-native';
import {Formik} from 'formik';
import {object, string, ref} from 'yup';
import {useMutation} from '@apollo/client';

import {viewStyleSheet} from '../../styles/themes/ViewStyles';
import CustomText from '../customComponents/CustomText';
import FormikTextInput from '../customComponents/FormikTextInput';
import {createUserMutation} from '../../graphql/Mutations';
import {getRepositories} from '../../graphql/Queries';
import {useNavigate} from 'react-router-native';

const styles = StyleSheet.create({
	textInputFields: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginBottom: 5,
		borderRadius: 5,
		elevation: 3,
		backgroundColor: '#ffffff',
		fontSize: 20,
	},
	button: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 5,
		borderRadius: 5,
		elevation: 3,
		backgroundColor: 'darkseagreen',
	},
	buttonText: {
		//fontSize: 14,
		letterSpacing: 1,
	},
});

const initialValues = {
	username: '',
	password: '',
	passwordConfirmation: '',
};

const validationSchema = object({
	username: string().min(5).max(30).required('Username is required'),
	password: string().min(5).max(30).required('Password is required'),
	passwordConfirmation: string()
		//.min(5)
		//.max(30)
		.oneOf([ref('password')], 'Password confirmation must match with password')
		.required('Password confirmation is required'),
});

export const SignUpForm = ({handleSubmit}) => {
	return (
		<View style={{...viewStyleSheet.darkOliveGreen, height: '100%'}}>
			<FormikTextInput name='username' placeholder='Username...' style={styles.textInputFields} />
			<FormikTextInput
				name='password'
				placeholder='Password...'
				style={styles.textInputFields}
				secureTextEntry={true}
			/>
			<FormikTextInput
				name='passwordConfirmation'
				placeholder='Confirm your password...'
				style={styles.textInputFields}
				secureTextEntry={true}
			/>
			<Pressable style={styles.button} onPress={handleSubmit}>
				<CustomText defaultStyle={'textBlack'} style={styles.buttonText}>
					Submit
				</CustomText>
			</Pressable>
		</View>
	);
};

const SignUp = () => {
	const navigate = useNavigate();
	const [mutation] = useMutation(createUserMutation, {
		refetchQueries: [{query: getRepositories}],
	});
	//password.match(`/^${passwordConfirmation}$/`) onko regexiin mahdollista upottaa Formikin valueta?
	//ei ollut ainakaan tällä tyylillä
	const handleSubmit = async (values, actions) => {
		console.log(actions, values);
		const {username, password /*, passwordConfirmation*/} = values;
		/*
		if (password !== passwordConfirmation) {
			return Alert.alert('Password not matching', 'Please, make sure both password fields match.');
		}
		*/

		try {
			const result = await mutation({variables: {user: {username, password}}});
			console.log(result);
			navigate('/login');
			return Alert.alert('Success', 'Account has been created, you may login.');
		} catch (e) {
			console.log(e);
			return Alert.alert('Error', 'Something went wrong');
		}
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{({handleSubmit}) => <SignUpForm handleSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignUp;
