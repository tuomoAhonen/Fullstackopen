import {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import {editAuthor, getAuthors} from '../apollo/queries';

const AuthorEdit = ({author, verifyTokenExpiration}) => {
	const [bornYear, setBornYear] = useState(author.born ? author.born : '');

	useEffect(() => {
		document.activeElement.blur();
	}, [author]);

	const [editAuthorMutation] = useMutation(editAuthor, {
		onError: (error) => console.log(error),
		onCompleted: (data) => {
			//return console.log(data);
			return;
		},
		refetchQueries: [{query: getAuthors}],
		//awaitRefetchQueries: true,
	});

	const submitEdit = () => {
		verifyTokenExpiration();

		if (bornYear) {
			(async () => {
				return await editAuthorMutation({variables: {targetName: author.name, born: parseInt(bornYear)}});
			})();
		}
	};

	return (
		<div>
			<input
				id='authorEditInput'
				type='text'
				placeholder={bornYear ? bornYear : '-'}
				value={bornYear}
				onChange={(e) => setBornYear(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						//console.log(e);
						return submitEdit();
						//return e.target.blur();
					}
				}}
				onBlur={() => setBornYear(author.born ? author.born : '')}
				style={{
					all: 'unset',
					width: '100%',
					backgroundColor: 'inherit' /*, borderBottom: bornYear ? 'none' : '1px solid #a9a9a9'*/,
				}}
			/>
		</div>
	);
};

export default AuthorEdit;
