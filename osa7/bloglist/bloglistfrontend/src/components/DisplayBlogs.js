//import Blog from './Blog';
import PropTypes from 'prop-types';
//import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, H2, Li, Ul} from '../styles/StyledComponents';

const DisplayBlogs = ({user, blogs /*, refreshBlogs, handleErrors, handleMessage*/}) => {
	//const [screenSize, setScreenSize] = useState(window.matchMedia('(max-width: 600px)').matches);

	/*
	useEffect(() => {
		window.matchMedia('(max-width: 600px)').addEventListener('change', (e) => setScreenSize(e.matches));
	}, []);

	const listStyles = {
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
	};
	*/

	return (
		<Container>
			<H2>{user.name}&#39;s blogs</H2>
			<Ul>
				{blogs && blogs.length > 0 ? (
					blogs.map(
						(blog) => (
							<Li key={blog.blogid}>
								<Link to={`/myblogs/${blog.blogid}`} replace='true' style={{textDecoration: 'none', color: '#000000'}}>
									{blog.title} by {blog.author}
								</Link>
							</Li>
						)
						/*<Blog key={blog.blogid} blog={blog} user={user} refreshBlogs={refreshBlogs} handleErrors={handleErrors} handleMessage={handleMessage} />*/
					)
				) : (
					<Li>No blogs found...</Li>
				)}
			</Ul>
			{/*
			{blogs && blogs.length > 0 ? (
				<div
					style={{
						display: 'grid',
						gridAutoFlow: 'row dense',
						gridTemplateColumns: screenSize ? 'auto' : 'auto auto auto',
						columnGap: '5px',
						rowGap: '5px',
					}}
				>
					{blogs.map((blog) => (
						<Blog key={blog.blogid} blog={blog} user={user} refreshBlogs={refreshBlogs} handleErrors={handleErrors} handleMessage={handleMessage} />
					))}
				</div>
			) : (
				<div>No blogs found...<div>
			)}
			*/}
		</Container>
	);
};

DisplayBlogs.propTypes = {
	user: PropTypes.object.isRequired,
	blogs: PropTypes.array.isRequired,
};

export default DisplayBlogs;
