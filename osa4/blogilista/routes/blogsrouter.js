const blogsRouter = require('express').Router();
const blogController = require('../controllers/blogController');
const {infolog, errorlog} = require('../utils/loggers');
const {verifyUser} = require('../middlewares/tokenhandler');
//const verifyUser = require('../middlewares/verifyuser');
//const userController = require('../controllers/userController');
//const jwt = require('jsonwebtoken');
//const {secret} = require('../utils/appconfig');
//const {getToken} = require('../middlewares/tokenextractor');

blogsRouter.get('/', async (request, response) => {
  const results = await blogController.getAllBlogs();
  const mappedResults = results.map(async (result) => ({...result.dataValues, createdbyuser: await result.createdbyuser}));
  const resultsWithCreator = await Promise.all(mappedResults);
  //infolog(resultsWithCreator);
  return response.status(200).json(resultsWithCreator);
  //return response.status(200).json(results);
});

blogsRouter.post('/', async (request, response) => {
  //infolog('blogsrouter.post request.user: ', request.user);
  //infolog(request.token);
  const checkedToken = verifyUser(request.token);
  
  //const user = request.user;
  //infolog('user: ', user)
  const blog = {...request.body, createdbyuserid: checkedToken.id};
  const result = await blogController.createNewBlog(blog);
  const resultWithCreator = {...result.dataValues, createdbyuser: await result.createdbyuser};
  //return response.status(201).send(`User ${user} created blog:\nid: ${resultWithCreator.blogid}\ntitle: ${resultWithCreator.title}\nauthor: ${resultWithCreator.author}\nurl: ${resultWithCreator.url}\nlikes: ${resultWithCreator.likes}`);
  return response.status(201).send(resultWithCreator); //<-- parempi ilman tekstiä kuka teki, mutta sisältää userin jsonissa
  //const checkedToken = jwt.verify(request.token/*getToken()*/, secret);

  /* token error handled at errorhandler middleware
  if (!checkedToken.id) {
    return response.status(401).json({error: 'Token is invalid or missing'});
  }
  */

  //infolog('checkedtoken: ', checkedToken);
  //infolog(getJwtTokenSigned());
  //const userid = checkedToken.id;
  //infolog(userid);
  //const user = await userController.findUserById(checkedToken.id);
  //infolog(user.dataValues.userid);
  //infolog(blog);
  //infolog(result)
  //infolog(resultWithCreator);
  //infolog(result);
});

blogsRouter.put('/:id', async (request, response) => {
  const checkedToken = verifyUser(request.token);
  const user = request.user;
  const id = request.params.id;
  const blog = await blogController.findBlogById(id);

  if (checkedToken.id !== blog.createdbyuserid) {
    const error = new Error(`This blog is not created by user ${user} / wrong user credentials`);
    error.name = 'WrongUserError';
    throw error;
  }

  const blogEdits = request.body;
  const result = await blogController.editBlogById(blogEdits, id);
  const editedBlog = await blogController.findBlogById(id);

  if (result[0] === 0) {
    throw new Error(`Could not edit blog with id: ${id}, because it does not exist in the database`);
  } else {
    return response.status(200).json(editedBlog);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const checkedToken = verifyUser(request.token);

  const user = request.user;
  //infolog('user: ', user)

  const id = request.params.id;
  const blog = await blogController.findBlogById(id);

  /*
  infolog('id match check: ');
  infolog('checked token id: ', checkedToken.id);
  infolog('blogs createdbyuserid: ', blog.createdbyuserid);
  */

  if (checkedToken.id !== blog.createdbyuserid) {
    const error = new Error('This blog is not created by this user / wrong user credentials');
    error.name = 'WrongUserError';
    throw error;
  }

  const result = await blogController.deleteBlogById(id);

  if (result === 0) {
    throw new Error(`Could not delete blog with id: ${id}, because it does not exist in the database`);
  } else {
    return response.status(200).send(`User ${user} deleted blog: '${blog.title}' from author ${blog.author}`);
  }
});

module.exports = blogsRouter;

/* Correct way - then without async await
blogsRouter.get('/', (request, response, next) => {
  return blogController
    .getAllBlogs()
    .then(results => response.status(200).json(results))
    .catch(error => next(error));
});
*/

/* Uncorrect way - mixed async await with .then().catch()
blogsRouter.get('/', async (request, response, next) => {
  return await blogController
    .getAllBlogs()
    .then(results => response.status(200).json(results))
    .catch(error => next(error));
});
*/

/* Or use async await with try catch. 
// Or you could use module called express-async-errors, 
// which will handle the errors for you without the try catch -method 
// and without calling the next -function.
blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;
  const blog = request.body;
  //infolog(blog, id);
  try {
    const result = await blogController.editBlogById(blog, id);
    const editedBlog = await blogController.findBlogById(id);
    //infolog(result);
    if (result[0] === 0) {
      throw new Error(`Error: Could not edit blog with id: ${id}, because it does not exist in the database`);
    } else {
      return response.status(200).json(editedBlog);
    }
  } catch (error) {
    return next(error);
  }
});
*/

/*
blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const blog = await blogController.findBlogById(id);
    const result = await blogController.deleteBlogById(id);
    if (result === 0) {
      throw new Error(`Error: Could not delete blog with id: ${id}, because it does not exist in the database`);
    } else {
      return response.status(200).send(`Deleted blog: '${blog.title}' from author '${blog.author}' with id ${blog.id}`);
    }
  } catch (error) {
    return next(error);
  }
});
*/

/*
blogsRouter.post('/', async (request, response, next) => {
  let checkedToken;

  jwt.verify(getToken(), process.env.SECRET, (error, decoded) => {
    if (error) {
      //infolog('error');
      return checkedToken = error;
    } else {
      //infolog('not error');
      return checkedToken = decoded;
    }
  });

  if (!checkedToken.id) {
    return response.status(401).json({error: 'Token is invalid or missing'});
  }
  
  const blog = {...request.body, createdbyuserid: checkedToken.id};
  const result = await blogController.createNewBlog(blog);
  const resultWithCreator = {...result.dataValues, createdbyuser: await result.createdbyuser};
  return response.status(201).json(resultWithCreator);
  

  //const checkedToken = 
  jwt.verify(getToken(), process.env.SECRET, async (error, decoded) => {
    if (error) {
      errorlog(error.message);
      return response.status(401).json({error: 'Token is invalid or missing'});
    } else {
      //infolog(decoded);
      const blog = {...request.body, createdbyuserid: decoded.id};
      try {
        const result = await blogController.createNewBlog(blog);
        const resultWithCreator = {...result.dataValues, createdbyuser: await result.createdbyuser};
        return response.status(201).json(resultWithCreator);
      } catch (catchError) {
        //errorlog(catchError);
        next(catchError);
      }
    }
  });
  
  
  const checkedToken = jwt.verify(getToken(), process.env.SECRET)

  
  if (!checkedToken.id) {
    return response.status(401).json({error: 'Token is invalid or missing'});
  }
  
  
  const blog = {...request.body, createdbyuserid: checkedToken.id};
  const result = await blogController.createNewBlog(blog);
  const resultWithCreator = {...result.dataValues, createdbyuser: await result.createdbyuser};
  return response.status(201).json(resultWithCreator);
  
  //infolog('checkedtoken: ', checkedToken);
  //infolog(getJwtTokenSigned());
  //const userid = checkedToken.id;
  //infolog(userid);
  //const user = await userController.findUserById(checkedToken.id);
  //infolog(user.dataValues.userid);
  //infolog(blog);
  //infolog(result)
  //infolog(resultWithCreator);
  //infolog(result);
});
*/

/*
const verifyUser = (token, secret) => {
  return jwt.verify(token, secret);
};
*/