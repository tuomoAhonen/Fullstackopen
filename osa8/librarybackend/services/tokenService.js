const jwt = require('jsonwebtoken');
const fs = require('fs');

const signToken = (userWithoutPassword) => {
	const token = jwt.sign({data: userWithoutPassword}, fs.readFileSync('private.key'), {expiresIn: '1h'});
	return token;
};

const verifyToken = (token) => {
	return jwt.verify(token, fs.readFileSync('private.key'), (error, decodedToken) => {
		if (error) {
			return null;
		}
		return decodedToken;
	});
};

const refreshToken = (token) => {
	const oldToken = verifyToken(token);
	if (oldToken && oldToken !== null) {
		const refreshedToken = jwt.sign({data: oldToken.data}, fs.readFileSync('private.key'), {expiresIn: 1000 /*'1h'*/});
		return refreshedToken;
	} else {
		return oldToken;
	}
};

module.exports = {signToken, verifyToken, refreshToken};
