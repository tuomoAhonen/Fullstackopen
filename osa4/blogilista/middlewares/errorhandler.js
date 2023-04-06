const {infolog, errorlog} = require('../utils/loggers');
const unknownEndpoint = require('./unknownendpoint');

const errorHandler = (error, request, response, next) => {
  //errorlog(error.errors);
  if (error.errors && error.errors.length > 1) {
    let errors = [];
    let customError = {errors};
    let customErrorMsg = 'Errors: \n';
    error.errors.forEach(e => {
      customError.errors.push({type: e.type, message: e.message});
    });
    customError.errors.forEach((e, index)=> { 
      customErrorMsg += `${index+1}. ${e.type}: ${e.message} \n`;
    });
    errorlog(customError);
    return response.status(400).send(customErrorMsg);
  } else if (error.name) {
    // sequelizen omat validation errorit menevät tähän kohtaan
    //infolog('error name kohta');
    //tähän switch tokenin error hallinnalle: JsonWebTokenError & TokenExpiredError
    //defaultiksi tuo vanha alempi response
    errorlog(error.name+': '+error.message);
    switch(error.name) {
      case 'WrongUserError':
        return response.status(401).json(`Error: ${error.message}`);
      case 'JsonWebTokenError':
        return response.status(401).json(`Error: Token invalid or missing, ${error.message}`);
      case 'SequelizeUniqueConstraintError':
        return response.status(400).json(`Error: Title and url must be unique values / already exists on database, ${error.message}`);
      default: 
        return response.status(400).json(`Error: ${error.message}`);
    }
  } else if (error.message) {
    // tähän menevät errorit, jolla on messagena validation error
    //infolog('error message kohta');
    errorlog(error.message);
    switch(error.message) {
      case 'Validation error':
        return response.status(400).json(`Error: ${error.message}`);
      /*default:
        return response.status(418).json(`Error: ${error.message}`);
      */
    }
  } else if (response.status) {
    // tänne menevät kaikki muut errorit, joita ei ole vielä omiksi caseiksi tehty edellisessä kohdassa response statuksen mukaan
    switch(response.status) {
      case 400:
        return response.status(400).json(`Error: ${error.message}`);
      case 404:
        return unknownEndpoint();
      case 410:
        return response.status(410).json(`Error: ${error.message}`); 
      case 500:
        return response.status(500).json(`Error: ${error.message}`);
      default:
        return response.status(418).json(`Error: ${error.message}`);
    }
  }  

  next(error);
};

module.exports = errorHandler;