import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {postBook, getAuthors, getBooks, booksByGenreQuery} from '../apollo/queries';
import {useNavDispatch} from '../reducers/NavReducer';

const NewBook = ({show, user, verifyTokenExpiration}) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState(2023);
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const navDispatch = useNavDispatch();

	const emptyFields = () => {
		setTitle('');
		setPublished(2023);
		setAuthor('');
		//setGenre('');
		setGenres([]);
	};

	const [newBook] = useMutation(postBook, {
		onError: (error) => console.log(error),
		onCompleted: (data) => {
			emptyFields();
			//console.log(data);
			return navDispatch('Books');
		},
		refetchQueries: [{query: getAuthors}, {query: getBooks}, {query: booksByGenreQuery, variables: {genre: user.favoriteGenre}}],
	});

	if (!show) {
		return null;
	}

	const submitBook = (e) => {
		e.preventDefault();
		verifyTokenExpiration();

		if (title && author && published && genres && genres.length > 0) {
			(async () => {
				await newBook({
					variables: {
						title: title,
						author: {name: author},
						published: parseInt(published),
						genres: genres,
					},
				});
			})();
		} else {
			return null;
		}
	};

	const addGenre = () => {
		//console.log(genre);
		if (genre) {
			setGenres([...genres, genre]);
			setGenre('');
		}
	};

	const styles = {
		marginBottom: '5px',
	};

	return (
		<div>
			<form onSubmit={submitBook}>
				<div>
					<input placeholder='Title...' type='text' value={title} onChange={(e) => setTitle(e.target.value)} style={styles} />
				</div>
				<div>
					<input placeholder='Author...' type='text' value={author} onChange={(e) => setAuthor(e.target.value)} style={styles} />
				</div>
				<div>
					<input placeholder='Publishing year...' type='text' value={published} onChange={(e) => setPublished(e.target.value)} style={styles} />
				</div>
				<div>
					<input placeholder='Genre...' type='text' value={genre} onChange={(e) => setGenre(e.target.value)} style={styles} />
					<input type='button' value='Add' onClick={() => addGenre()} style={{...styles, marginLeft: '5px'}} />
					<div style={styles}>Genres: {genres && genres.length > 0 && genres.join(', ').toString().trim()}</div>
				</div>
				<div>
					<input type='submit' value='Submit' />
				</div>
			</form>
		</div>
	);
};

export default NewBook;
