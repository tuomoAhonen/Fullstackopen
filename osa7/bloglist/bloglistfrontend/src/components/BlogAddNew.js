import {useState} from 'react';
import {postBlog} from '../services/BlogService';
import PropTypes from 'prop-types';
import {/*useQueryClient, */ useMutation} from '@tanstack/react-query';
import {useBlogsDispatch} from '../reducers/BlogsReducer';
import {InputText, Container, DivFullWidth, FormAddNew, H2, InputButtonLeft, InputButtonRight, LabelFull} from '../styles/StyledComponents';

const BlogAddNew = ({user, refreshBlogs, handleLogout, handleErrors, handleMessage}) => {
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
		<Container>
			<H2 /*style={{marginBottom: '5px', marginTop: '10px'}}*/>Add new blog</H2>
			<FormAddNew onSubmit={(e) => handleSubmit(e)}>
				<DivFullWidth /*style={{display: 'block', width: '100%'}}*/>
					<LabelFull htmlFor='title' /*style={{width: '50px', float: 'left', marginBottom: '5px'}}*/>Title:</LabelFull>
					<InputText id='title' name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
				</DivFullWidth>

				<DivFullWidth>
					<LabelFull htmlFor='author'>Author:</LabelFull>
					<InputText id='author' name='author' type='text' onChange={(e) => setAuthor(e.target.value)} value={author} />
				</DivFullWidth>

				<DivFullWidth>
					<LabelFull htmlFor='url'>Url:</LabelFull>
					<InputText id='url' name='url' type='url' value={url} onChange={(e) => setUrl(e.target.value)} />
				</DivFullWidth>

				<DivFullWidth>
					<InputButtonLeft type='button' value='Cancel' onClick={() => handleCancel()} />
					<InputButtonRight type='submit' value='Submit' />
				</DivFullWidth>
			</FormAddNew>
		</Container>
	);
};

BlogAddNew.propTypes = {
	user: PropTypes.object.isRequired,
	refreshBlogs: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired,
	handleErrors: PropTypes.func,
	//unToggle: PropTypes.func.isRequired,
};

export default BlogAddNew;
