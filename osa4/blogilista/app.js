const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const dataLogger = require('./middlewares/datalogger');
const {tokenHandler} = require('./middlewares/tokenhandler');
const userHandler = require('./middlewares/userhandler');
const unknownEndpoint = require('./middlewares/unknownendpoint');
const errorHandler = require('./middlewares/errorhandler');
const blogsRouter = require('./routes/blogsrouter');
const usersRouter = require('./routes/usersrouter');
const loginRouter = require('./routes/loginrouter');



app.use(dataLogger);
app.use(tokenHandler);
app.use(userHandler);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

//const BlogController = require('./controllers/blogController');
/*
app.get('/api/blogs', async (request, response, next) => {
  return await BlogController
    .getAllBlogs()
    .then(results => response.status(200).json(results))
    .catch(error => next(error));
});

app.post('/api/blogs', async (request, response, next) => {
  return await BlogController
    .createNewBlog(request.body)
    .then(result => {
      infolog(result);
      return response.status(200).json(result);
    })
    .catch(error => next(error));
});
*/

/*
app.post('/api/blogs', async (request, response, next) => {
  const newBlog = await BlogController
    .buildNewBlog(request.body)

  BlogController
    .saveBlog(newBlog)
    .then(result => {
        //infolog(result);
        return response.status(200).json(result);
      })
    .catch(error => next(error));
});
*/

//const Blog = require('./models/blog');

/*
app.get('/api/blogs', async (require, response) => {
  await Blog
    .findAll({
      attributes: ['id', 'title', 'author', 'url', 'likes']
    })
    .then(results => response.json(results))
    .catch(error => console.log(error));
});

app.post('/api/blogs', async (require, response) => {
  await Blog
    .create(require.body)
    .then(result => response.json(result))
    .catch(error => console.log(error));
  
  // pidempi versio
  //const newBlog = await Blog.build(require.body);
  //await newBlog.then(
  //  result => { 
  //    console.log(result)
  //    return newBlog.save();
  //  }
  //).catch(error => console.log(error));
  
});
*/

/*
(async () => {
  try {
    await (await Blog.create({title: 'Blogi 6', author: 'Emanuel Esimerkkinen', url: 'https://www.blogi6.com', likes: 10})).save();
    console.log('Created new blog');
  } catch (error) {
    console.log('Unable to create new blog:', error);
  }
})();
*/

/*
(async () => {
  try {
    await (await Blog.destroy({where: {id: [5, 6, 7]}}));
    console.log('Deleted blog(s)');
  } catch (error) {
    console.log('Unable to delete blog(s):', error);
  }
})();
*/

/*
const pool = require('./database/pgconnection');

app.get('/api/blogs', async (require, response) => {
  pool.query('SELECT * FROM Blogs', (error, result) => {
    if (error) {
      return console.log(error);
    } else {
      //console.log(result);
      return response.json(result.rows);
    }
  })
});
 */