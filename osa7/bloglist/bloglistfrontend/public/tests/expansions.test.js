const supertest = require('supertest');
const app = require('../app');
//const BlogController = require('../controllers/blogController');
const Blog = require('../models/blog');
const {initialUser, initialBlogs, testInitialization, endTest} = require('./testhelpers');
const {errorlog, infolog} = require('../utils/loggers');

const api = supertest(app);

testInitialization();

describe('Tehtävä 4.13', () => {
  test('before delete, expect getBlogs to be 3', async () => {
    const responseGet = await api.get('/api/blogs');
    //infolog(responseGet);
    //infolog(responseGet.body);
    expect(responseGet.body.length).toBe(3);
  });

  test('delete without token', async () => {
    const responseGet = await api.get('/api/blogs');
    const blogToDelete = responseGet.body.pop();
    const responseDelete = await api.delete(`/api/blogs/${blogToDelete.blogid}`);
    expect(responseDelete.statusCode).toBe(401);
  });

  test('delete last blog and expect getBlogs to be 2', async () => {
    /*const userLogin = */await api.post('/api/login').send({username: initialUser.username, password: initialUser.passwordhash}).set('Accept', 'application/json');
    //infolog('userlogin: ', userLogin.data);

    const responseGet = await api.get('/api/blogs');
    //infolog(responseGet);
    //infolog(responseGet.body);
    
    const blogToDelete = responseGet.body.pop();
    //infolog(blogToDelete);
    expect(typeof blogToDelete).toBe('object');
    expect(Object.keys(blogToDelete).length).toBe(7);
    
    const responseDelete = await api.delete(`/api/blogs/${blogToDelete.blogid}`);
    //infolog(responseDelete);
    expect(responseDelete.statusCode).toBe(200);
    expect(responseDelete.text).toBe(`User Testaaja deleted blog: '${blogToDelete.title}' from author ${blogToDelete.author}`);

    const responseGetAfterDelete = await api.get('/api/blogs');
    //infolog(responseGetAfterDelete);
    expect(responseGetAfterDelete.body.length).toBe(2);
  });

  /*
  test('after delete, expect getBlogs to be 2', async () => {
    const responseGetAfterDelete = await Blog.findAll();
    //infolog(responseGetAfterDelete);
    expect(responseGetAfterDelete.length).toBe(2);
  });
  */
});

describe('Tehtävä 4.14', () => {
  test('blogs before edit', async () => {
    const responseGet = await api.get('/api/blogs');
    //infolog(responseGet);
    const blogs = responseGet.body;
    //infolog(getLastBlog);
    expect(blogs.length).toBe(3);
    expect(blogs).not.toEqual(initialBlogs);

    blogs.forEach(blog => {
      expect(blog.blogid).toEqual(expect.any(Number));
      expect(blog.createdbyuserid).not.toBe(null);
    });
    /* .toContain ei jostain syystä toimi kuin jestin ohjeissa on kirjoitettu
    expect(blogs).toContain(initialBlogs[0].title);
    expect(blogs).toContain(initialBlogs[1].title);
    expect(blogs).toContain(initialBlogs[2].title);
    */
  });


  test('edit blog and expect not to match with the old version of same blog', async () => {
    /*const userLogin = */await api.post('/api/login').send({username: initialUser.username, password: initialUser.passwordhash}).set('Accept', 'application/json');;
    //infolog('userlogin: ', userLogin);

    const responseGet = await api.get('/api/blogs');
    const blogToEdit = responseGet.body.pop();

    //testi blogien tekijäksi määritelty tällä hetkellä null, eli token verifointi ei voi toimia poistamiseen
    //ja tästä seuraava idea:
    //pitää tehdä token verifoinnille if lause joka tutkii onko blogin tehnyt käyttäjä vai onko createrbyuserid null
    //siihen vielä jokin ratkaisu, että admin logineilla tai jollain vastaavalla voi poistaa sellaiset blogit
    const responseEdit = await api.put(`/api/blogs/${blogToEdit.blogid}`).send({likes: 500});
    expect(responseEdit.statusCode).toBe(200);

    /*
    const responseGetAfterEdit = await api.get('/api/blogs');
    const editedBlog = responseGetAfterEdit.body.pop();
    //infolog(editedBlog);
    expect(editedBlog).not.toMatchObject(blogToEdit);
    */

    //double check
    const findEditedBlogById = await Blog.findOne({where: {blogid: blogToEdit.blogid}})
    expect(findEditedBlogById).not.toMatchObject(blogToEdit);
  });

  /*
  test('testi', async () => {
    infolog('testi');
  });
  */
});

/*
describe('toimiiko', () => {
  test('...', async () => {
    infolog('toimii');
  });
});
*/

endTest();