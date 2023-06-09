const testsRouter = require('express').Router();
const blogController = require('../controllers/blogController');
const userController = require('../controllers/userController');

testsRouter.post('/reset', async (request, response) => {
  //const getAllBlogs = await blogController.getAllBlogs();
  //console.log(getAllBlogs);

  const deleteBlogsResults = await blogController.deleteAllBlogs();
  console.log(deleteBlogsResults);

  const deleteUsersResults = await userController.deleteAllUsers();
  console.log(deleteUsersResults);

  return response.status(200).send('Deleted all of blogs and users from test-tables of the database');
});

module.exports = testsRouter;