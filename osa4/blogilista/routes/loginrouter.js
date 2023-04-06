//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const userController = require('../controllers/userController');
//const {setToken} = require('../middlewares/tokenextractor');
const {signUser} = require('../middlewares/tokenhandler');

//let jwtTokenSigned;

/*
const getJwtTokenSigned = () => {
  return jwtTokenSigned;
};
*/

loginRouter.post('/', async (request, response, next) => {
  const {username, password} = request.body;
  const user = await userController.findUserByName(username);

  if (user === null) {
    return response.status(400).json({error: `Username: ${username} was not found`});
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordhash);

  if (!isPasswordCorrect) {
    return response.status(401).json({error: `Password was incorrect`});
  }

  const jwtToken = signUser(user);
  return response.status(200).json({jwt: jwtToken, userid: user.userid, username: user.username, name: user.name});

  /*
  const token = {
    id: user.userid,
    username: user.username
  };

  const jwtToken = jwt.sign(token, process.env.SECRET, {expiresIn: '1h'});
  setToken(jwtToken);
  */

  //console.log('hello');
  //response.cookie('access_token', jwtToken).append('Authorization', jwtToken).status(200).end();
});

module.exports = loginRouter;