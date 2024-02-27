const {PubSub} = require('graphql-subscriptions');
const pubsub = new PubSub();

const {GraphQLError} = require('graphql');
const {v4: uuidv4} = require('uuid');
const {getAuthors, postAuthor, editAuthorById, getAuthorByName, editAuthorByName} = require('./services/authorService');
const {getBooks, postBook, getBookByGenre, getBookByGenreCrime} = require('./services/bookService');
const {createUser, findUserById, findUserByUsername, getNewId, getNewPassword} = require('./services/userServiceFile');
const {login} = require('./services/loginService');

const authorsHandler = async () => {
	try {
		const authors = await getAuthors();
		//console.log(authors);
		return authors;
		/*.map((a) => {
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
			.sort((a, b) => a.name.localeCompare(b.name));*/
	} catch (error) {
		console.log(error.message);
		throw new GraphQLError(error.message);
	}
};

const booksHandler = async () => {
	try {
		const books = await getBooks();
		return books;
		/*.map((b) => {
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
			.sort((a, b) => a.title.localeCompare(b.title, 'fi', {ignorePunctuation: true}));*/
	} catch (error) {
		console.log(error.message);
		throw new GraphQLError(error.message);
	}
};

const resolvers = {
	Query: {
		authorCount: async () => {
			const authors = await authorsHandler();
			return authors.length;
		},
		bookCount: async () => {
			const books = await booksHandler();
			return books.length;
		},
		allAuthors: async (root, args) => {
			const authors = await authorsHandler();
			//console.log(authors);
			return authors;
		},
		allBooks: async (root, args) => {
			return await booksHandler();
		},
		booksByGenreQuery: async (root, args) => {
			try {
				return await getBookByGenre(args.genre);
			} catch (error) {
				console.log(error.message);
				throw new GraphQLError(error.message);
			}
		},
		booksByGenreCrime: async (root, args) => {
			try {
				return await getBookByGenreCrime(args.genre);
			} catch (error) {
				console.log(error.message);
				throw new GraphQLError(error.message);
			}
		},
		user: (root, args, context) => {
			if (context && Object.keys(context.user) > 0 && !args.username && !args.id) {
				//console.log(context);
				return context.user;
			}

			if (args.username) {
				const foundUser = findUserByUsername(args.username);
				//console.log(foundUser);
				return foundUser;
			} else if (args.id) {
				const foundUser = findUserById(args.id);
				return foundUser;
			} else {
				return null;
			}
		},
	},

	Mutation: {
		addAuthor: async (root, args, context) => {
			const authors = await authorsHandler();

			if (!context || Object.keys(context).length === 0) {
				throw new GraphQLError('Not authorized');
			}

			if (authors.find((a) => a.name.toLowerCase() === args.name.toLowerCase())) {
				throw new GraphQLError('Name must be unique');
			}

			const author = {...args, id: uuidv4()};

			try {
				const result = await postAuthor(author, context.auth);
				return result;
			} catch (error) {
				console.log(error.message);
				throw new GraphQLError(error.message);
			}
		},
		booksByGenre: async (root, args) => {
			//console.log(args.genre);
			try {
				return await getBookByGenre(args.genre);
			} catch (error) {
				throw new GraphQLError(error.message);
			}
		},
		addBook: async (root, args, context) => {
			//console.log(context.auth);
			if (!context || Object.keys(context).length === 0) {
				throw new GraphQLError('Not authorized');
			}

			const [books, authors] = await Promise.all([booksHandler(), authorsHandler()]);

			if (books.find((b) => b.title.toLowerCase() === args.title.toLowerCase())) {
				throw new GraphQLError('Title must be unique');
			}

			if (authors.find((a) => a.name.toLowerCase() === args.author.name.toLowerCase())) {
				try {
					const author = authors.find((a) => a.name.toLowerCase() === args.author.name.toLowerCase());
					const book = {...args, author: author, id: uuidv4()};
					const result = await postBook(book, context.auth);
					pubsub.publish('addBookSubscription', {bookAdded: result});
					return result;
				} catch (error) {
					console.log(error.message);
					throw new GraphQLError(error.message);
				}
			} else {
				try {
					const author = {...args.author, born: args.author.born ? args.author.born : null, id: uuidv4()};
					const book = {...args, author: author, id: uuidv4()};
					const [resultAuthor, resultBook] = await Promise.all([postAuthor(author, context.auth), postBook(book, context.auth)]);
					pubsub.publish('addAuthorSubscription', {authorAdded: resultAuthor});
					pubsub.publish('addBookSubscription', {bookAdded: resultBook});
					return resultBook;
				} catch (error) {
					console.log(error.message);
					throw new GraphQLError(error.message);
				}
			}
		},

		editAuthor: async (root, args, context) => {
			if (!context || Object.keys(context).length === 0) {
				throw new GraphQLError('Not authorized');
			}

			//const authors = await authorsHandler();

			/*
			console.log(args);
			try {
				const thisAuthor = await getAuthorByName(args.targetName);
				console.log(thisAuthor);
			} catch (error) {
				console.log(error.message);
			}
      */

			try {
				/*
				const authorToEdit = authors.find((a) => a.name.toLowerCase() === args.targetName.toLowerCase());

				if (!authorToEdit) {
					throw new GraphQLError('Did not find the target username to edit');
				}

				const author = {
					...authorToEdit,
					name: args.newName ? args.newName : authorToEdit.name,
					born: args.born ? args.born : authorToEdit.born ? authorToEdit.born : null,
				};
        
				const result = await editAuthorById(author, context.auth);
        */

				const author = args;
				const result = await editAuthorByName(author, context.auth);
				pubsub.publish('editAuthorSubscription', {authorEdited: result});
				return result;
			} catch (error) {
				console.log(error.message);
				throw new GraphQLError(error.message);
			}
		},

		createUser: async (root, args) => {
			if (findUserByUsername(args.username)) {
				throw new GraphQLError('Username is taken');
			}

			try {
				const passwordhash = await getNewPassword(args.password);
				const user = {id: getNewId(), username: args.username, passwordhash: passwordhash, name: args.name, favoriteGenre: args.favoriteGenre};
				const result = createUser(user);
				return result;
			} catch (error) {
				console.log(error.message);
				throw new GraphQLError(error.message);
			}
		},

		login: async (root, args) => {
			if (!args.username && !args.password) {
				throw new GraphQLError('Username or password missing');
			}

			try {
				const result = await login({username: args.username, password: args.password});
				//console.log(result);
				return result;
			} catch (error) {
				//console.log(error);
				if (error.response.data.error) {
					console.log(error.response.data.error);
					throw new GraphQLError(error.response.data.error.message);
				} else {
					throw new GraphQLError(error.message);
				}
			}
		},
	},

	Author: {
		id: (root) => root.id,
		name: (root) => root.name,
		born: (root) => root.born,
		books: async (root) => {
			const books = await booksHandler();
			return books.filter((book) => book.author.id === root.id).length;
		},
	},

	Book: {
		id: (root) => root.id,
		title: (root) => root.title,
		published: (root) => root.published,
		author: ({author}) => {
			return {
				id: author.id,
				name: author.name,
				born: author.born,
			};
		},
		genres: (root) => root.genres,
	},

	User: {
		id: (root) => root.id,
		username: (root) => root.username,
		//passwordhash: (root) => root.passwordhash,
		name: (root) => root.name,
		favoriteGenre: (root) => root.favoriteGenre,
	},

	Token: {
		jwt: (root) => root.jwt,
		user: ({user}) => user,
	},

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('addBookSubscription'),
		},
		authorAdded: {
			subscribe: () => pubsub.asyncIterator('addAuthorSubscription'),
		},
		authorEdited: {
			subscribe: () => pubsub.asyncIterator('editAuthorSubscription'),
		},
	},
};

module.exports = resolvers;
