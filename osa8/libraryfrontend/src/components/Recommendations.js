import {useQuery} from '@apollo/client';
import {booksByGenreQuery} from '../apollo/queries';
import {useState} from 'react';
import './Recommendations.css';

const Recommendations = ({show, user}) => {
	const [books, setBooks] = useState([]);
	//console.log(user);

	const {loading} = useQuery(booksByGenreQuery, {
		variables: {genre: user.favoriteGenre},
		onError: (error) => console.log(error),
		onCompleted: (data) => setBooks([...data.booksByGenreQuery]),
	});

	if (!show) {
		return null;
	}

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<div>
			{books && books.length > 0 && (
				<table border='none' frame='void' rules='rows' style={{margin: 0, padding: 0, border: '1px solid #000000'}}>
					<tbody>
						<tr className='recommendations-tr'>
							<th>Title</th>
							<th>Author</th>
							<th>Published</th>
							<th>Genres</th>
						</tr>
						{books.map((b) => (
							<tr className='recommendations-tr' key={b.id}>
								<td>{b.title}</td>
								<td>{b.author.name}</td>
								<td>{b.published}</td>
								<td>{b.genres && b.genres.length > 0 && b.genres.join(', ').toString().trim()}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Recommendations;
