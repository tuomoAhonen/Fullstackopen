import {useState} from 'react';
import {commentBlog} from '../services/BlogService';
import {useBlogsDispatch} from '../reducers/BlogsReducer';
import {useMutation} from '@tanstack/react-query';
import {InputButtonLeftFloat, InputButtonRightFloat, InputWithYoutubeStyling, LiComments, UlComments} from '../styles/StyledComponents';

const BlogComments = ({blogid, comments, handleErrors}) => {
	const [commentInput, setCommentInput] = useState('');
	const blogsDispatch = useBlogsDispatch();

	//console.log(comments);

	/*
	const listStyles = {
		margin: 0,
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
		listStyleType: 'none',
		boxSizing: 'border-box',
	};
	*/

	const handleCancelComment = () => {
		//console.log(commentInput);
		setCommentInput('');
	};

	const blogCommentMutation = useMutation(commentBlog, {
		onSuccess: (blog) => {
			blogsDispatch(blog, 'editBlog');
			handleCancelComment();
		},
		onError: (error) => {
			handleErrors(error);
		},
	});

	const handleSubmitComment = () => {
		//console.log(commentInput);
		//const blogCommentsToSubmit = {};
		blogCommentMutation.mutate({comments: comments !== null ? [...comments, commentInput] : [commentInput], blogid});
		setCommentInput('');
	};

	return (
		<UlComments>
			{/*
			<LiComments>
				<H3 style={{marginBottom: '5px', marginTop: '0px'}}>Comments</H3>
			</LiComments>
			*/}
			<LiComments /*style={{boxSizing: 'inherit'}}*/>
				<InputWithYoutubeStyling
					type='text'
					name='comment'
					placeholder='Your comment...'
					value={commentInput}
					onChange={(e) => setCommentInput(e.target.value)}
					/*
					style={{
						boxSizing: 'inherit',
						width: '100%',
						marginBottom: '2px',
						borderTop: 'none',
						borderLeft: 'none',
						borderRight: 'none',
						borderBottom: '1px solid #000000',
						backgroundColor: '#6495ED',
						'::WebkitInputPlaceholder': {
							color: '#000000',
							opacity: 1,
						},
						'::placeholder': {
							color: '#000000',
							opacity: 1,
						},
					}}
					*/
				/>
				<br />
				<InputButtonRightFloat type='button' value='Leave comment' onClick={handleSubmitComment} /*style={{float: 'right', marginLeft: '5px'}}*/ />
				<InputButtonLeftFloat type='button' value='Cancel' onClick={handleCancelComment} /*style={{float: 'right'}}*/ />
			</LiComments>
			<br />
			{comments && comments.length > 0 ? (
				comments.map((comment, index) => <LiComments key={index}>{comment}</LiComments>).sort((a, b) => b.key - a.key)
			) : (
				<LiComments>No comments yet...</LiComments>
			)}
		</UlComments>
	);
};

export default BlogComments;
