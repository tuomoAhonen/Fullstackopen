const express = require('express');
const router = express.Router();

const stringify = require('safe-stable-stringify');
const fs = require('fs');
const bcrypt = require('bcrypt');
const booksFile = require('./books.json');
const authorsFile = require('./authors.json');
const usersFile = require('./users.json');
const {signToken, verifyToken} = require('./services/tokenService');

//middleware, jos tarvii johonkin
router.use((req, res, next) => {
	//tännekö pitäisi vielä jotain tehdä? hehe
	next();
});

router.post('/login', async (request, response) => {
	const {username, password} = request.body;
	//console.log(request.body);
	//console.log(username);
	//console.log(password);
	const user = usersFile.users.find((u) => u.username === username);
	//console.log(user);

	if (!user || user === null) {
		//return response.status(400).json(`Username: ${username} was not found`);
		/*
		return response.status(400).json({
			error: {
				name: 'Wrong user credentials',
				message: `Username: ${username} was not found`,
				statusCode: 400,
				type: 'Custom error',
				where: ['JSON-server', 'https://localhost:/3001/login'],
			},
		});
		*/
		return response.status(400).json({
			error: {
				name: 'Wrong user credentials',
				message: `Username: ${username} was not found`,
			},
		});
	}

	try {
		const isPasswordCorrect = await bcrypt.compare(password, user.passwordhash);
		//console.log(isPasswordCorrect);
		if (!isPasswordCorrect) {
			//return response.status(401).json(`Password was incorrect`);
			return response.status(401).json({
				error: {
					name: 'Wrong user credentials',
					message: `Wrong password`,
				},
			});
		}

		const {passwordhash, ...userWithoutPassword} = user;
		//console.log(userWithoutPassword);

		//const jwtToken = jwt.sign({data: userWithoutPassword}, fs.readFileSync('private.key'), {expiresIn: '1h'});
		const jwtToken = signToken(userWithoutPassword);

		return response.status(200).json(/*jwtToken*/ {jwt: jwtToken, user: userWithoutPassword});
	} catch (error) {
		console.log(error);
		return error;
	}
});

router.get('/authors', (request, response) => {
	const authors = authorsFile.authors;
	return response.status(200).json(authors);
});

router.post('/authors', async (request, response) => {
	if (request.body.auth) {
		const token = verifyToken(request.body.auth);

		if (token && typeof token === 'object' && Object.keys(token).length > 0) {
			const author = request.body.author;

			authorsFile.authors.push(author);

			fs.writeFile('authors.json', stringify(authorsFile, null, 2), (error) => {
				if (error) {
					return response.status(400).json(error.message);
				}
			});

			return response.json(author);
		} else {
			return response.status(401).json(`Token expired. Please re-login`);
		}
	} else {
		return response.status(401).json(`Unauthorized access, Please login`);
	}
});

router.put('/authors/:id', async (request, response) => {
	if (request.body.auth) {
		const token = verifyToken(request.body.auth);

		if (token && typeof token === 'object' && Object.keys(token).length > 0) {
			const author = request.body.author;
			//console.log(author);

			authorsFile.authors.splice(
				0,
				authorsFile.authors.length,
				...authorsFile.authors.filter((a) => {
					if (a.id !== author.id) {
						return a;
					}
				}),
				author
			);

			fs.writeFile('authors.json', stringify(authorsFile, null, 2), (error) => {
				if (error) {
					return response.status(400).json(error.message);
				}
			});

			booksFile.books.splice(
				0,
				booksFile.books.length,
				...booksFile.books.map((book) => {
					if (book.author.id !== author.id) {
						return book;
					} else {
						return {...book, author: author};
					}
				})
			);

			fs.writeFile('books.json', stringify(booksFile, null, 2), (error) => {
				if (error) {
					return response.status(400).json(error.message);
				}
			});

			return response.json(author);
		} else {
			return response.status(401).json(`Token expired. Please re-login`);
		}
	} else {
		return response.status(401).json(`Unauthorized access, Please login`);
	}
});

router.get('/authors/name/:name', async (request, response) => {
	const name = request.params.name;
	//console.log(name);
	const author = authorsFile.authors.find((a) => a.name.toLowerCase() === name.toLowerCase());
	//console.log(author);

	if (author && typeof author === 'object' && Object.keys(author).length > 0) {
		return response.status(200).json(author);
	} else {
		return response.status(400).json('Author was not found in the database');
	}
});

router.put('/authors/name/:name', async (request, response) => {
	if (request.body.auth) {
		const token = verifyToken(request.body.auth);

		if (token && typeof token === 'object' && Object.keys(token).length > 0) {
			const {targetName, ...authorWithoutTargetName} = request.body.author;
			const authorToEdit = authorsFile.authors.find((a) => a.name.toLowerCase() === targetName.toLowerCase());

			console.log(authorToEdit);

			if (!authorToEdit) {
				return response.status(400).json('Author was not found in the database');
			}

			const author = {...authorToEdit, ...authorWithoutTargetName};

			console.log(author);

			authorsFile.authors.splice(
				0,
				authorsFile.authors.length,
				...authorsFile.authors.map((a) => {
					if (a.name !== author.name) {
						return a;
					} else {
						return author;
					}
				})
				//author
			);

			fs.writeFile('authors.json', stringify(authorsFile, null, 2), (error) => {
				if (error) {
					return response.status(400).json(error.message);
				}
			});

			booksFile.books.splice(
				0,
				booksFile.books.length,
				...booksFile.books.map((book) => {
					if (book.author.name !== author.name) {
						return book;
					} else {
						return {...book, author: author};
					}
				})
			);

			fs.writeFile('books.json', stringify(booksFile, null, 2), (error) => {
				if (error) {
					return response.status(400).json(error.message);
				}
			});

			return response.json(author);
		} else {
			return response.status(401).json(`Token expired. Please re-login`);
		}
	} else {
		return response.status(401).json(`Unauthorized access, Please login`);
	}
});

router.get('/books', async (request, response) => {
	const books = booksFile.books;
	return response.status(200).json(books);
});

router.post('/books', async (request, response) => {
	if (request.body.auth) {
		const token = verifyToken(request.body.auth);

		if (token && typeof token === 'object' && Object.keys(token).length > 0) {
			const book = request.body.book;
			//console.log(request.body);

			booksFile.books.push(book);
			//console.log(booksFile);

			fs.writeFile('books.json', stringify(booksFile, null, 2), (error) => {
				if (error) {
					return response.status(400).json(error.message);
				}
			});

			return response.status(201).json(book);
		} else {
			return response.status(401).json(`Token expired. Please re-login`);
		}
	} else {
		return response.status(401).json(`Unauthorized access, Please login`);
	}
});

//made this just to get all of the genres without hard coding every genre's path
router.get('/books/genres/:genre', (request, response) => {
	//console.log(request.params);
	const genre = request.params.genre;
	const filteredBooks = booksFile.books.filter((b) => b.genres.find((g) => g.toLowerCase() === genre.toLowerCase()));
	return response.status(200).json(filteredBooks);
});

//this is the better option, hard coding paths for different genres
//performance gains to front-end from static paths and APIs/arrays instead of having to fetch every time for genre at the back-end too
router.get('/books/genre/crime', (request, response) => {
	const filteredBooks = booksFile.books.filter((b) => b.genres.find((g) => g.toLowerCase() === 'crime'));
	//console.log(filteredBooks);
	return response.status(200).json(filteredBooks);

	//const filteredBooks = booksFile.books.filter((b) => {
	//if (b.genres.includes('crime')) {
	//return b;
	//}
	//});
});

module.exports = router;
