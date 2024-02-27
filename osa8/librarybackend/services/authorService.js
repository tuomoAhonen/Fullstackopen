const axios = require('axios');
const url = 'http://localhost:3001/authors';

const getAuthors = async () => {
	const result = await axios.get(url);
	//console.log(result.data);
	return result.data.authors;
};

const getAuthorById = async (id) => {
	const result = await axios.get(`${url}/${id}`);
	return result.data;
};

const getAuthorByName = async (name) => {
	const result = await axios.get(`${url}/name/${name}`);
	//console.log('getAuthorByname: ');
	//console.log(result);
	return result.data;
};

const postAuthor = async (author, auth) => {
	const result = await axios.post(url, {author: author, auth: auth});
	//console.log(result);
	return result.data;
};

const editAuthorById = async (author, auth) => {
	const result = await axios.put(`${url}/${author.id}`, {author: author, auth: auth});
	return result.data;
};

const editAuthorByName = async (author, auth) => {
	const result = await axios.put(`${url}/name/${author.targetName}`, {author: author, auth: auth});
	return result.data;
};

const deleteAuthorById = async (id) => {
	const result = await axios.delete(`${url}/${id}`, auth);
	return result.data;
};

module.exports = {getAuthors, getAuthorById, getAuthorByName, postAuthor, editAuthorById, editAuthorByName, deleteAuthorById};
