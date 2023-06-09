import {useState} from 'react';
import {postBlog} from '../services/BlogService';
import PropTypes from 'prop-types';
import {/*useQueryClient, */ useMutation} from '@tanstack/react-query';
import {useBlogsDispatch} from '../reducers/BlogsReducer';

const BlogCreateNew = ({user, refreshBlogs, handleLogout, handleErrors, handleMessage}) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [userCredentials] = useState(user);

	const blogsDispatch = useBlogsDispatch();

	const emptyInputs = () => {
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	const createBlogMutation = useMutation(postBlog, {
		onSuccess: (blog) => {
			//blogsDispatch({payload: blog, type: 'addBlog'});
			blogsDispatch(blog, 'addBlog');
			refreshBlogs();
			emptyInputs();
			const message = `${blog.title} has been added to your blogs`;
			handleMessage(message, 'success');
		},
		onError: (error) => {
			//console.log(error);
			handleErrors(error);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (userCredentials && (userCredentials !== 'null' || null)) {
			//console.log(userCredentials);
			const blog = {title: title, author: author, url: url, likes: 0, createdbyuserid: userCredentials.userid};
			//console.log(blog);
			createBlogMutation.mutate(blog);
		} else {
			handleMessage('User credentials missing... please login', 'error');
			return handleLogout();
		}
	};

	const handleCancel = () => {
		emptyInputs();
	};

	return (
		<div>
			<h2 style={{marginBottom: '5px', marginTop: '10px'}}>Create new blog</h2>
			<form
				onSubmit={(e) => handleSubmit(e)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100px',
					width: 'auto',
					padding: '5px',
					backgroundColor: '#6495ED',
					borderRadius: '5px',
				}}
			>
				<div style={{display: 'block', width: 'auto'}}>
					<label htmlFor='title' style={{width: '50px', float: 'left', marginBottom: '5px'}}>
						Title:
					</label>
					<input
						id='title'
						name='title'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						type='text'
						style={{width: '220px', float: 'left', marginBottom: '5px'}}
					/>
				</div>

				<div style={{display: 'block', width: '100%'}}>
					<label htmlFor='author' style={{width: '50px', float: 'left', marginBottom: '5px'}}>
						Author:
					</label>
					<input
						id='author'
						name='author'
						onChange={(e) => setAuthor(e.target.value)}
						value={author}
						type='text'
						style={{width: '220px', float: 'left', marginBottom: '5px'}}
					/>
				</div>

				<div style={{display: 'block', width: '100%'}}>
					<label htmlFor='url' style={{width: '50px', float: 'left', marginBottom: '5px'}}>
						Url:
					</label>
					<input
						id='url'
						name='url'
						onChange={(e) => setUrl(e.target.value)}
						value={url}
						type='url'
						style={{width: '220px', float: 'left', marginBottom: '5px'}}
					/>
				</div>

				<div style={{display: 'block', width: '100%'}}>
					<input type='button' value='Cancel' onClick={() => handleCancel()} style={{width: 'auto'}} />
					<input id='submitNewBlog' type='submit' value='Submit' style={{width: 'auto', marginLeft: '5px'}} />
				</div>
			</form>
		</div>
	);
};

BlogCreateNew.propTypes = {
	user: PropTypes.object.isRequired,
	refreshBlogs: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired,
	handleErrors: PropTypes.func,
	//unToggle: PropTypes.func.isRequired,
};

export default BlogCreateNew;
