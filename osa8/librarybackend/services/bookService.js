const axios = require('axios');
const url = 'http://localhost:3001/books';

const getBooks = async () => {
	const result = await axios.get(url);
	//console.log(result.data);
	return result.data.books;
};

const getBookById = async (id) => {
	const result = await axios.get(`${url}/${id}`);
	return result.data;
};

const getBookByGenre = async (genre) => {
	const result = await axios.get(`${url}/genres/${genre}`);
	return result.data;
};

const getBookByGenreCrime = async (genre) => {
	const result = await axios.get(`${url}/genre/crime`);
	return result.data;
};

const postBook = async (book, auth) => {
	const result = await axios.post(url, {book: book, auth: auth});
	return result.data;
};

const editBookById = async (book, auth) => {
	const result = await axios.put(`${url}/${book.id}`, {book: book, auth: auth});
	return result.data;
};

const deleteBookById = async (id) => {
	const result = await axios.delete(`${url}/${id}`, auth);
	return result.data;
};

module.exports = {getBooks, getBookById, getBookByGenre, getBookByGenreCrime, postBook, editBookById, deleteBookById};
