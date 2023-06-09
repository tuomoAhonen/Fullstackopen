const _ = require('lodash');
const {infolog, errorlog} = require('../utils/loggers');

const dummy = (blogs) => {
  //infolog('dummy logging: ', blogs);
  //infolog('dummy logging: ', typeof blogs);
  //infolog('dummy logging: ', Object.keys(blogs).length);
  if (blogs && typeof blogs === 'object' && Object.keys(blogs).length > 0) {
    infolog('dummy logging: blogs is filled with data');
  } else {
    infolog('dummy logging: blogs got no data');
  }

  return 1;
};

const countBlogs = (blogs) => {
  const count = blogs.map(blog => blog.dataValues).length;
  //infolog('countBlogs funktio', count);
  return count;
};

const mapBlogs = (blogs) => {
  //blogs.forEach(blog => infolog(blog.dataValues));
  return blogs.map(blog => blog.dataValues);
};

const totalLikes = (blogs) => {
  //const allLikes = blogs.map(blog => blog.likes).reduce((total, likes) => total + likes, 0);
  //infolog('total likes', allLikes);
  return blogs.map(blog => blog.likes).reduce((total, likes) => total + likes, 0);
};

const favoriteBlog = (blogs) => {
  const mappedBlogs = mapBlogs(blogs);
  const favorite = mappedBlogs.sort((a, b) => a.likes - b.likes).findLast(blog => blog);
  //infolog('favorite blog, mapped blogs', mappedBlogs);
  //infolog('favorite blog: ', favorite);
  return favorite;
};

const notFavoriteBlogs = (blogs) => {
  const mappedBlogs = mapBlogs(blogs);
  const notFavorites = mappedBlogs.sort((a, b) => a.likes - b.likes);
  notFavorites.pop();
  //infolog(notFavorites);
  return notFavorites;
};

const groupBlogsByAuthor = (blogs) => {
  const mappedBlogs = mapBlogs(blogs);
  const groupedBlogs = _.groupBy(mappedBlogs, (o) => o.author);
  return groupedBlogs;
};

const mostBlogs = (blogs) => {
  //const mappedBlogs = mapBlogs(blogs);
  //const groupedBlogs = _.groupBy(mappedBlogs, (o) => o.author);
  const groupedBlogs = groupBlogsByAuthor(blogs);
  const modifiedBlogs = _.map(groupedBlogs, (a) => ({author: a[0].author, blogs: _.map((a), (a) => a)}));
  const authorWithMostBlogs = _.maxBy(modifiedBlogs, (a) => a.blogs);
  const authorWithMostBlogsCounted = {author: authorWithMostBlogs.author, blogs: authorWithMostBlogs.blogs.length};
  return authorWithMostBlogsCounted;
  //infolog(authorWithMostBlogs);
  //infolog('most', mostBlogs);
  //infolog('modified', modifiedBlogs);
  //infolog('grouped: ', groupedBlogs);
};

const mostLikes = (blogs) => {
  //const mappedBlogs = mapBlogs(blogs);
  //const groupedBlogs = _.groupBy(mappedBlogs, (o) => o.author);
  const groupedBlogs = groupBlogsByAuthor(blogs);
  const allAuthorsWithLikes = _.map(groupedBlogs, (a) => ({author: a[0].author, likes: _.sum(_.map((a), (a) => a.likes))}));
  const authorWithMostLikes = _.maxBy(allAuthorsWithLikes, (o) => o.likes);
  return authorWithMostLikes;
  //infolog(groupedBlogs);
  //infolog(allAuthorsWithLikes);
  /* muotoiltiin ja nimettiin paremmin, sekä tiivistettiin koodia ja nämä rivit jäivät pois
  const modifiedBlogs = _.map(groupedBlogs, (a) => ({author: a}));
  infolog(modifiedBlogs);
  const remodifiedBlogs = _.map(modifiedBlogs, (a) => ({author: a.author[0].author, likes: _.sum(_.map((a.author), (a) => a.likes))}));
  */
};

module.exports = {dummy, countBlogs, mapBlogs, totalLikes, favoriteBlog, notFavoriteBlogs, mostBlogs, mostLikes};

/*
const mostBlogs = (blogs) => {
  const mappedBlogs = blogs.map(blog => blog.author);
  //const noDublicates = [...new Set(mappedBlogs)];
  const noDublicates = [];
  mappedBlogs.forEach(author => {
    if(!noDublicates.includes(author)) {
      noDublicates.push(author);
    }
  });
  const blogMatches = noDublicates.map(author => 
    ({name: author, blogs: mappedBlogs.filter(authorMatch => 
      {
        if (author === authorMatch) {
          //infolog('match!');
          return author;
        }
      })
    })
  );
  const blogCount = blogMatches.map(o => ({author: o.name, blogs: o.blogs.length}));
  const mostBlogs = blogCount.sort((a, b) => a.blogs - b.blogs).findLast(author => author);

  return mostBlogs;
  //infolog(mostBlogs);
  //infolog(blogCount)
  //infolog(blogMatches);
  //infolog(noDublicates);
};
*/
