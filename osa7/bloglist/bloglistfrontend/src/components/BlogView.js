import {editBlog, deleteBlog} from '../services/BlogService';
import {useBlogsDispatch} from '../reducers/BlogsReducer';
import {useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import Comments from './Comments';

const BlogView = ({user, blog, refreshBlogs, handleErrors, handleMessage}) => {
	const blogsDispatch = useBlogsDispatch();
	const navigate = useNavigate();

	const likeBlogMutation = useMutation(editBlog, {
		onSuccess: (blog) => {
			//console.log(blog);
			//blogsDispatch({payload: {blogid: blog.blogid, userid: user.userid}, type: 'likeBlog'});
			blogsDispatch({blogid: blog.blogid, userid: user.userid}, 'likeBlog');
			refreshBlogs();
			const message = `You liked from '${blog.title}'`;
			handleMessage(message, 'success');
		},
		onError: (error) => {
			//console.log(error);
			handleErrors(error);
		},
	});

	const handleLike = (likes, blogid) => {
		//console.log(likes, blogid);
		likeBlogMutation.mutate({likes, blogid});
	};

	const deleteBlogMutation = useMutation(deleteBlog, {
		onSuccess: (blog) => {
			//console.log(blog);
			//console.log(blog);
			//blogsDispatch({payload: blog.blogid, type: 'deleteBlog'});
			blogsDispatch(blog.blogid, 'deleteBlog');
			refreshBlogs();
			const message = `${blog.title} has been deleted from your blogs`;
			handleMessage(message, 'success');
		},
		onError: (error) => {
			//console.log(error);
			handleErrors(error);
		},
	});

	const handleDelete = (blog) => {
		//console.log(blog);
		deleteBlogMutation.mutate(blog);
		//console.log(blogid);
		navigate('/', {replace: 'true'});
	};

	const results = blog && blog.whohasliked !== null ? blog.whohasliked.includes(user.userid) : false;

	//console.log(blog);

	const listStyles = {
		margin: 0,
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
		listStyleType: 'none',
	};

	return (
		<div>
			{blog && Object.keys(blog).length > 0 && (
				<div>
					<h2 style={{marginBottom: '5px', marginTop: '10px'}}>{blog.title}</h2>
					<ul style={listStyles}>
						<li>Author: {blog.author}</li>
						<li>
							Likes: {blog.likes}
							{results === false && (
								<input
									className='likeButton'
									type='button'
									value='Like'
									//onClick={() => handleLike({newlike: 1, wholiked: user.userid}, blog.blogid)}
									onClick={() => handleLike({newlike: 1, wholiked: user.userid}, blog.blogid)}
									style={{marginLeft: '5px', float: 'right'}}
								/>
							)}
						</li>
						<li>Url: {blog.url}</li>
						{blog.createdbyuserid !== null ? (
							<li>
								Blog added by {blog.createdbyuser.name}
								{blog.createdbyuserid === user.userid && (
									<input className='deleteButton' type='button' value='Delete' onClick={() => handleDelete(blog)} style={{float: 'right'}} />
								)}
							</li>
						) : (
							<li>Blog added by Administrators</li>
						)}
					</ul>
					<Comments comments={blog.comments} blogid={blog.blogid} handleErrors={handleErrors} />
				</div>
			)}
		</div>
	);
};

export default BlogView;
