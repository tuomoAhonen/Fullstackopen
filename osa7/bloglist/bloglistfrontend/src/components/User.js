import {Link, useNavigate} from 'react-router-dom';

const User = ({user, blogs}) => {
	const navigate = useNavigate();
	//console.log(blogs);
	const listStyles = {
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
	};

	return (
		<div>
			{user && <h2 style={{marginBottom: '5px', marginTop: '10px'}}>{user.name}&#39;s blogs</h2>}
			<ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
				{blogs && blogs.length > 0 ? (
					blogs.map((blog) => (
						<li key={blog.blogid} style={listStyles}>
							<Link to={`/blogs/${blog.blogid}`} replace='true' style={{textDecoration: 'none', color: '#000000'}}>
								{blog.title}
							</Link>
						</li>
					))
				) : (
					<li>No blogs added yet...</li>
				)}
			</ul>
		</div>
	);
};

export default User;
