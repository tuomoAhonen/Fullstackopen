let error = '';

const ErrorSet = (errormsg) => error = errormsg;

const ErrorGet = () => error;

module.exports = {ErrorSet, ErrorGet};

/*
const Error = () => {
  let error = '';

  const ErrorSet = (errormsg) => {
    //console.log(errormsg);
    error = errormsg;
  };

  const ErrorGet = () => {
    return error;
  };

  return ({ErrorSet, ErrorGet})
};

module.exports = Error;
*/