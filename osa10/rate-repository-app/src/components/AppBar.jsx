import {useState} from 'react';
import {View, StyleSheet, Pressable /*, Image*/} from 'react-native';
import {Link, useNavigate} from 'react-router-native';
import {useApolloClient, useQuery} from '@apollo/client';
import Constants from 'expo-constants';

import {viewStyleSheet} from '../styles/themes/ViewStyles';
import Navigation from './navigation/Navigation';
import CustomText from './customComponents/CustomText';
import SvgComponent from './customComponents/SvgComponent';
import useAuthStorage from '../hooks/useAuthStorage';
import {getMe} from '../graphql/Queries';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		marginBottom: 5,
	},
	button: {
		height: 20,
		width: 20,
		//backgroundColor: '#ffffff',
	},
	buttonsGroup: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

const AppBar = (/*{token, setToken}*/) => {
	const [navDisplayed, setNavDisplayed] = useState(false);
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const {data /*, error, loading*/} = useQuery(getMe, {});
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await authStorage.removeAccessToken();
			await apolloClient.resetStore();
			return navigate('/');
		} catch (error) {
			return console.log(error);
		}
	};

	/*
	if (loading) {
		return console.log(loading);
	}

	if (error) {
		return console.log(error);
	}

	if (data) {
		console.log(data);
	}
	*/

	return (
		<View style={{...viewStyleSheet.darkSlateGrey, ...styles.container}}>
			<View style={styles.buttonsGroup}>
				<Pressable style={styles.button} onPress={() => setNavDisplayed(navDisplayed === true ? false : true)}>
					{/*<Image style={{width: 20, height: 20}} source={require('../styles/images/barssolidnew.png')}></Image>*/}
					<SvgComponent style={styles.button} />
				</Pressable>
				<Pressable>
					{data && data.me !== null ? (
						<Pressable onPress={() => logout()}>
							<CustomText defaultStyle={'headingWhite'}>Logout</CustomText>
						</Pressable>
					) : (
						<Link to={'/login'} onPress={() => setNavDisplayed(false)}>
							<CustomText defaultStyle={'headingWhite'}>Login</CustomText>
						</Link>
					)}
				</Pressable>
			</View>
			<Navigation navDisplayed={navDisplayed} setNavDisplayed={setNavDisplayed} data={data} />
		</View>
	);
};

export default AppBar;
