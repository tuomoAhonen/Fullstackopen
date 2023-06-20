import {Link, useNavigate} from 'react-router-dom';
import {ArrowImage, Container, EmptyDiv, H2, Li, Ul} from '../styles/StyledComponents';
import arrowLeft from '../images/arrow-left-long-solid.svg';

const User = ({user, blogs}) => {
	const navigate = useNavigate();
	//console.log(blogs);
	//console.log(user);
	return (
		<Container>
			{user && (
				<EmptyDiv>
					<ArrowImage onClick={() => navigate('/users', {replace: true})} />
					<H2 style={{display: 'inline-block'}}>{user.name}&#39;s blogs</H2>
				</EmptyDiv>
			)}
			<Ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
				{user && blogs && blogs.length > 0 ? (
					blogs.map((blog) => (
						<Li key={blog.blogid}>
							<Link to={`/users/${user.userid}/blogs/${blog.blogid}`} replace='true' style={{textDecoration: 'none', color: '#000000'}}>
								{blog.title}
							</Link>
						</Li>
					))
				) : (
					<Li>No blogs added yet...</Li>
				)}
			</Ul>
		</Container>
	);
};

export default User;
