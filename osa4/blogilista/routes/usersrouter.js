const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
//const User = require('../models/user');
//const Blog = require('../models/blog');
const {infolog, errorlog} = require('../utils/loggers');

usersRouter.get('/', async (request, response) => {
  const users = await userController.getAllUsersWithoutPassword();
  return response.status(200).json(users);
});

//blogs are not attached to user on database
//on database, a blog has foreign key to correct user, who created it
//so blogs are attached to right users with some asynchronous code on node express server
//could also just add blogs array as column/field to users table on the database and add many-to-one relation
//relation would be: (one user could have from zero-to-many blogs and one blog could only have one user)

usersRouter.get('/blogsCreated', async (request, response) => {
  const users = await userController.getAllUsersWithoutPassword();
  const usersWithBlogs = users.map(async (user) => {
    const results = await blogController.findBlogsByUserIdWithId(user.dataValues.userid);
    return ({...user.dataValues, blogsCreated: results});
  });
  const results = await Promise.all(usersWithBlogs);
  //infolog(results);
  return response.status(200).json(results);
});

usersRouter.post('/', async (request, response) => {
  if (typeof request.body.passwordhash === 'string' && request.body.passwordhash.length > 2 && request.body.passwordhash.match(/^([a-ö\-\_\!\?\*\+\^\@\£\€\$\&\%]){3,255}$/gi)) {
    const passwordHash = await bcrypt.hash(request.body.passwordhash, 12);
    //const body = request.body;
    //infolog(body);
    //const newUser = {username: request.body.username, passwordhash: passwordHash, name: request.body.name};
    /*
    const object = User.rawAttributes;
    const blogobject = Blog.rawAttributes;
    infolog('user object', object);
    infolog('blog object: ',blogobject);
    */
    //infolog(newUser);
    //const result = await userController.createUser(newUser);
    const result = await userController.createUser({username: request.body.username, passwordhash: passwordHash, name: request.body.name});
    return response.status(201).json(`Created: '${result.username}' and saved it to database`);
  } else {
    throw new Error(`Password must be formated as string, atleast 3 characters and allowed characters are letters: 'a-ö' and characters: '-_!?*+^@£€$&%'`);
  }
});

module.exports = usersRouter;