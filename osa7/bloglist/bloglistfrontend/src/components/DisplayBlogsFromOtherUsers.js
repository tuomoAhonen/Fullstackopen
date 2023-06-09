//import Blog from './Blog';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
//import {useEffect, useState} from 'react';

const DisplayBlogsFromOtherUsers = ({user, blogs, refreshBlogs, handleErrors, handleMessage}) => {
	//const [screenSize, setScreenSize] = useState(window.matchMedia('(max-width: 600px)').matches);

	/*
	useEffect(() => {
		window.matchMedia('(max-width: 600px)').addEventListener('change', (e) => setScreenSize(e.matches));
	}, []);
	*/

	const listStyles = {
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
	};

	return (
		<div>
			<h2 style={{marginBottom: '5px', marginTop: '10px'}}>Blogs from other users</h2>
			<ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
				{blogs && blogs.length > 0 ? (
					blogs.map(
						(blog) => (
							<li key={blog.blogid} style={listStyles}>
								<Link to={`/blogs/${blog.blogid}`} replace='true' style={{textDecoration: 'none', color: '#000000'}}>
									{blog.title} by {blog.author}
								</Link>
							</li>
						)
						/*<Blog key={blog.blogid} blog={blog} user={user} refreshBlogs={refreshBlogs} handleErrors={handleErrors} handleMessage={handleMessage} />*/
					)
				) : (
					<li>No blogs found...</li>
				)}
			</ul>
			{/*
				<div
					style={{
						display: 'grid',
						gridAutoFlow: 'row dense',
						gridTemplateColumns: screenSize ? 'auto' : 'auto auto auto',
						columnGap: '5px',
						rowGap: '5px',
					}}
				>
					{blogs && blogs.length > 0 ? (
						blogs.map((blog) => <Blog key={blog.blogid} blog={blog} user={user} refreshBlogs={refreshBlogs} handleErrors={handleErrors} handleMessage={handleMessage} />)
					) : (
						<div>No blogs found...</div>
					)}
				</div>
				*/}
		</div>
	);
};

DisplayBlogsFromOtherUsers.propTypes = {
	user: PropTypes.object.isRequired,
	blogs: PropTypes.array.isRequired,
};

export default DisplayBlogsFromOtherUsers;
