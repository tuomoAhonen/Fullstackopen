const Persons = require('../models/PersonsModel');

const InfoRouter = (app) => {
  app.get('/info', async (request, response, next) => {
    const countOfPersons = await Persons.PersonsGet().then(response => response.length).catch(e => next(e));
    const datetime = Date();
    if (countOfPersons && Number.isInteger(countOfPersons)) {
      return response.send(
        `<div>
            <p>Phonebook has information of ${countOfPersons} people.</p>
            <p>${datetime}</p>
          </div>`
      );
    } else {
      return response.send(
        `<div>
            Error: information not found.
          </div>`
      );
    }
  });
};

module.exports = InfoRouter;