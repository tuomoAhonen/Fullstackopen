const morgan = require('morgan');

const DataLogger = (app) => {
  morgan.token('requestbodydata', (request) => {
    return JSON.stringify(request.body);
  });

  //app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestbodydata'));
  return app.use(morgan((tokens, request, response) => {
    switch (request.method.toLocaleLowerCase()) {
      case 'post':
        return [
          tokens.method(request, response),
          tokens.url(request, response),
          tokens.status(request, response),
          tokens.res(request, response, 'content-length'),
          '-',
          tokens['response-time'](request, response),
          'ms',
          request.body ? tokens.requestbodydata(request) : ''
        ].join(' ');
      case 'get':
        return [
          tokens.method(request, response),
          tokens.url(request, response),
          tokens.status(request, response),
          tokens.res(request, response, 'content-length'),
          '-',
          tokens['response-time'](request, response),
          'ms'
        ].join(' ');
      case 'delete':
        return [
          tokens.method(request, response),
          tokens.url(request, response),
          tokens.status(request, response),
          '-',
          tokens['response-time'](request, response),
          'ms'
        ].join(' ');
      case 'put':
        return [
          tokens.method(request, response),
          tokens.url(request, response),
          tokens.status(request, response),
          tokens.res(request, response, 'content-length'),
          '-',
          tokens['response-time'](request, response),
          'ms',
          request.body ? tokens.requestbodydata(request) : ''
        ].join(' ');
    }
  }));
};

module.exports = DataLogger;