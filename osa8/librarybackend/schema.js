const typeDefs = `
  type Author {
    id: ID!,
    name: String!,
		born: Int,
    books: Int,
  },

  type Book {
    id: ID!,
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!,
  },

	type User {
		id: ID!,
		username: String!,
		passwordhash: String!,
		name: String!,
		favoriteGenre: String,
	},

	type Token {
		jwt: String!,
		user: User!,
	},

  type Query {
    authorCount: Int!,
    bookCount: Int!,
    allAuthors(name: String): [Author!]!,
    allBooks(author: String, genre: String): [Book!]!,
		booksByGenreQuery(genre: String!): [Book!]!, 
		booksByGenreCrime: [Book!]!,
		user(username: String, id: Int): User,
  },

  input newAuthor {
    name: String!,
    born: Int,
  },

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: newAuthor!,
      genres: [String!]!,
    ): Book,

		booksByGenre(
			genre: String!
		): [Book!]!,

    addAuthor(
      name: String!,
      born: Int,
    ): Author,

    editAuthor(
      targetName: String!
      newName: String
      born: Int,
    ): Author,

		createUser(
			username: String!,
			password: String!,
			name: String!,
			favoriteGenre: String,
		): User,

		login(
			username: String!,
			password: String!,
		): Token,
  },

  type Subscription {
    bookAdded: Book,
    authorAdded: Author,
    authorEdited: Author,
  },
`;

module.exports = typeDefs;
