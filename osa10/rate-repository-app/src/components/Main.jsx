//import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Routes, Route, Navigate, useMatch} from 'react-router-native';
//import Constants from 'expo-constants';
import AppBar from './AppBar';
import SignUp from '../components/signup/SignUp';
import RepositoryList from './repositories/RepositoryList';
import {viewStyleSheet} from '../styles/themes/ViewStyles';
import Login from './login/Login';
import RepositoryItemView from './repositories/RepositoryItemView';
import ReviewRepository from './ReviewRepositories/ReviewRepository';
import MyReviews from './user/myreviews/MyReviews';
//import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
	container: {
		//marginTop: Constants.statusBarHeight,
		padding: 0,
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	//const [token, setToken] = useState();
	//const authStorage = useAuthStorage();

	/*
	useEffect(() => {
		if (!token) {
			(async () => {
				try {
					const result = await authStorage.getAccessToken();
					//console.log(result);
					setToken(result);
					return result;
				} catch (error) {
					return error;
				}
			})();
		}
	}, [token]);
	*/

	//console.log(token);
	const match = useMatch('/repository/:repositoryId');
	const repositoryId = match ? match.params.repositoryId.slice(1) : null;
	//console.log(repositoryId);

	return (
		<View style={{...viewStyleSheet.black, ...styles.container}}>
			<AppBar /*token={token} setToken={setToken}*/ />
			<Routes>
				<Route path='/' element={<RepositoryList />} exact />
				<Route path='/repository/:repositoryId' element={<RepositoryItemView id={repositoryId} />} exact />
				<Route path='/reviewrepository' element={<ReviewRepository />} exact />
				<Route path='/myreviews' element={<MyReviews />} exact />
				<Route path='/signup' element={<SignUp />} exact />
				<Route path='/login' element={<Login /*setToken={setToken}*/ />} exact />
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</View>
	);
};

export default Main;
