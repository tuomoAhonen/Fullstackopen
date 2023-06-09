import axios from 'axios';
const url = '/api/blogs';

export const getBlogs = async () => {
	const request = await axios.get(url);
	return request.data;
	//return request.then(response => response.data);
};

export const postBlog = async (blog) => {
	const request = await axios.post(url, blog);
	//console.log(request);
	return request.data;
	//return request.then(response => response.data);
};

export const editBlog = async (blogedits) => {
	//console.log('blogedits: ', blogedits);
	const request = await axios.put(`${url}/${blogedits.blogid}`, blogedits.likes);
	return request.data;
};

export const commentBlog = async (blogedits) => {
	//console.log(blogedits);
	const request = await axios.put(`${url}/${blogedits.blogid}`, {comments: blogedits.comments});
	return request.data;
};

export const deleteBlog = async (blog) => {
	const request = await axios.delete(`${url}/${blog.blogid}`);
	return request.data;
};

// eslint-disable-next-line
//export default {getAll, postBlog, editBlog, deleteBlog};
