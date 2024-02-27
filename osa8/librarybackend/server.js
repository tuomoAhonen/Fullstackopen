const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
//const router = jsonServer.router('./db.json');
const db = require('./db');
const router = jsonServer.router(db());
const port = 3001;
const stringify = require('safe-stable-stringify');
const fs = require('fs');
const bcrypt = require('bcrypt');
const booksFile = require('./books.json');
const authorsFile = require('./authors.json');
const usersFile = require('./users.json');
//const jwt = require('jsonwebtoken');
const {signToken, verifyToken} = require('./services/tokenService');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(
	jsonServer.rewriter({
		'/authors': '/authors',
		'/authors/:id': '/authors/:id',
		'/authors/name/:name': '/authors/name/:name',
		'/authors/name/:name': '/authors/name/:name',
		'/books': '/books',
		'/books/genres/:genre': '/books/genres/:genre',
		'/books/genre/crime': '/books/genre/crime',
		'/': 'login',
	})
);

/*
server.use((req, res, next) => {
	//tännekö pitäisi vielä jotain tehdä? hehe
	next();
});
*/

server.get('/authors', (request, response) => {
	return response.status(200).json(authorsFile);
	/*
	const reWritten = {
		authors: [
			...authorsFile.authors
				.map((a) => {
					const parts = a.name.split(' ');
					if (parts.length > 1) {
						const fullName = parts
							.map((p) => p.slice(0, 1).toUpperCase() + p.slice(1).toLowerCase())
							.join(' ')
							.trim();
						a.name = fullName;
						return a;
					} else {
						a.name = a.name.slice(0, 1).toUpperCase() + a.name.slice(1).toLowerCase();
						return a;
					}
				})
				.sort((a, b) => a.name.localeCompare(b.name)),
		],
	};

	fs.writeFile('authors.json', stringify(reWritten, null, 2), (error) => {
		if (error) {
			return response.status(400).json(error.message);
		}

		return response.status(200).json(authorsFile);
	});
	*/
});

server.post('/authors', async (request, response) => {
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

server.put('/authors/:id', async (request, response) => {
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

server.get('/authors/name/:name', async (request, response) => {
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

server.put('/authors/name/:name', async (request, response) => {
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

server.get('/books', (request, response) => {
	return response.status(200).json(booksFile);
	/*
	const reWritten = {
		books: [
			...booksFile.books
				.map((b) => {
					const parts = b.title.split(' ');
					if (parts.length > 1) {
						const fullTitle = parts
							.map((p) => p.slice(0, 1).toUpperCase() + p.slice(1).toLowerCase())
							.join(' ')
							.trim();
						b.title = fullTitle;
						return b;
					} else {
						b.title = b.title.slice(0, 1).toUpperCase() + b.title.slice(1).toLowerCase();
						return b;
					}
				})
				.map((b) => {
					const parts = b.author.name.split(' ');
					if (parts.length > 1) {
						const fullName = parts
							.map((p) => p.slice(0, 1).toUpperCase() + p.slice(1).toLowerCase())
							.join(' ')
							.trim();
						b.author.name = fullName;
						return b;
					} else {
						b.author.name = b.author.name.slice(0, 1).toUpperCase() + b.author.name.slice(1).toLowerCase();
						return b;
					}
				})
				.sort((a, b) => a.title.localeCompare(b.title, 'fi', {ignorePunctuation: true})),
		],
	};

	fs.writeFile('books.json', stringify(reWritten, null, 2), (error) => {
		if (error) {
			return response.status(400).json(error.message);
		}

		return response.status(200).json(booksFile);
	});
	*/
});

server.post('/books', async (request, response) => {
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

			return response.json(book);
		} else {
			return response.status(401).json(`Token expired. Please re-login`);
		}
	} else {
		return response.status(401).json(`Unauthorized access, Please login`);
	}
});

server.get('/books/genres/:genre', (request, response) => {
	//console.log(request.params);
	const genre = request.params.genre;
	const filteredBooks = booksFile.books.filter((b) => b.genres.find((g) => g.toLowerCase() === genre.toLowerCase()));
	return response.status(200).json(filteredBooks);
});

server.get('/books/genre/crime', (request, response) => {
	const filteredBooks = booksFile.books.filter((b) => b.genres.find((g) => g.toLowerCase() === 'crime'));
	//console.log(filteredBooks);
	return response.status(200).json(filteredBooks);

	//const filteredBooks = booksFile.books.filter((b) => {
	//if (b.genres.includes('crime')) {
	//return b;
	//}
	//});
});

server.post('/login', async (request, response) => {
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

server.use(router);
//use "server.timout = 0", when you are using nodemon to start the json-server and only on json-server, because it is an development environment.
server.timeout = 0;
server.listen(port, () => {
	console.log(`JSON Server is running @ https://localhost/${port} and this server is just acting as 'database with rest api' in this project`);
});

//other option for json-server would be just to write and read from json-files in services, but I am unsure if it would work well...
