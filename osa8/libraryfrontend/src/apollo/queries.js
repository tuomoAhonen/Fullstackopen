import {gql} from '@apollo/client';

export const getAuthors = gql`
	query Authors {
		allAuthors {
			id
			name
			born
			books
		}
	}
`;

export const editAuthor = gql`
	mutation EditAuthor($targetName: String!, $newName: String, $born: Int) {
		editAuthor(targetName: $targetName, newName: $newName, born: $born) {
			name
			born
		}
	}
`;

const userDetails = gql`
	fragment userDetails on User {
		id
		username
		name
		favoriteGenre
	}
`;

export const loginUser = gql`
	${userDetails}
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			jwt
			user {
				...userDetails
			}
		}
	}
`;

export const createUser = gql`
	${userDetails}
	mutation CreateUser($username: String!, $password: String!, $name: String!, $favoriteGenre: String) {
		createUser(username: $username, password: $password, name: $name, favoriteGenre: $favoriteGenre) {
			...userDetails
		}
	}
`;

export const postBook = gql`
	mutation AddBookWithInputs($title: String!, $published: Int!, $author: newAuthor!, $genres: [String!]!) {
		addBook(title: $title, published: $published, author: $author, genres: $genres) {
			title
			published
			author {
				name
			}
			genres
		}
	}
`;

const bookDetails = gql`
	fragment bookDetails on Book {
		id
		title
		author {
			name
		}
		published
		genres
	}
`;

export const getBooks = gql`
	${bookDetails}
	query Books {
		allBooks {
			...bookDetails
		}
	}
`;

export const booksByGenre = gql`
	${bookDetails}
	mutation BooksByGenre($genre: String!) {
		booksByGenre(genre: $genre) {
			...bookDetails
		}
	}
`;

export const booksByGenreCrime = gql`
	${bookDetails}
	query BooksByGenreCrime {
		booksByGenreCrime {
			...bookDetails
		}
	}
`;

export const booksByGenreQuery = gql`
	${bookDetails}
	query BookByGenreQuery($genre: String!) {
		booksByGenreQuery(genre: $genre) {
			...bookDetails
		}
	}
`;

export const addBookSubscription = gql`
	${bookDetails}
	subscription {
		bookAdded {
			...bookDetails
		}
	}
`;

export const addAuthorSubscription = gql`
	subscription {
		authorAdded {
			id
			name
			born
			books
		}
	}
`;

export const editAuthorSubscription = gql`
	subscription {
		authorEdited {
			id
			name
			born
			books
		}
	}
`;
