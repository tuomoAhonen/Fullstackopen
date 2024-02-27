import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		//Get access token from the storage
		return await AsyncStorage.getItem(`${this.namespace}:auth`);
	}

	async setAccessToken(accessToken) {
		//Add the access token to the storage
		//console.log(this.namespace);
		return await AsyncStorage.setItem(`${this.namespace}:auth`, `Bearer ${accessToken}`);
	}

	async removeAccessToken() {
		//Remove access token from the storage
		console.log('Login out, removing accesstoken...');
		return await AsyncStorage.removeItem(`${this.namespace}:auth`);
	}
}

export default AuthStorage;
