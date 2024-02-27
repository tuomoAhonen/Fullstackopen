import {useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {getBooks, booksByGenre /*, booksByGenreCrime*/, addBookSubscription} from '../apollo/queries';
import './Books.css';

const Books = ({show}) => {
	const [books, setBooks] = useState([]);
	const [allBooksActive, setAllBooksActive] = useState(true);
	const [genres, setGenres] = useState([]);
	//const [booksCrime, setBooksCrime] = useState([]);
	const [genre, setGenre] = useState('');
	const [booksByGenreResult, setBooksByGenreResult] = useState([]);

	//console.log(window.location);
	/*
	useEffect(() => {
		if (books && books.length > 0 && window.location.href === 'http://localhost:3000/Books') {
			setGenre('');
			return setAllBooksActive(true);
		} // eslint-disable-next-line
	}, [books, window.location.href]);
	*/

	const [genreMutation] = useMutation(booksByGenre, {
		onError: (error) => console.log(error),
		onCompleted: (data) => {
			setBooksByGenreResult([...data.booksByGenre]);
			return setAllBooksActive(false);
		},
	});

	const {subscribeToMore, loading} = useQuery(getBooks, {
		onError: (error) => console.log(error),
		onCompleted: (data) => {
			return setBooks([...data.allBooks]);
		},
	});

	//let previousBook = {};

	const bookSubscriptionNotification = (book) => {
		//if (Object.keys(previousBook).length === 0 || previousBook.title !== book.title) {
		return window.alert(`New book has beed added: ${book.title}`);
		//previousBook = book;
		//}
		//return null;
	};

	useEffect(() => {
		subscribeToMore({
			document: addBookSubscription,
			updateQuery: (prev, {subscriptionData}) => {
				//console.log(prev);
				//console.log(subscriptionData.data);
				if (!subscriptionData || !subscriptionData.data) {
					return prev;
				}

				const exists = prev.allBooks.find((b) => b.id === subscriptionData.data.bookAdded.id);
				if (exists) {
					bookSubscriptionNotification(subscriptionData.data.bookAdded);
					return prev;
				}

				//console.log({allBooks: [...prev.allBooks, subscriptionData.data.bookAdded]});
				bookSubscriptionNotification(subscriptionData.data.bookAdded);
				return {allBooks: [...prev.allBooks, subscriptionData.data.bookAdded]};
			},
			onError: (error) => console.log(error.message),
		}); // eslint-disable-next-line
	}, []);

	useEffect(() => {
		//console.log(genre);
		if (genre) {
			(async () => {
				await genreMutation({variables: {genre: genre}});
			})();
		} // eslint-disable-next-line
	}, [genre]);

	useEffect(
		() => {
			if (books && books.length > 0) {
				setGenres([...new Set(books.map((b) => b.genres.map((g) => g.toLowerCase())).flat())]);
			}
		}, // eslint-disable-next-line
		[books]
	);

	//console.log(result);

	const filterButtons = {
		all: 'unset',
		cursor: 'pointer',
		marginRight: '2px',
		marginBottom: '2px',
		padding: '5px',
		lineHeight: '100%',
		fontFamily: 'Bowlby One SC, cursive',
		fontWeight: 'bold',
		fontSize: '2vh',
		color: '#ffffff',
	};

	if (!show) {
		return null;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{books && books.length > 0 ? (
				<div>
					<input
						type='button'
						value='all books'
						onClick={() => {
							setGenre('');
							return setAllBooksActive(true);
						}}
						style={{...filterButtons, backgroundColor: allBooksActive ? '#2F4F4F' : '#000000'}}
					/>
					{genres &&
						genres.length > 0 &&
						genres.map((g, i) => {
							return (
								<input
									key={i}
									type='button'
									name={g}
									value={g}
									onClick={() => setGenre(g)}
									style={{...filterButtons, backgroundColor: g === genre && !allBooksActive ? '#2F4F4F' : '#000000'}}
								/>
							);
						})}

					<table border='1' frame='void' rules='rows' style={{margin: 0, padding: 0, border: '1px solid #000000'}}>
						<tbody>
							<tr className='books-tr'>
								<th>Title</th>
								<th>Author</th>
								<th>Published</th>
								<th>Genres</th>
							</tr>
							{allBooksActive
								? books.map((b) => (
										<tr className='books-tr' key={b.id}>
											<td>{b.title}</td>
											<td>{b.author.name}</td>
											<td>{b.published}</td>
											<td>{b.genres && b.genres.length > 0 && b.genres.join(', ').toString().trim()}</td>
										</tr>
								  ))
								: booksByGenreResult.map((b) => (
										<tr className='books-tr' key={b.id}>
											<td>{b.title}</td>
											<td>{b.author.name}</td>
											<td>{b.published}</td>
											<td>{b.genres && b.genres.length > 0 && b.genres.join(', ').toString().trim()}</td>
										</tr>
								  ))}
						</tbody>
					</table>
				</div>
			) : (
				<div>No books found...</div>
			)}
		</div>
	);
};

export default Books;
