import {Link} from 'react-router-dom';
import {Container, H2, Li, Ul} from '../styles/StyledComponents';

const Users = ({users}) => {
	//console.log(users);
	return (
		<Container>
			<H2>Users</H2>
			<Ul>
				{users && users.length > 0 ? (
					users.map((user) => (
						<Li key={user.userid}>
							<Link to={`/users/${user.userid}`} style={{textDecoration: 'none', color: '#000000'}}>
								{user.name}
							</Link>
						</Li>
					))
				) : (
					<Li>Users not found...</Li>
				)}
			</Ul>
		</Container>
	);
};

export default Users;
