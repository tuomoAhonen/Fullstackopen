import axios from 'axios';
const url = '/api/users';

export const getUsers = async () => {
	const response = await axios.get(url);
	return response.data;
};
