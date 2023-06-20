//import Blog from './Blog';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Container, H2, Li, Ul} from '../styles/StyledComponents';

const DisplayBlogsFromOtherUsers = ({blogs}) => {
	return (
		<Container>
			<H2>Blogs from other users</H2>
			<Ul>
				{blogs && blogs.length > 0 ? (
					blogs.map((blog) => (
						<Li key={blog.blogid}>
							<Link to={`/othersblogs/${blog.blogid}`} replace='true' style={{textDecoration: 'none', color: '#000000'}}>
								{blog.title} by {blog.author}
							</Link>
						</Li>
					))
				) : (
					<Li>No blogs found...</Li>
				)}
			</Ul>
		</Container>
	);
};

DisplayBlogsFromOtherUsers.propTypes = {
	blogs: PropTypes.array.isRequired,
};

export default DisplayBlogsFromOtherUsers;
