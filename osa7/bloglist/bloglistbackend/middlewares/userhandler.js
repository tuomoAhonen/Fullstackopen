const {infolog, errorlog} = require('../utils/loggers');
const {getToken, verifyUser} = require('./tokenhandler');
const {secret} = require('../utils/appconfig');
//const {findUserByNameWithoutHash} = require('../controllers/userController');

const jwt = require('jsonwebtoken');

let username;

const userHandler = async (request, response, next) => {
  //näistä pitäisi jotenkin saada jwtToken irti, halp
  //infolog(request);
  //infolog(request.headers);
  //infolog(request.headers.cookie)
  const token = getToken();
  //if token is missing, remove the user name
  jwt.verify(token, secret, (error) => {
    if (error) {
      username = '';
    }
  });

  if (request.body.username) {
    username = request.body.username;
    infolog('username set: ', username);
  } else if (username) {
    //const user = await findUserByNameWithoutHash(username);
    request['user'] = username;
    infolog('request.user set: ', request.user);
  } else {
    infolog('UserHandler: got nothing to set as user');
  }
  
  next();
};

module.exports = userHandler;