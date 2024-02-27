import {StyleSheet, View, Pressable} from 'react-native';
import {useNavigate} from 'react-router-native';
import {Formik} from 'formik';
import {object, string} from 'yup';

import {viewStyleSheet} from '../../styles/themes/ViewStyles';
import CustomText from '../customComponents/CustomText';
import FormikTextInput from '../customComponents/FormikTextInput';
import useSignIn from '../../hooks/useSignIn';

//import useAuthStorage from '../../hooks/useAuthStorage';

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
};

const validationSchema = object({
	username: string().min(5).required(),
	password: string().min(5).required(),
});

export const LoginForm = ({handleSubmit}) => {
	return (
		<View style={{...viewStyleSheet.darkOliveGreen, height: '100%'}}>
			<FormikTextInput name='username' placeholder='Username' style={styles.textInputFields} />
			<FormikTextInput name='password' placeholder='Password' style={styles.textInputFields} secureTextEntry={true} />
			<Pressable onPress={handleSubmit} style={styles.button}>
				<CustomText defaultStyle={'textBlack'} style={styles.buttonText}>
					Login
				</CustomText>
			</Pressable>
		</View>
	);
};

const Login = (/*{setToken}*/) => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();
	//const authStorage = useAuthStorage();

	const handleSubmit = async (values, actions) => {
		console.log(values);
		//console.log(actions);
		const {username, password} = values;

		try {
			//signIn ei palauta epäonnistumisesta tietoa servun puolelta,
			//vaan keskeyttää operaation, mikä estää epäonnistumisen käsittelyn
			const result = await signIn({username, password});
			console.log(result);
			console.log('onnistunut kirjautuminen');
			//setToken(await authStorage.getAccessToken());
			actions.resetForm();
			return navigate('/');
			//const getTokenResult = await authStorage.getAccessToken();
			//console.log(getTokenResult);
			//const auth = new AuthStorage();
			//await auth.setAccessToken(data.authenticate.accessToken);
			/*
			const getTokenResult = await auth.getAccessToken();
			console.log(getTokenResult);
			await auth.removeAccessToken();
			const getTokenResult2 = await auth.getAccessToken();
			console.log(getTokenResult2);
			*/
		} catch (error) {
			console.log(error);
			return console.log('epäonnistunut kirjatutuminen');
		}
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{({handleSubmit}) => <LoginForm handleSubmit={handleSubmit} />}
		</Formik>
	);
};

export default Login;

/*
		if (values && values.username && values.password) {
			console.log(values);
			console.log(actions);
			console.log('submitted');
			return actions.resetForm();
		} else if (values && !values.username && !values.password) {
			Alert.alert('Missing information', 'Please fill username and password fields');
			return null;
		} else if (values && !values.username) {
			Alert.alert('Missing information', 'Please fill username field');
			return null;
		} else if (values && !values.password) {
			Alert.alert('Missing information', 'Please fill password field');
			return null;
		}
    */
