const axios = require('axios');
const url = 'http://localhost:3001/users';

const createUser = async (user) => {
	const result = await axios.post(url, user);
	return result.data;
};

const getUsers = async () => {
	const result = await axios.get(url);
	console.log(result);
	return result.data;
};

const findUserById = async (id) => {
	const result = await axios.get(`${url}/${id}`);
	return result.data;
};

const findUserByUsername = async (username) => {
	const result = await axios.get(`${url}/${username}`);
	return result.data;
};

module.exports = {createUser, getUsers, findUserById, findUserByUsername};
