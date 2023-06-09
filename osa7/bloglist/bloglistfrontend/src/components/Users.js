import {Link} from 'react-router-dom';

const Users = ({users}) => {
	//const usersQuery = useQuery({queryKey: ['users'], queryFn: getUsers});

	const listStyles = {
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
	};

	return (
		<div>
			<h2 style={{marginBottom: '5px', marginTop: '10px'}}>Users</h2>
			<div>
				<ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
					{users && users.length > 0 ? (
						users.map((user) => (
							<li key={user.userid} style={listStyles}>
								<Link to={`/users/${user.userid}`} style={{textDecoration: 'none', color: '#000000'}}>
									{user.name}
								</Link>
							</li>
						))
					) : (
						<li>Users not found...</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Users;
