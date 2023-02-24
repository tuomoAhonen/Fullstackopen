const db = require('../database/Database');
const PersonModel = require('./PersonModel');

async function Persons() {
  const persons = PersonsGet();

  persons.then(response => {
    switch (true) {
      case response.length > 1:
        return response.sort((a, b) => a.name.localeCompare(b.name)).forEach(person => PersonModel.Person(person));
      case response.length === 1:
        return response.forEach(person => PersonModel.Person(person));
      default:
        return response;
    }
  });
  return persons;
}

async function PersonsGet() {
  return await db
    .any(`SELECT $1~, $2~, $3~ FROM Persons`, ['id', 'name', 'phone']);
}

async function PersonsSearch(name) {
  if (name) {
    return await db.any(`SELECT $1~, $2~, $3~ FROM Persons WHERE LOWER($2~) LIKE LOWER('%${name}%')`, ['id', 'name', 'phone']);
  } else {
    return Persons();
  }
}

module.exports = {Persons, PersonsGet, PersonsSearch, /*generatePersonId*/};