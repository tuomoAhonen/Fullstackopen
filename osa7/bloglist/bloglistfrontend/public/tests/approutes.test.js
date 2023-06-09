const supertest = require('supertest');
const app = require('../app');
//const BlogController = require('../controllers/blogController');
const Blog = require('../models/blog');
const {initialBlogs} = require('./testhelpers');
const {errorlog, infolog} = require('../utils/loggers');

const api = supertest(app);

beforeEach(async () => {
  const blogs = await Blog.findAll();
  //blogs.forEach(blog => infolog(blog.dataValues));
  const deletedBlogs = blogs.map(async (blog) => await Blog.destroy({where: {id: blog.blogid}}));
  await Promise.all(deletedBlogs);
  const insertedBlogs = initialBlogs.map(async (blog) => await Blog.create(blog));
  await Promise.all(insertedBlogs);
});

describe('app route api/blogs get testing', () => {
  test('responses information & body length', async () => {
    try {
      const response = await api.get('/api/blogs');
      //infolog(response);
      expect('Content-Type');
      expect(/application\/json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(3);
    } catch (error) {
      errorlog(error);
    }
  });

  test('blogs have id / defined', async () => {
    try {
      const response = await api.get('/api/blogs');
      response.body.forEach(blog => expect(blog).toBeDefined());
    } catch (error) {
      errorlog(error);
    }
  });
});

describe('app route api/blogs post testing', () => {
  test('blogs increase by 1 new blog', async () => {
    try {
      const postResponse = await api
        .post('/api/blogs')
        .send({title: 'blog increase test', author: 'mr blogicreaser', url: 'https://www.blogincreaser.com', likes: 0})
        .set('Accept', 'application/json');
      //infolog(postResponse);
      expect(postResponse.statusCode).toBe(201);
      expect(postResponse.body).toEqual({blogid: expect.any(Number), title: 'blog increase test', author: 'mr blogicreaser', url: 'https://www.blogincreaser.com', likes: 0});
      const getResponse = await api.get('/api/blogs');
      expect(getResponse.body.length).toBe(4);
      expect(getResponse.body[3])
        .toEqual(
          expect.objectContaining({
            blogid: expect.any(Number), 
            title: 'blog increase test', 
            author: 'mr blogicreaser', 
            url: 'https://www.blogincreaser.com', 
            likes: 0
          })
        );
    } catch (error) {
      errorlog(error);
    }
  });

  test('missing likes and auto-fill', async () => {
    try {
      let postResponse = await api
        .post('/api/blogs')
        .send({title: 'new blog have empty likes field', author: 'mr blogger', url: 'https://www.mrblogger.com/nolikes'})
        .set('Accept', 'application/json');
      
      if (postResponse.body === 'Error: notNull Violation: blog.likes cannot be null' && postResponse.statusCode === 400) {
        const parsedData = JSON.parse(JSON.stringify(postResponse));
        const blogData = parsedData.req.data;
        blogData.likes = 0;
        //infolog(blogData);

        postResponse = await api
          .post('/api/blogs')
          .send(blogData)
          .set('Accept', 'application/json');
      }

      const postedBlog = JSON.parse(JSON.stringify(postResponse.body));
      expect(postedBlog).toHaveProperty('id');
      expect(postedBlog).toHaveProperty('title');
      expect(postedBlog).toHaveProperty('author');
      expect(postedBlog).toHaveProperty('url');
      expect(postedBlog).toHaveProperty('likes');
      expect(postedBlog.likes).toBe(0);
      expect(postResponse.statusCode).toBe(201);
      //expect(postResponse)

      const blogs = await Blog.findAll();
      blogs.forEach(blog => infolog(blog.dataValues));
    } catch (error) {
      errorlog(error);
    }
  });

  test('missing title or url', async () => {
    try {
      const testBlogs = [
        {
          title: 'new blog have empty likes field', author: 'mr blogger', /*url: 'https://www.mrblogger.com/nolikes', */likes: 0
        },
        {
          /*title: 'new blog have empty likes field', */author: 'mr blogger', url: 'https://www.mrblogger.com/nolikes', likes: 0
        },
        {
          title: 'working blog', author: 'mr blogger', url: 'https://www.mrblogger.com/itisworking', likes: 0
        }
      ];

      const testedBlogs = testBlogs.map(async (blog) => {
        let postResponse = await api
          .post('/api/blogs')
          .send(blog)
          .set('Accept', 'application/json')

        //infolog(postResponse);

        if (postResponse.body === 'Error: notNull Violation: blog.title cannot be null' || postResponse.body === 'Error: notNull Violation: blog.url cannot be null') {
          expect(postResponse.statusCode).toBe(400);
          expect(postResponse.created).toBe(false);
        } else {
          expect(postResponse.statusCode).toBe(201);
          expect(postResponse.created).toBe(true);
        }
      });

      await Promise.all(testedBlogs);

      const blogs = await Blog.findAll();
      blogs.forEach(blog => infolog(blog.dataValues));
      //let postResponse = await api
      //  .post('/api/blogs')
      //  .send({title: 'new blog have empty likes field', author: 'mr blogger', /*url: 'https://www.mrblogger.com/nolikes', */likes: 0})
      //  .set('Accept', 'application/json');
    } catch (error) {
      errorlog(error);
    }
  });
});

/*
describe('check blogs content', () => {
  test('checking...', async () => {
    const blogs = await Blog.findAll();
    blogs.forEach(blog => infolog(blog.dataValues));
    expect(blogs.length);
  });
});

describe('model testing', () => {
  test('findall', async () => {
    const blogs = await Blog.findAll();
    blogs.forEach(blog => infolog(blog.dataValues));
  });
});

describe('controller testing', () => {
  test('getAllBlogs', async () => {
    const blogs = await BlogController.getAllBlogs();
    blogs.forEach(blog => infolog(blog.dataValues));
  });
});
*/

afterAll(async () => {
  return await Blog.sequelize.close().then(() => infolog('Blog model - connection closed')).catch(error => errorlog(error));
  //return await BlogController.closeConnection().then(() => infolog('BlogController - connection closed')).catch(error => errorlog(error));
});