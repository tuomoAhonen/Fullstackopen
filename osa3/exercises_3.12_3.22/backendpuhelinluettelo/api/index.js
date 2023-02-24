const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());
app.use('/static/images', express.static('../public/img'));
app.use(express.json());
const Person = require('../models/PersonModel');
const Persons = require('../models/PersonsModel');

// api/index.js <--- Verceliin tarvittava polku, jotta express server toimii
// Listen port tiedot pitää poistaa index.js tiedostosta
// Tarvitaan myös index.js loppuun module.exports = app;
// Lisäksi on hyvä lisätä vercel.json tiedosto projektin juureen, joka sisältää konfiguraatiot.
// Huomioitavaa, tiedostot joita käytetään index.js:ssä ei saa olla projektin juuressaa,
// vaan ne tulee sijoittaa omiin kansioihin niin kuin index.js, jotta niitä voidaan käyttää/hakea

//Person.addPerson({id: 0, name: "Essi Esimerkki 6", phone: "010 111 222 006"});

/*
const dotenv = require('dotenv');
dotenv.config();

const pw = process.env.DBPASSWORD;

const pgp = require('pg-promise')();
const url = `postgres://admin:${pw}@dpg-cfgk7302i3mg6pdpjr8g-a.frankfurt-postgres.render.com/puhelinluettelodb?ssl=true`;
const db = pgp(url);
*/
/* testailua

db.query('CREATE TABLE Persons (id integer PRIMARY KEY, name VARCHAR (255) UNIQUE NOT NULL, phone VARCHAR (20) UNIQUE NOT NULL)');
db.query(`INSERT INTO Persons (id, name, phone) VALUES(25, 'Testaaja5', '010 010 1115')`);
*/

//Ekana tuotiin db.json:sta vanhat puhelinluettelo tiedot ja ne vietiin persons taulukkoon objekteina, jotta ne näkyisi front-endissä.
//Jonka jälkeen luotiin Postgres-tietokanta, jolle luotiin Persons-taulukko samoilla taulukon-tiedoilla kuin db.json
//Luotiin sinne muutamat esimerkki tiedot puhelinluettelo tiedoista
//Tämän jälkeen pähkäiltiin kuinka ne saadaan express serverille
//Jonka jälkeen insertoitiin forEach-loopilla vanhat tiedot(db.json) postgress-tietokantaan
//Nämä komennot jätetty kommentteina index.js tiedostoon, koska niitä voidaan käyttää myöhemmin
//Ja db.json jätetään projektiin, koska sieltä voidaan hakea tiedot aina uudelleen tietokantaan, jos ne poistetaan sieltä testailujen yhteydessä
//Toinen vaihtoehto olisi luoda backup-tiedot, mutta ne ovat maksullisia Render:in cloud-palvelussa

/*
const all = require('./db.json');
const persons = [];

// testailua
all.persons.map(person => persons.push({id: person.id, name: person.name, phone: person.phone}));
//db.any('SELECT * FROM Persons').then(person => persons.push(person));

const testingtesting = async () => {
  const comparelist = [];
  await db.any(`SELECT * FROM Persons`).then(r => r.forEach(person => comparelist.push(person)));
  //console.log(comparelist);
  persons.forEach(person => {
    //console.log(person);
    const check = [];
    comparelist.forEach(object => {
      if (object.id === person.id || object.name === person.name || object.phone === person.phone) {
        check.push('yes');
      }
    });

    if (!check.find(e => e === 'yes')) {
      db.any(`INSERT INTO Persons (id, name, phone) VALUES(${Number(person.id)}, '${person.name}', '${person.phone}')`);
    }
  });
}

//testingtesting();
*/
/*
const getPersons = async () => {
  await db.any('SELECT * FROM Persons').then(personarray => personarray.forEach(person => persons.push(person))).catch(e => console.log(e));
  console.log(persons);
};
getPersons();
*/

//db.any('SELECT * FROM Persons').then(personarray => personarray.forEach(person => persons.push(person))).catch(e => console.log(e));
//pgp.end();

// model styling

//const persons = [];

/* VAIHA PSQL DATABASE GENEROIMAAN id SERIAL-tyypillä Persons-taululle,
  koska silloin ei voi tulla virheitä id:n generoimisessa,
  kun se tapahtuu databasen puolella.

  Esimerkiksi tällä hetkellä id:n generoinnissa käyttöliittymän
  puolella on pieni viive eli jos tehdään samaan aikaan monta nimeä,
  niin se voi antaa erroria, kun tekee kaikille saman id:n, eikä lisää
  tietoa databaseen sen takia.

  Id:n generointi käyttöliittyymän puolella on ok, jos database/käyttöliittymä
  on vain yhdelle käytttäjälle. Eli Personal.
*/
/*
const getAllPersonsToApi = async () => {
  //persons.splice(0, persons.length);
  await Persons.Persons().then(response => response.forEach(person => persons.push(person))).catch(e => console.log(e, 'error on index.js PersonsAll'));
};

if (persons.length === 0) {
  getAllPersonsToApi();
};
*/

/*
const findPersonByPhone = async (phone) => {
  return await Person.getPersonByPhone(phone).then(r => r).catch(e => console.log(e));
};
*/

/*
const generateId = async () => {
  return await Persons.generatePersonId().then(r => r).catch(e => console.log(e));
};
*/

//Person.addPerson({id: 3, name: 'Malli Henkilö 3', phone: '0100 100 0003'}).then(result => console.log(result)).catch(e => console.log(e.detail, e.query, 'error on index.js addPerson'));
//Person.deletePerson(1021).then(result => console.log(result)).catch(e => console.log(e, 'error on index.js deletePerson'));
//Person.getPerson(1021).then(r => console.log(r)).catch(e => console.log(e));

//const addPerson = new Person({id: '1006', name: 'Malli Henkilö 8', phone: '0100 100 1018'});
//addPerson.addPerson().then(result => console.log(result)).catch(e => console.log(e.detail, e.query, 'error on index.js addPerson'));

/*
const testingModels = async () => {
  //const addPerson = new Person({id: 1008, name: 'Malli Henkilö 8', phone: '0100 100 1018'});
  //await addPerson.addPerson().then(result => console.log(result)).catch(e => console.log(e.detail, e.query, 'error on index.js addPerson'));
  //const deletePerson = new Person({id: 1008});
  //await deletePerson.deletePerson().then(result => console.log(result)).catch(e => console.log(e, 'error on index.js deletePerson'));

  await Persons.PersonsGet().then(response => response.sort((a, b) => a.id - b.id).forEach(person => persons.push(person))).catch(e => console.log(e, 'error on index.js getPersons'));
  //await Persons.PersonsSearch('potamus').then(response => { persons.splice(0, persons.length), response.forEach(person => persons.push(person)) }).catch(e => console.log(e));
  //getPersons.getPersons().then(response => response.sort((a, b) => a.id - b.id).forEach(person => persons.push(person))).catch(e => console.log(e, 'error on index.js getPersons'));
};
testingModels();
*/

/* service styling
//const Person = require('./models/PersonService');

const testingService = async () => {
  //await Person.addPersonToDatabase({id: 1000, name: 'Testi1000', phone: '0100 100 1000'}).then(person => console.log(person)).catch(e => console.log(e, 'error on index.js addPerson'));
  //await Person.deletePersonFromDatabase(39).then(result => console.log(result)).catch(e => console.log(e, 'error on index.js deletePerson'));
  //await Person.getPersons().then(response => response.sort((a, b) => a.id - b.id).forEach(person => console.log(person))).catch(e => console.log(e, 'error on index.js getPersons'));
  await Person.getPersons().then(response => response.sort((a, b) => a.id - b.id).forEach(person => persons.push(person))).catch(e => console.log(e, 'error on index.js getPersons'));
}
testingService();

//Person.addPersonToDatabase({name: 'Karina', phone: '010 10101010104'}).then(response => console.log(response)).catch(e => console.log(e));
*/

morgan.token('requestbodydata', (request) => {
  return JSON.stringify(request.body);
});

//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestbodydata'));
app.use(morgan((tokens, request, response) => {
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

    /*
    case 'put':
      break;
    */
  }
}));

app.get('/api/persons', (request, response, next) => {
  return (
    (async () => {
      //persons.splice(0, persons.length);
      await Persons.Persons().then(persons => {
        //console.log(persons);
        return response.json(persons);
      }).catch(e => {
        //console.log(e, 'error on index.js PersonsAll');
        return next(e);
      });
    })()
  );
  //return response.json(persons);
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id);

  Person.getPersonById(id).then(result => {
    //console.log(result);
    if (result && result !== null && typeof result === 'object' && Object.keys(result).length > 0) {
      console.log();
      return response.status(200).json(result);
    } else {
      return next(result);
    }
  }).catch(e => {
    return next(e);
    //return response.status(500).end();
  });

  /*
  const person = persons.find(person => person.id === id);
  if (person) {
    return response.status(200).json(person);
  } else {
    return response.status(404).send(
      `
      <h1 style="text-align: center">Oops! Person not found.</h1>
      <img src="http://localhost:3001/static/images/404error.jpg" width="100%" height="100%" />
      `
    );
  }
  */
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id);
  //console.log(persons.map((person, index) => person));
  //console.log(persons);
  //console.log(id, 'id saatiin');
  (async () => {
    //console.log(id, 'id asyncin sisällä');
    await Person.deletePerson(id).then(result => {
      if (result.rowCount === 1) {
        //console.log('poistettiin');
        //console.log(result);
        //getAllPersonsToApi();
        //persons.splice(persons.findIndex(person => person.id === id), 1);
        return response.status(200).end();
      } else {
        return next(result);
        //console.log('ei poistettu');
        //console.log(result);
        //return response.status(410).end();
      }
    }).catch(e => {
      //console.log(e);
      //return response.status(500).end();
      return next(e);
    });
    //console.log(person);
  })();

  /*
  if (persons.find(person => person.id === id)) {
    //console.log(persons.filter(person => person.id !== id));
    persons.splice(persons.findIndex(person => person.id === id), 1);
    return response.json();
  } else {
    return response.status(410).end();
  };
  */

  /*
  const id = Number(request.params.id);
  //console.log(persons.map((person, index) => person));
  //console.log(persons);
  if (persons.find(person => person.id === id)) {
    //console.log(persons.filter(person => person.id !== id));
    persons.splice(persons.findIndex(person => person.id === id), 1);
    return response.status(200).end();
  } else {
    return response.status(410).end();
  };
  */
});

//const generateId = () => persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 0;

const phoneValidation = (phone) => {
  console.log(phone);
  if (phone.match(/^(\d{2,3})([-]{1})(\d{5,12})$/g)) {
    //console.log('tosi');
    return true;
  } else {
    //console.log('epätosi');
    return false;
  }
};

app.post('/api/persons', (request, response, next) => {
  if (phoneValidation(request.body.phone)) {
    if (request.body.name.length > 2) {
      (async () => {
        const foundPerson = await Person.getPersonByName(request.body.name).then(result => result).catch(e => next(e));
        const foundPerson2 = await Person.getPersonByPhone(request.body.phone).then(result => result).catch(e => next(e));
        //console.log(foundPerson, foundPerson2, 'foundpersonit');
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
      })();
    } else {
      return next(`Error: Name must be atleast 3 characters. Your input for the name was: '${request.body.name}'`);
    }
  } else {
    return next(`Error: Area code must be between 2 to 3 digits and followed with dash. 
    Main part of the phone number must be 5 to 12 digits. 
    Correct examples: 09-1234567, 044-1234567, 040-1234567890, etc...`);
  }
});

/*
  (async () => {
    await Person.getPersonByName(request.body.name).then(result => {
      if (result === null) {
        if (request.body.name && request.body.phone) {
          (async () => {
            await Persons.PersonsGet().then(result => {
              const idList = result.map(person => person.id);
              const generatedId = result.length > 0 ? Math.max(...idList) + 1 : 0;
              const person = {id: generatedId, name: request.body.name, phone: request.body.phone};
              (async () => {
                await Person.addPerson(person).then(r => {
                  console.log(`Command: ${r.command}, Result: ${r.rowCount} row inserted to DB`);
                  return response.status(200).json(person);
                }).catch(e => next(e));
              })();

            }).catch(e => next(e));
          })();
        } else {
          switch(true) {
            case !request.body.name && !request.body.phone:
              return next('Error: Missing name & phone number');
              //return response.status(400).json({
                //error: 'Missing name & phone number'
              //});
            case !request.body.name:
              return next('Error: Missing name');
              //return response.status(400).json({
                //error: 'Missing name'
              //});
            case !request.body.phone:
              return next('Error: Missing phone number');
              //return response.status(400).json({
                //error: 'Missing phone number'
              //});
            default:
              return next('Unknown error');
              //return response.status(400).json({
                //error: 'Uknown error'
              //});
          };
        };
      } else if (typeof result === 'string') {
        next(result);
        //return response.status(400).json({
          //error: result
        //});
      } else {
        next('This name is already in the phonebook');
        //return response.status(400).json({
          //error: 'This name is already in the phonebook'
        //});
      }
    }).catch(e => {
      next(e);
      //console.log(e);
      //return response.status(500).end();
    });
  })();
  */

/*
    const person = await findPersonByName(request.body.name);
    if (person === null) {
      if (request.body.name && request.body.phone) {
        let generatedId = generateId();
        //console.log(generatedId);

        const person = {id: generatedId, name: request.body.name, phone: request.body.phone};
        //console.log(person);

        //persons.push(person);
        pushPersonToDatabase(person);

        return response.status(200).json(person);
      } else {
        if (!request.body.name) {
          return response.status(400).json({
            error: 'Missing name'
          });
        } else {
          return response.status(400).json({
            error: 'Missing phone number'
          });
        }
      };
    } else {
      return response.status(400).json({
        error: 'This name is already in the phonebook'
      });
    }
    */

/*
  if (request.body.name && request.body.phone) {
    let generatedId = generateId();
    console.log(generatedId);

    const person = {id: generatedId, name: request.body.name, phone: request.body.phone};
    console.log(person);

    persons.push(person);
    pushPersonToDatabase(person);

    return response.status(200).json(person);
  } else {
    if (!request.body.name) {
      return response.status(400).json({
        error: 'Missing name'
      });
    } else {
      return response.status(400).json({
        error: 'Missing phone number'
      });
    };
  };
  */

app.put('/api/persons/:id', (request, response, next) => {
  //console.log(response);
  //console.log(request.params.id);
  if (request.body.name.length > 2) {
    (async () => {
      const id = Number(request.params.id);
      const foundPerson = await Person.getPersonByName(request.body.name).then(result => result).catch(e => next(e));
      const foundPerson2 = await Person.getPersonByPhone(request.body.phone).then(result => result).catch(e => next(e));
      const personFoundToUpdate = await Person.getPersonById(id).then(result => result).catch(e => next(e));
      //console.log(personFound);
      if (foundPerson === null && foundPerson2 === null || foundPerson === null && foundPerson2.id === personFoundToUpdate.id || foundPerson.id === personFoundToUpdate.id && foundPerson2 === null) {
        if (personFoundToUpdate !== null) {
          const personToUpdate = {id: id, name: request.body.name, phone: request.body.phone};
          //console.log(personFound);
          await Person.updatePerson(personToUpdate).then(r => {
            console.log(r);
            return response.status(200).json(personToUpdate);
          }).catch(e => next(e));
        } else {
          return next(`Error: Connection error with database and client or person was deleted from the database.`);
        }
      } else {
        return next(`Error: The input you gave is already on your phonebook on other person.`);
      }
    })();
  } else {
    return next(`Error: Name must be atleast 3 characters. Your input for the name was: '${request.body.name}'`);
  }
});

app.get('/info', (request, response) => {
  (async () => {
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
  })();
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

const unknownEndpoint = (request, response) => {
  //console.log(error)
  //console.log('tänne meni');
  return response.status(404).send(
    `
    <h1 style="text-align: center">Oops! Information not found.</h1>
    <img src="http://localhost:3001/static/images/404error.jpg" width="100%" height="100%" />
    `
  );
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response) => {
  //console.log(error.status);
  console.log(error);
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

app.use(errorHandler);

/*
const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
*/

module.exports = app;