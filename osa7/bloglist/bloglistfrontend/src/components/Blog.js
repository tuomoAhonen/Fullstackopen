import {useState} from 'react';
import PropTypes from 'prop-types';
import {editBlog, deleteBlog} from '../services/BlogService';
import {useBlogsDispatch} from '../reducers/BlogsReducer';
import {useMutation} from '@tanstack/react-query';

const Blog = ({blog, user, refreshBlogs, handleMessage, handleErrors}) => {
	const [buttonValue, setButtonValue] = useState('View');
	//const [isExtended, setIsExtended] = useState('none');
	const [isExtended, setIsExtended] = useState(false);
	const blogsDispatch = useBlogsDispatch();

	const handleExtending = () => {
		if (buttonValue === 'View') {
			setButtonValue('Hide');
			setIsExtended(true);
		} else {
			setButtonValue('View');
			setIsExtended(false);
		}
	};

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
	};

	//console.log('whohasliked: ' + blog.whohasliked);
	//console.log('userid: ' + user.userid);

	const results = blog.whohasliked !== null ? blog.whohasliked.includes(user.userid) : false;

	//console.log('results: ' + results);

	//console.log(blog);

	return (
		<div
			className='Blog-area'
			style={{
				minHeight: 'fit-content',
				height: 'fit-content',
				padding: '5px',
				backgroundColor: '#6495ED',
				borderRadius: '5px',
			}}
		>
			<div className='viewHideButton-area' style={{width: '10%', display: 'block', float: 'right'}}>
				<input className='viewHideButton' type='button' value={buttonValue} onClick={handleExtending} style={{float: 'right'}} />
			</div>
			<div
				style={{
					width: '90%',
					display: 'block',
					float: 'left',
					overflowWrap: 'break-word',
					whiteSpace: 'pre-wrap',
					//wordWrap: 'break-word',
					//wordBreak: 'break-word',
					//lineBreak: 'auto',
					fontSize: '20px',
					marginBottom: '5px',
				}}
			>
				{`${blog.title} by author ${blog.author}`}
			</div>
			{isExtended && (
				<div style={{width: '100%', display: 'block', fontSize: '16px', marginBottom: '5px'}}>
					<a href={blog.url} style={{textDecoration: 'none', color: '#000000'}}>
						{blog.url}
					</a>
				</div>
			)}
			{isExtended && (
				<div className='likes-area' style={{width: '100%', display: 'block', marginBottom: '5px'}}>
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
				</div>
			)}
			{blog.createdbyuserid !== null
				? isExtended && (
						<div style={{width: '100%', display: 'block'}}>
							{blog.createdbyuserid === user.userid && (
								<input className='deleteButton' type='button' value='Delete' onClick={() => handleDelete(blog)} style={{float: 'right'}} />
							)}
							<p style={{float: 'left', margin: 0, padding: 0}}>Added by {blog.createdbyuser.name}</p>
						</div>
				  )
				: isExtended && <div style={{width: '100%', display: 'block'}}>Added by Administrators</div>}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

export default Blog;
