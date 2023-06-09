import {useState} from 'react';
import {commentBlog} from '../services/BlogService';
import {useBlogsDispatch} from '../reducers/BlogsReducer';
import {useMutation} from '@tanstack/react-query';

const Comments = ({blogid, comments, handleErrors}) => {
	const [commentInput, setCommentInput] = useState('');
	const blogsDispatch = useBlogsDispatch();

	//console.log(comments);

	const listStyles = {
		margin: 0,
		marginBottom: '5px',
		padding: '5px',
		backgroundColor: '#6495ED',
		listStyleType: 'none',
		boxSizing: 'border-box',
	};

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
		<div>
			<ul style={listStyles}>
				<li>
					<h3 style={{marginBottom: '5px', marginTop: '0px'}}>Comments</h3>
				</li>
				<li style={{boxSizing: 'inherit'}}>
					<input
						type='text'
						name='comment'
						placeholder='Your comment...'
						value={commentInput}
						onChange={(e) => setCommentInput(e.target.value)}
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
					/>
					<br />
					<input type='button' value='Leave comment' onClick={handleSubmitComment} style={{float: 'right', marginLeft: '5px'}} />
					<input type='button' value='Cancel' onClick={handleCancelComment} style={{float: 'right'}} />
				</li>
				<br />
				{comments && comments.length > 0 ? comments.map((comment, index) => <li key={index}>{comment}</li>) : <li>No comments yet...</li>}
			</ul>
		</div>
	);
};

export default Comments;
