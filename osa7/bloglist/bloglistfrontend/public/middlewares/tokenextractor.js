const {infolog, errorlog} = require('../utils/loggers');

let jwtToken;

const getToken = () => {
  return jwtToken;
};

const setToken = (token) => {
  jwtToken = token;
  return infolog(`Token set for duration of 1 hour: `, jwtToken);
}

module.exports = {getToken, setToken};