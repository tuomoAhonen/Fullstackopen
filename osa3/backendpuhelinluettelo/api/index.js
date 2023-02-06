// api/index.js <--- Verceliin tarvittava polku, jotta express server toimii
// Listen port tiedot pitää poistaa index.js tiedostosta
// Tarvitaan myös index.js loppuun module.exports = app;
// Lisäksi on hyvä lisätä vercel.json tiedosto projektin juureen, joka sisältää konfiguraatiot.
// Huomioitavaa, tiedostot joita käytetään index.js:ssä ei saa olla projektin juuressaa,
// vaan ne tulee sijoittaa omiin kansioihin niin kuin index.js, jotta niitä voidaan käyttää/hakea

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(cors());

const all = require('./db.json');
const persons = [];
all.persons.map(person => persons.push({id: person.id, name: person.name, phone: person.phone}));

app.use('/static/images', express.static('./public/img'));
app.use(express.json());

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

app.get('/api/persons', (request, response) => {
  return response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
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
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  //console.log(persons.map((person, index) => person));
  //console.log(persons);
  if (persons.find(person => person.id === id)) {
    //console.log(persons.filter(person => person.id !== id));
    persons.splice(persons.findIndex(person => person.id === id), 1);
    return response.status(200).end();
  } else {
    return response.status(410).end();
  }
});

const generateId = () => persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 0;

app.post('/api/persons', (request, response) => {
  if (!persons.find(person => person.name.toLowerCase() === request.body.name.toLowerCase())) {
    if (request.body.name && request.body.phone) {
      const person = {id: generateId(), name: request.body.name, phone: request.body.phone};
      persons.push(person);
      return response.status(200).json(person);
    } else {
      if (!request.body.name) {
        return response.status(400).json({ 
          error: 'Missing name'
        })
      } else {
        return response.status(400).json({ 
          error: 'Missing phone number'
        })
      }
    }
  } else {
    return response.status(400).json({ 
      error: 'This name is already in the'
    })
  }
})

app.get('/info', (request, response) => {
  const countOfPersons = persons.length;
  const datetime = Date();
  response.send(
    `<div>
      <p>Phonebook has info of ${countOfPersons} people.</p>
      <p>${datetime}</p>
    </div>`
  );
});

//const port = process.env.port || 3001;
//app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;