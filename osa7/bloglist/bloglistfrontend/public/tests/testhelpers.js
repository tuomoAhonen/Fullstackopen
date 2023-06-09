const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {errorlog, infolog} = require('../utils/loggers');



const initialBlogs = [
  {
    title: 'first example',
    author: 'unique author',
    url: 'https://www.blogexample1.com',
    likes: 1,
    createdbyuserid: null
  },
  {
    title: 'second example',
    author: 'mr author',
    url: 'https://www.blogexample2.com',
    likes: 2,
    createdbyuserid: null
  },
  {
    title: 'third example',
    author: 'mr author',
    url: 'https://www.blogexample3.com',
    likes: 3,
    createdbyuserid: null
  }
];

const initialUser = {username: 'Testaaja', passwordhash: 'salainen', name: 'Malli Testaaja'};

function testInitialization() {
  return beforeEach(async () => {
    try {
      const blogs = await Blog.findAll({attributes: ['blogid', 'title', 'author', 'url', 'likes', 'createdbyuserid']});
      const deletedBlogs = blogs.map(async (blog) => await Blog.destroy({where: {blogid: blog.blogid}}));
      await Promise.all(deletedBlogs);

      const users = await User.findAll({raw: true});
      const deletedUsers = users.map(async (user) => await User.destroy({where: {userid: user.userid}}));
      await Promise.all(deletedUsers);

      const passwordHash = await bcrypt.hash(initialUser.passwordhash, 12);
      const insertedUser = await User.create({...initialUser, passwordhash: passwordHash});
      //infolog(`Initializied test user: `, insertedUser.dataValues.userid);

      const insertedBlogs = initialBlogs.map(async (blog) => await Blog.create({...blog, createdbyuserid: insertedUser.dataValues.userid}));
      await Promise.all(insertedBlogs);
      //infolog(`Initializied test blogs:`);
      //infolog(insertedBlogs);
    } catch (error) {
      errorlog('Test initialization error: ', error);
    }
    //blogs.forEach(blog => infolog(blog.dataValues));
    
  });
};

function endTest() {
  return afterAll(async () => {
    return await Blog.sequelize.close().then(() => infolog('Blog model - connection closed')).catch(error => errorlog(error));
    //return await BlogController.closeConnection().then(() => infolog('BlogController - connection closed')).catch(error => errorlog(error));
  });
};

module.exports = {initialBlogs, initialUser, testInitialization, endTest};