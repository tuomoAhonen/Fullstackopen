const {infolog, errorlog} = require('../utils/loggers');

const requestLogger = (request, response, next) => {
  //infolog(request);
  infolog('Method: ', request.method);
  infolog('Path: ', request.path);
  if (Object.entries(request.body).length !== 0) {
    infolog('Body: ', request.body);
  }
  next();
};

module.exports = requestLogger;