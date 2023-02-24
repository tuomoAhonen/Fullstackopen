const Person = require('../models/PersonModel');
const Persons = require('../models/PersonsModel');
const phoneError = `Error: Area code must be between 2 to 3 digits and followed with dash. Main part of the phone number must be 5 to 10 digits. Correct examples: 09 123 23, 09 123 123, 09 123 4567, 044 123 4567, 040 1234 567 890, 040 1234 567 8900 etc...`;
const nameError = `Error: Name must be atleast 3 characters. Your input for the name was: `;

const Router = (app) => {
  const phoneValidation = (phone) => {
    switch(phone) {
      case phone.match(/^(\d{2,4})([\s]{1})(\d{3})([\s]{1})(\d{2,4})$/g).toString():
        return true;
      case phone.match(/^(\d{2,4})([\s]{1})(\d{3})([\s]{1})(\d{3})([\s]{1})(\d{1,4})$/g).toString():
        return true;
      default:
        return false;
    }
  };

  app.get('/api/persons', async (request, response, next) => {
    await Persons.Persons().then(persons => {
      return response.json(persons);
    }).catch(e => {
      return next(e);
    });
  });

  app.get('/api/persons/:id', async (request, response, next) => {
    const id = Number(request.params.id);

    await Person.getPersonById(id).then(result => {
      if (result && result !== null && typeof result === 'object' && Object.keys(result).length > 0) {
        return response.status(200).json(result);
      }  else {
        //console.log(result);
        return next(result);
      }
    }).catch(e => {
      //console.log(e);
      return next(e);
    });
  });

  app.delete('/api/persons/:id', async (request, response, next) => {
    const id = Number(request.params.id);
    await Person.deletePerson(id).then(result => {
      if (result.rowCount === 1) {
        return response.status(200).end();
      } else {
        return next(`Id: ${id} not found`);
      }
    }).catch(e => {
      return next(e);
    });
  });

  app.post('/api/persons', async (request, response, next) => {
    if (request.body.name.length > 2) {
      if (phoneValidation(request.body.phone)) {
        const foundPerson = await Person.getPersonByName(request.body.name).then(result => result).catch(e => next(e));
        const foundPerson2 = await Person.getPersonByPhone(request.body.phone).then(result => result).catch(e => next(e));
        if (foundPerson === null && foundPerson2 === null) {
          const idList = await Persons.PersonsGet().then(result => result.map(person => person.id)).catch(e => next(e));
          const generatedId = await Persons.PersonsGet().then(result => result.length > 0 ? Math.max(...idList) + 1 : 0).catch(e => next(e));
          const personToAdd = {id: generatedId, name: request.body.name, phone: request.body.phone};
          return await Person.addPerson(personToAdd).then(r => {
            console.log(`Command: ${r.command}, Result: ${r.rowCount} row inserted to DB`);
            return response.status(200).json(personToAdd);
          }).catch(e => next(e));
        } else {
          if (typeof foundPerson === 'string' && typeof foundPerson2 === 'string') {
            return next(`Error: Name & phone inputs must be strings!`);
          } else if (typeof foundPerson === 'string') {
            return next(foundPerson);
          } else if (typeof foundPerson2 === 'string') {
            return next(foundPerson2);
          } else {
            let error = '';
            if (typeof foundPerson === 'object' && foundPerson2 === null) {
              error = 'This name is already in your phonebook';
              return next(`${error}: ${foundPerson.name}, phone: ${foundPerson.phone}`);
            } else if (foundPerson === null && typeof foundPerson2 === 'object') {
              error = 'This phone is already in your phonebook';
              return next(`${error}: ${foundPerson2.name}, phone: ${foundPerson2.phone}`);
            } else {
              if (foundPerson.id === foundPerson2.id) {
                error = 'This person is already in your phonebook';
                return next(`${error}: ${foundPerson.name}, phone: ${foundPerson.phone}`);
              } else {
                error = 'Name & phone were already in your phonebook on different persons';
                return next(error);
              }
            }
          }
        }
      } else {
        return next(`${phoneError}`);
      }
    } else {
      return next(`${nameError}'${request.body.name}'`);
    }
  });

  app.put('/api/persons/:id', async (request, response, next) => {
    if (request.body.name.length > 2) {
      if (phoneValidation(request.body.phone)) {
        const id = Number(request.params.id);
        const foundPerson = await Person.getPersonByName(request.body.name).then(result => result).catch(e => next(e));
        const foundPerson2 = await Person.getPersonByPhone(request.body.phone).then(result => result).catch(e => next(e));
        const personFoundToUpdate = await Person.getPersonById(id).then(result => result).catch(e => next(e));
        if (foundPerson === null && foundPerson2 === null || foundPerson === null && foundPerson2.id === personFoundToUpdate.id || foundPerson.id === personFoundToUpdate.id && foundPerson2 === null) {
          if (personFoundToUpdate !== null) {
            const personToUpdate = {id: id, name: request.body.name, phone: request.body.phone};
            await Person.updatePerson(personToUpdate).then(r => {
              console.log(r);
              return response.status(200).json(personToUpdate);
            }).catch(e => next(e));
          } else {
            return next(`Error: Connection error or person was deleted from the database.`);
          }
        } else {
          return next(`Error: The input you gave is already on your phonebook on other person.`);
        }
      } else {
        return next(`${phoneError}`);
      }
    } else {
      return next(`${nameError}'${request.body.name}'`);
    }
  });

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

  app.get('/', (request, response) => {
    return response.send(
      `
      <div>
        <h1>Phonebook API</h1>
        <h2>Routes:<h2/>
        <p><a style="text-decoration: none; color: #000000" href="/info">/info</a></p>
        <p><a style="text-decoration: none; color: #000000" href="/api/persons">/api/persons</a></p>
        <p><a style="text-decoration: none; color: #000000" href="/api/persons/10">/api/persons/id</a></p>
      </div>
      `
    );
  });
};

module.exports = Router;