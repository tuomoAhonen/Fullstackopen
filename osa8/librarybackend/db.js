const authors = require('./authors.json');
const books = require('./books.json');
//const users = require('./users.json');

module.exports = function () {
	return {
		authors,
		books,
		//users,
	};
};
