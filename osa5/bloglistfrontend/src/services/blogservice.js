import axios from 'axios';
const url = '/api/blogs';

const getAll = async () => {
  const request = await axios.get(url);
  return request.data;
  //return request.then(response => response.data);
};

const postBlog = async (blog) => {
  const request = await axios.post(url, blog);
  //console.log(request);
  return request.data;
  //return request.then(response => response.data);
};

const editBlog = async (blogedits, blogid) => {
  const request = await axios.put(`${url}/${blogid}`, blogedits);
  return request.data;
};

const deleteBlog = async (blogid) => {
  const request = await axios.delete(`${url}/${blogid}`);
  return request.data;
};

// eslint-disable-next-line
export default {getAll, postBlog, editBlog, deleteBlog};