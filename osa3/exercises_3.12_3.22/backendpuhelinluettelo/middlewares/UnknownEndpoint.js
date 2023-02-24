const UnknownEndpoint = (app) => {
  const unknownEndpoint = (request, response) => {
    return response.status(404).send(
      `
      <h1 style="text-align: center">Oops! Information not found.</h1>
      <img src="http://localhost:3001/static/images/404error.jpg" width="100%" height="100%" />
      `
    );
  };

  return app.use(unknownEndpoint);
};

module.exports = UnknownEndpoint;