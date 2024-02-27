const axios = require('axios');
const url = 'http://localhost:3001/login';

const login = async (userLoginInformation) => {
	const result = await axios.post(url, userLoginInformation);
	return result.data;
};

module.exports = {login};
