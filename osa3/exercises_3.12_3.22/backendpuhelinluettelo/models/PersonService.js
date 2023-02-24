const db = require('../database/Database');

/*
const Person = () => {
  id,
  name,
  phone
};

const PersonWithoutId = ({name, phone}) => {
  name,
  phone
}

const Id = ({id}) => {
  id
}
*/

const getPersons = async () => {
  return await db
    .any(`SELECT * FROM Persons`);
  /*
    .then(response => response)
    .catch(e => console.log(e, 'error on Person.js getPersons'));
    */
};

const addPersonToDatabase = async ({id, name, phone}) => {
  /*
  const persons = [];
  await db.any('SELECT * FROM Persons').then(personarray => personarray.forEach(person => persons.push(person))).catch(e => console.log(e, 'error on Person.js addPerson '));
  //console.log(persons);
  const generateId = () => persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 0;
  return await db.query(`INSERT INTO Persons (id, name, phone) VALUES(${generateId()}, '${Person.name}', '${Person.phone}')`);
  */
  return await db
    .query(`INSERT INTO Persons (id, name, phone) VALUES($1, $2, $3)`, [id, name, phone]);
  /*
    .then(response => console.log(response))
    .catch(e => console.log(e, 'error on Person.js addPerson'));
    */
};

const deletePersonFromDatabase = async (id) => {
  return await db
    .result(`DELETE FROM Persons WHERE id = $1`, id);
  /*
    .then(result => console.log(result))
    .catch(e => console.log(e, 'error on Person.js deletePerson'));
    */
};

module.exports = {getPersons, addPersonToDatabase, deletePersonFromDatabase};