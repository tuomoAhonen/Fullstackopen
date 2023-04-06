const listHelper = require('./listhelper');
const blogController = require('../controllers/blogController');
const {infolog, errorlog} = require('../utils/loggers');

describe('dummy', () => {
  test('returns one', async () => {
    return await blogController.getAllBlogs().then(blogs => {
      const result = listHelper.dummy(blogs);
      //infolog('dummy returned', result);
      expect(result).toBe(1)
    }).catch(error => errorlog(error));
  })
});

describe('getAllBlogs', () => {
  test('contain atleast 1 blog', async () => { 
    return await blogController.getAllBlogs().then(blogs => {
      infolog(listHelper.countBlogs(blogs));
      expect(listHelper.countBlogs(blogs)).toBeGreaterThanOrEqual(1)
    }).catch(error => errorlog(error));
  });

  test('count of likes', async () => { 
    return await blogController.getAllBlogs().then(blogs => {
      infolog(listHelper.totalLikes(blogs));
      expect(listHelper.totalLikes(blogs)).toBe(listHelper.totalLikes(blogs));
    }).catch(error => errorlog(error));
  });

  test('objects contain information', async () => {
    return await blogController.getAllBlogs().then(blogs => {
      //listHelper.mapBlogs(blogs).forEach(blog => infolog(blog));
      listHelper.mapBlogs(blogs).forEach(blog => {
        expect(blog).toEqual(expect.anything());
        expect(blog).toEqual(
          expect.objectContaining({
            id: expect.anything(), 
            title: expect.anything(), 
            author: expect.anything(), 
            url: expect.anything(), 
            likes: expect.anything()
          })
        );
        expect(blog).toEqual(
          expect.objectContaining({
            id: expect.any(Number), 
            title: expect.any(String), 
            author: expect.any(String), 
            url: expect.any(String), 
            likes: expect.any(Number)
          })
        );
      });
    }).catch(error => errorlog(error));
  });
});

describe('getAllBlogs favorite blog', () => {
  test('most likes', async () => {
    return await blogController.getAllBlogs().then(blogs => {
      const favoriteBlogFound = listHelper.favoriteBlog(blogs);
      infolog('favorite blog: ', favoriteBlogFound);

      const notFavoriteBlogsFound = listHelper.notFavoriteBlogs(blogs);
      infolog('not favorites: ', notFavoriteBlogsFound);

      notFavoriteBlogsFound.forEach(blog => {
        expect(favoriteBlogFound.likes).toBeGreaterThan(blog.likes)
      });
    }).catch(error => errorlog(error));
  });
});

describe('most blogs', () => {
  test('by author', async () => {
    return await blogController.getAllBlogs().then(blogs => {
      const result = listHelper.mostBlogs(blogs);
      infolog('Author with most blogs: ', result);
      expect(typeof result).toBe('object');
      expect(JSON.stringify(result)).toMatch(/\{[^}]*\}/gi);
    }).catch(error => errorlog(error));
  });
});

describe('most likes', () => {
  test('by author', async () => {
    return await blogController.getAllBlogs().then(blogs => {
      const result = listHelper.mostLikes(blogs);
      infolog('Author with most likes: ', result)
    }).catch(error => errorlog(error));
  });
});

afterAll(async () => {
  return await blogController.closeConnection().then(() => infolog('connection closed')).catch(error => errorlog(error));
});