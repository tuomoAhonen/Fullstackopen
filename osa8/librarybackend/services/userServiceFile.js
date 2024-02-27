const fs = require('fs');
const stringify = require('safe-stable-stringify');
const bcrypt = require('bcrypt');
const usersFile = require('../users.json');

const createUser = (user) => {
	if (user && Object.keys(user).length > 0) {
		usersFile.users.push(user);

		fs.writeFile('users.json', stringify(usersFile, null, 2), (error) => {
			if (error) {
				throw new Error(error.message);
			}
		});

		return user;
	} else {
		return new Error('Missing user information');
	}
};

const getUsers = () => {
	return usersFile;
};

const findUserById = (id) => {
	const foundUser = usersFile.users.find((u) => parseInt(u.id) === parseInt(id));
	if (foundUser && Object.keys(foundUser).length > 0) {
		const userWithoutPassword = {id: foundUser.id, username: foundUser.username, name: foundUser.name, favoriteGenre: foundUser.favoriteGenre};
		return userWithoutPassword;
	} else {
		return null;
	}
};

const findUserByUsername = (username) => {
	const foundUser = usersFile.users.find((u) => u.username === username);
	if (foundUser && Object.keys(foundUser).length > 0) {
		const userWithoutPassword = {id: foundUser.id, username: foundUser.username, name: foundUser.name, favoriteGenre: foundUser.favoriteGenre};
		return userWithoutPassword;
	} else {
		return null;
	}
};

const getNewId = () => {
	const id = Math.max(...usersFile.users.map((u) => parseInt(u.id))) + 1;
	return id;
};

const getNewPassword = async (password) => {
	try {
		const passwordhash = await bcrypt.hash(password, 12);
		return passwordhash;
	} catch (error) {
		throw new Error('ERROR! Sorry bcrypt melted on your password input... try again');
	}
};

module.exports = {createUser, getUsers, findUserById, findUserByUsername, getNewId, getNewPassword};
