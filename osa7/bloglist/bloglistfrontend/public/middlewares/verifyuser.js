const jwt = require('jsonwebtoken');

const verifyUser = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = verifyUser;