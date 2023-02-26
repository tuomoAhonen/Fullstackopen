const Index = (app) => {
  app.get('/', (request, response) => {
    return response.send(
      `
      <div>
        <h1>Phonebook API</h1>
        <h2>Routes:<h2/>
        <p><a style="text-decoration: none; color: #000000" href="/info">/info</a></p>
        <p><a style="text-decoration: none; color: #000000" href="/api/persons">/api/persons</a></p>
        <p><a style="text-decoration: none; color: #000000" href="/api/persons/6">/api/persons/id</a></p>
      </div>
      `
    );
  });
};

module.exports = Index;