const unknownEndpoint = require('../middlewares/UnknownEndpoint');

const errorHandler = (error, request, response, next) => {
  //console.log(error.status);
  //console.log(error);
  //console.log(typeof error === 'string');
  if (typeof error === 'string') {
    return response.status(400).json(error);
  } else {
    switch (error.status) {
      case 500:
        return response.status(500).json(error);
      case 410:
        return response.status(410).json(error);
      case 404:
        return unknownEndpoint();
      case 400:
        return response.status(400).json(error);
      default:
        return response.status(418).json(error);
    }
  }
  //next(error);
};

module.exports = errorHandler;