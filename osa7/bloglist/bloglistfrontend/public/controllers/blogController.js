const Blog = require('../models/blog');

const getAllBlogs = async () => {
	return await Blog.findAll({
		attributes: ['blogid', 'title', 'author', 'url', 'likes', 'whohasliked', 'createdbyuserid', 'createdbyuser', 'comments'],
	});
};

const createNewBlog = async (blog) => {
	return await Blog.create(blog);
};

const deleteBlogById = async (blogId) => {
	return await Blog.destroy({where: {blogid: blogId}});
};

const deleteBlogByName = async (blogName) => {
	return await Blog.destroy({where: {blogid: blogName}});
};

const deleteAllBlogs = async () => {
	return await Blog.destroy({where: {} /*, truncate: true, cascade: true, force: true*/});
};

const editBlogById = async (blog, blogId) => {
	console.log('blogcontroller: ');
	console.log(blog);
	console.log(blogId);
	return await Blog.update(blog, {where: {blogid: blogId}});
};

const editBlogByName = async (blog, blogName) => {
	return await Blog.update(blog, {where: {blogid: blogName}});
};

const findBlogsByUserIdWithId = async (userId) => {
	return await Blog.findAll({attributes: ['blogid', 'title', 'author', 'likes', 'createdbyuserid'], where: {createdbyuserid: userId}});
};

const findBlogById = async (blogId) => {
	return await Blog.findOne({where: {blogid: blogId}});
};

const findBlogByName = async (blogName) => {
	return await Blog.findOne({where: {blogid: blogName}});
};

const closeConnection = async () => {
	return Blog.sequelize.close();
};

/*
const buildNewBlog = async (body) => {
  return Blog.build(body);
};

const saveBlog = async (blog) => {
  return blog.save();
};
*/

module.exports = {
	getAllBlogs,
	createNewBlog,
	deleteBlogById,
	deleteBlogByName,
	deleteAllBlogs,
	editBlogById,
	editBlogByName,
	findBlogsByUserIdWithId,
	findBlogById,
	findBlogByName,
	closeConnection /*, buildNewBlog, saveBlog*/,
};
