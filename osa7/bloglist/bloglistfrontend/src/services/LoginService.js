import axios from 'axios';
const url = '/api/login';

export const logIn = async (credentials) => {
	const response = await axios.post(url, credentials);
	return response.data;
};

// eslint-disable-next-line
//export default {login};
