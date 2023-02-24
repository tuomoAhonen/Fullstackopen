const db = require('../database/Database');
const Error = require('./Error');

const Person = ({id, name, phone}) => {
  //console.log(id, name, phone, 'id person constissa');
  if (id, name, phone) {
    if (Number.isInteger(id)) {
      if (typeof name === "string" && typeof phone === "string") {
        const person = {id: id, name: name, phone: phone};
        //console.log(person);
        return person;
        //console.log(this.id, this.name, this.phone, '(id, name, phone inputs correct)');
      } else {
        return Error.ErrorSet('Error. wrong type of input. Name & phone must be strings.');
      }
    } else {
      return Error.ErrorSet('Error: wrong type of input. Id must be a number.');
    }
  } else {
    return Error.ErrorSet('Error: missing information. SOS!');
  }
};

const PersonIdOnly = (id) => {
  //console.log(id, 'id täällä');
  if (id && Number.isInteger(id) || id === 0) {
    return id;
  } else {
    return Error.ErrorSet('Error: id must be a number. SOS!');
  }
};

const addPerson = async ({id, name, phone}) => {
  const person = Person({id, name, phone});

  if (person && typeof person !== 'string') {
    //console.log('db hakuun');
    return await db
      .result(`INSERT INTO Persons (id, name, phone) VALUES($1, $2, $3)`, [person.id, person.name, person.phone]);
  } else {
    //console.log('erroriin inside');
    return Error.ErrorGet();
  }
};

const getPersonById = async (id) => {
  const personid = PersonIdOnly(id);
  //console.log(personid);
  if (Number.isInteger(personid)) {
    return await db
      .oneOrNone(`SELECT id, name, phone FROM Persons WHERE id = $1`, [personid]).then(object => {
        if (object !== null) {
          //console.log(object, 'object ei ollut null')
          return Person(object);
        } else {
          //console.log(object, 'object oli null')
          return object;
        }
      });
  } else {
    Error.ErrorSet('Error: id input must be a number!');
    return Error.ErrorGet();
  }
};

const getPersonByName = async (name) => {
  //console.log(personid);
  if (typeof name === 'string') {
    return await db
      .oneOrNone(`SELECT * FROM Persons WHERE LOWER(name) = LOWER($1)`, [name]).then(object => {
        if (object !== null) {
          //console.log(object);
          return Person(object);
        } else {
          //console.log(object, 'object oli null')
          return object;
        }
      });
  } else {
    Error.ErrorSet('Error: name input must be a string!');
    return Error.ErrorGet();
  }
};

const getPersonByPhone = async (phone) => {
  if (typeof phone === 'string') {
    return await db
      .oneOrNone(`SELECT * FROM Persons WHERE phone = $1`, [phone]).then(object => {
        if (object !== null) {
          //console.log(object, 'object ei ollut null')
          return Person(object);
        } else {
          //console.log(object, 'object oli null')
          return object;
        }
      });
  } else {
    Error.ErrorSet('Error: phone input must be a string!');
    return Error.ErrorGet();
  }
};

const deletePerson = async (id) => {
  const personid = PersonIdOnly(id);
  //console.log(personid);
  if (Number.isInteger(personid)) {
    return await db
      .result(`DELETE FROM Persons WHERE id = $1`, [personid]);
  } else {
    return Error.ErrorGet();
  }
};

const updatePerson = async ({id, name, phone}) => {
  const person = Person({id, name, phone});
  if (person) {
    return await db
      .result(`UPDATE Persons SET name = $2, phone = $3 WHERE id = $1`, [person.id, person.name, person.phone]);
  } else {
    return Error.ErrorGet();
  }
};

module.exports = {addPerson, getPersonById, getPersonByName, getPersonByPhone, deletePerson, updatePerson, Person};