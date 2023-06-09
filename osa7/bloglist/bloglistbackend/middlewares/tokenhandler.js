const {infolog, errorlog} = require('../utils/loggers');
const {secret} = require('../utils/appconfig');
const jwt = require('jsonwebtoken');

let jwtToken;
//tästä voitaisiin tehdä oma taulu, jotta voitaisiin kirjautua eri laitteilla ja tallentaa siitä jokin tieto käyttäjälle,
//että missä taulun sarakkeessa on oikea token ja hakea sitä aina sen kautta
//lisäksi ehkä jokin tarkastus, että onko token enään voimassa, jotta se voitaisiin poistaa tj

const getToken = () => {
  return jwtToken;
};

const setToken = (token) => {
  jwtToken = token;
  return infolog(`Token set for duration of 1 hour: `, jwtToken);
}

const signUser = (user) => {
  const token = {
    id: user.userid,
    username: user.username
  };

  const jwtToken = jwt.sign(token, secret, {expiresIn: '1h'});
  setToken(jwtToken);
  return jwtToken;
};

const verifyUser = (token) => {
  return jwt.verify(token, secret);
  /*
  const result = jwt.verify(token, secret);
  infolog(result);
  return result;
  */
};

const tokenHandler = (request, response, next) => {
  //näistä pitäisi jotenkin saada jwtToken irti, halp
  //infolog(request);
  //infolog(request.headers);
  //infolog(request.headers.cookie)
  
  request['token'] = getToken();/*request.headers.cookie.slice(13)*/
  //infolog('request token: ', request.token);

  next();
};

module.exports = {getToken, setToken, signUser, verifyUser, tokenHandler};