const User = require('../models/user');

const getAllUsersWithAllAttributes = async () => {
  return await User.findAll({});
};

const getAllUsersWithPassword = async () => {
  return await User.findAll({
    attributes: ['userid', 'username', 'passwordHash', 'name'/*, 'blogs'*/]
  });
};

const getAllUsersWithoutPassword = async () => {
  return await User.findAll({
    attributes: ['userid', 'username', 'name', 'blogs']
  });
};

const getAllUsersWithBlogsCreated = async () => {
  return await User.findAll({
    attributes: ['userid', 'username', 'name', 'blogscreated']
  });
};

const createUser = async (user) => {
  return await User.create(user);
};

const findUserById = async (userId) => {
  return await User.findOne({where: {userid: userId}});
};

const findUserByName = async (usernameInput) => {
  return await User.findOne({where: {username: usernameInput}});
};

const findUserByNameWithoutHash = async (usernameInput) => {
  return await User.findOne({raw: true, attributes: ['userid', 'username', 'name'], where: {username: usernameInput}});
};

module.exports = {getAllUsersWithAllAttributes, getAllUsersWithPassword, getAllUsersWithoutPassword, getAllUsersWithBlogsCreated, createUser, findUserById, findUserByName, findUserByNameWithoutHash};