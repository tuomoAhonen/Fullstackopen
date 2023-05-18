const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const validator = (request, response, next) => {
  let anecdote;

  if (JSON.stringify(request.body) !== "{}") {
    anecdote = request.body;
    console.log(request.method);
    console.log(anecdote);
  }

  if (request.method === 'POST' && (!anecdote.content || anecdote.content.length < 5)) {
    return response.status(400).json({error: 'Too short anecdote, length must be 5 letters or more'});
  } else {
    next();
  }
};

server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(validator);
server.use(router);

server.listen(3001, () => {
  console.log('JSON server is running...');
});