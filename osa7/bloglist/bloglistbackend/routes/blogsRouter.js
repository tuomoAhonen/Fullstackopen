const blogsRouter = require('express').Router();
const blogController = require('../controllers/blogController');
const {infolog, errorlog} = require('../utils/loggers');
const {verifyUser} = require('../middlewares/tokenhandler');

blogsRouter.get('/', async (request, response) => {
	const results = await blogController.getAllBlogs();
	const mappedResults = results.map(async (result) => ({
		...result.dataValues,
		createdbyuser: await result.createdbyuser,
	}));
	const resultsWithCreator = await Promise.all(mappedResults);
	//infolog(resultsWithCreator);
	return response.status(200).json(resultsWithCreator);
	//return response.status(200).json(results);
});

blogsRouter.post('/', async (request, response) => {
	const checkedToken = verifyUser(request.token);
	let blog;

	if (request.body.createdbyuserid === null || request.body.createdbyuserid === 'null' || !request.body.createdbyuserid) {
		blog = {...request.body, createdbyuserid: checkedToken.id};
	} else {
		blog = {...request.body};
	}

	if (!request.body.likes) {
		//blog = {...blog, likes: 0};
		blog.likes = 0;
	}

	const result = await blogController.createNewBlog(blog);
	const resultWithCreator = {...result.dataValues, createdbyuser: await result.createdbyuser};

	//parempi ilman tekstiä kuka teki, mutta sisältää userin jsonissa
	//console.log(resultWithCreator);
	return response.status(201).send(resultWithCreator);
});

blogsRouter.put('/:id', async (request, response) => {
	//infolog(request.params);
	const checkedToken = verifyUser(request.token);
	const user = request.user;
	const blogId = request.params.id;
	const blog = await blogController.findBlogById(blogId);
	const blogEdits = request.body;

	const resultsOfLikers = blog.whohasliked !== null ? blog.whohasliked.includes(user.userid) : null;

	//console.log(resultsOfLikers);

	if (blogEdits.newlike && blogEdits.wholiked && (resultsOfLikers === null || resultsOfLikers === false)) {
		//const newArray = [blogEdits.wholiked];
		const result = await blogController.editBlogById(
			{
				...blog,
				likes: blog.likes + 1,
				whohasliked: blog.whohasliked !== null ? [...blog.whohasliked, blogEdits.wholiked] : [blogEdits.wholiked],
				//whohasliked: blog.whohasliked !== null ? [...blog.whohasliked, blogEdits.wholiked] : newArray,
			},
			blogId
		);

		//console.log(result);
		const editedBlog = await blogController.findBlogById(blogId);
		//console.log('editedblog: ', editedBlog);
		//console.log('like result:', result);

		if (result[0] === 0) {
			throw new Error(`Could not edit blog with id: ${blogId}, because it does not exist in the database`);
		} else {
			return response.status(200).json(editedBlog);
		}
	} else {
		if (checkedToken.id !== blog.createdbyuserid) {
			const error = new Error(`This blog is not created by user ${user} / wrong user credentials`);
			error.name = 'WrongUserError';
			throw error;
		}

		//console.log('router: ');
		//console.log(blog);
		//console.log(blogEdits);
		//console.log(blogId);

		/*
		const test = {...blog.dataValues, ...blogEdits};
		console.log('test: ');
		console.log(test);
		*/

		const result = await blogController.editBlogById({...blog.dataValues, ...blogEdits}, Number(blogId));
		const editedBlog = await blogController.findBlogById(blogId);

		//console.log(result);
		//console.log(editedBlog);

		if (result[0] === 0) {
			throw new Error(`Could not edit blog with id: ${blogId}, because it does not exist in the database`);
		} else {
			return response.status(200).json(editedBlog);
		}
	}
});

blogsRouter.delete('/:id', async (request, response) => {
	const checkedToken = verifyUser(request.token);

	const user = request.user;
	//infolog('user: ', user)

	const blogId = request.params.id;
	const blog = await blogController.findBlogById(blogId);

	if (checkedToken.id !== blog.createdbyuserid) {
		let error = new Error('This blog is not created by this user / wrong user credentials');
		error.name = 'WrongUserError';
		throw error;
	}

	const result = await blogController.deleteBlogById(blog.blogid);

	if (result === 1) {
		console.log(`${user} deleted blog: '${blog.title}' from database`);
		return response.status(200).json(blog);
		//return response.status(200).send(`${user} deleted '${blog.title}' from author ${blog.author}`);
	}
});

module.exports = blogsRouter;
