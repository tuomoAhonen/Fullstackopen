import {editBlog, deleteBlog} from '../services/BlogService';
import {useBlogsDispatch} from '../reducers/BlogsReducer';
import {useMutation} from '@tanstack/react-query';
import {useNavigate, useLocation} from 'react-router-dom';
import BlogComments from './BlogComments';
import {Container, UlBW, LiBW, H2, BlogArea, InputButtonLeftFloat, InputButtonRightFloat, ArrowImage} from '../styles/StyledComponents';
import arrowLeft from '../images/arrow-left-long-solid.svg';
//import {usePathValue} from '../reducers/PathReducer';
import {useEffect, useState} from 'react';

const BlogView = ({user, blog, refreshBlogs, handleErrors, handleMessage}) => {
	const [previousPath, setPreviousPath] = useState('/');
	const location = useLocation();

	useEffect(() => {
		switch (true) {
			case /^\/myblogs\/\d{1,}$/g.test(location.pathname):
				return setPreviousPath('/');
			case /^\/othersblogs\/\d{1,}$/g.test(location.pathname):
				return setPreviousPath('/othersblogs');
			case /^\/users\/\d{1,}\/blogs\/\d{1,}$/g.test(location.pathname):
				const path = location.pathname.match(/\/users\/\d{1,}/g);
				//console.log(path);
				return setPreviousPath(path[0]);
			default:
				//console.log('default vaan');
				return setPreviousPath('/');
		}
	}, [location]);

	/*
	const pathValue = usePathValue();
	const previousPath = pathValue.previousPath;

	const [previousPath, setPreviousPath] = useState(pathValue.previousPath);

	useEffect(() => {
		setPreviousPath(pathValue.previousPath);
	}, [pathValue]);
	*/

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

	/*
	const listStyles = {
		margin: 0,
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
		listStyleType: 'none',
	};
	*/

	//console.log(pathValue);
	//console.log(blog);
	//console.log(previousPath);

	return (
		<Container>
			{blog && Object.keys(blog).length > 0 && (
				<BlogArea>
					{/*<ArrowImage type='image' src={arrowLeft} onClick={() => navigate(previousPath, {replace: true})} />*/}
					<ArrowImage onClick={() => navigate(previousPath, {replace: true})} />
					<H2 style={{display: 'inline-block'}}>{blog.title}</H2>
					<UlBW /*style={listStyles}*/>
						<LiBW>Author: {blog.author}</LiBW>
						<LiBW>
							Likes: {blog.likes}
							{results === false && (
								<InputButtonRightFloat
									type='button'
									value='Like'
									//onClick={() => handleLike({newlike: 1, wholiked: user.userid}, blog.blogid)}
									onClick={() => handleLike({newlike: 1, wholiked: user.userid}, blog.blogid)}
								/>
							)}
						</LiBW>
						<LiBW>Url: {blog.url}</LiBW>
						{blog.createdbyuserid !== null ? (
							<LiBW>
								Added by {blog.createdbyuser.name}
								{blog.createdbyuserid === user.userid && <InputButtonLeftFloat type='button' value='Delete' onClick={() => handleDelete(blog)} />}
							</LiBW>
						) : (
							<LiBW>Added by Administrators</LiBW>
						)}
					</UlBW>
					<BlogComments comments={blog.comments} blogid={blog.blogid} handleErrors={handleErrors} />
				</BlogArea>
			)}
		</Container>
	);
};

export default BlogView;
