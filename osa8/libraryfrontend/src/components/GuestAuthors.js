import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {getAuthors, addAuthorSubscription, editAuthorSubscription} from '../apollo/queries';
import './Authors.css';

const AuthorsGuest = ({show}) => {
	const [authors, setAuthors] = useState([]);
	const {subscribeToMore, loading} = useQuery(getAuthors, {
		onError: (error) => error,
		onCompleted: (data) => {
			//console.log(data);
			return setAuthors([...data.allAuthors]);
		},
	});

	useEffect(() => {
		subscribeToMore({
			document: addAuthorSubscription,
			updateQuery: (prev, {subscriptionData}) => {
				if (!subscriptionData || !subscriptionData.data) {
					return prev;
				}

				const exists = prev.allAuthors.find((a) => a.id === subscriptionData.data.authorAdded.id);
				if (exists) {
					//SubscriptionNotification(subscriptionData.data.authorAdded);
					return prev;
				}

				//SubscriptionNotification(subscriptionData.data.authorAdded);
				return {allAuthors: [...prev.allAuthors, subscriptionData.data.authorAdded]};
			},
			onError: (error) => console.log(error.message),
		}); // eslint-disable-next-line
	}, []);

	useEffect(() => {
		subscribeToMore({
			document: editAuthorSubscription,
			updateQuery: (prev, {subscriptionData}) => {
				//console.log(prev);
				//console.log(subscriptionData);
				if (!subscriptionData || !subscriptionData.data) {
					return prev;
				}

				const exists = prev.allAuthors.find((a) => a.id === subscriptionData.data.authorEdited.id);
				if (exists) {
					//SubscriptionNotification(subscriptionData.data.authorEdited);
					return prev;
				}

				//SubscriptionNotification(subscriptionData.data.authorEdited);
				return {allAuthors: [...prev.allAuthors, subscriptionData.data.authorEdited]};
			},
			onError: (error) => console.log(error.message),
		}); // eslint-disable-next-line
	}, []);

	if (!show) {
		return null;
	}

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<div>
			{authors && authors.length > 0 ? (
				<table border='none' frame='void' rules='rows' style={{margin: 0, padding: 0, border: '1px solid #000000'}}>
					<tbody>
						<tr className='authors-tr'>
							<th>Name</th>
							<th>Born</th>
							<th>Books</th>
						</tr>
						{authors.map((a) => (
							<tr className='authors-tr' key={a.id}>
								<td>{a.name}</td>
								<td>{a.born ? a.born : '-'}</td>
								<td>{a.books}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div>No authors found...</div>
			)}
		</div>
	);
};

export default AuthorsGuest;
