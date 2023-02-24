const dotenv = require('dotenv');
dotenv.config();
const pgp = require('pg-promise')();

const url = process.env.DBURLWITHPW;
const db = pgp(url);

const checkPassword = (password) => {
  if (password === process.env.DBPASSWORD) {
    return true;
  } else {
    return false;
  }
};

/*
const connection = () => {
  const url = process.env.DBURLWITHPW;
  const db = pgp(url);
  return db;
};
*/

const getPersons = async () => {
  //console.log(process.argv[2]);
  //const db = connection();
  console.log('Phonebook:');
  await db.any('SELECT * FROM Persons').then(personarray => personarray.forEach(person => console.log(`${person.id} ${person.name} ${person.phone}`))).catch(e => console.log(e)); /*.finally(db.$pool.end);*/
  pgp.end();
  //await db.any('SELECT * FROM Persons').then(personarray => personarray.forEach(person => console.log(`${person.id} ${person.name} ${person.phone}`))).catch(e => console.log(e));
};

const addPersonToDatabase = async (person) => {
  //const db = connection();
  const persons = [];
  await db.any('SELECT * FROM Persons').then(personarray => personarray.forEach(person => persons.push(person))).catch(e => console.log(e));
  //console.log(persons);
  const generateId = () => persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 0;
  const id = generateId();
  //console.log(id);
  await db.query(`INSERT INTO Persons (id, name, phone) VALUES(${id}, '${person.name}', '${person.phone}')`);
  pgp.end();
};

//console.log(process.argv.length);

if (process.argv.length === 3 && checkPassword(process.argv[2])) {
  getPersons();
} else if (process.argv.length === 5 && checkPassword(process.argv[2])) {
  let person = {name: '', phone: ''};

  process.argv.forEach((value, index) => {
    switch (index) {
      case 3:
        person.name=value;
        break;
      case 4:
        person.phone=value;
        break;
    }
    //console.log(`${value} ${index}`);
  });

  addPersonToDatabase(person);
  console.log(`Added ${person.name} with phone number: ${person.phone} to phonebook`);
} else {
  if (checkPassword(process.argv[2])) {
    console.log('Missing arguments or too many. Options:');
    console.log('node pgpromise.js password');
    console.log('node pgpromise.js password name phone_number');
  } else {
    console.log('Wrong password. Options:');
    console.log('node pgpromise.js password');
    console.log('node pgpromise.js password name phone_number');
  }
}

//db.any('SELECT * FROM Persons').then(personarray => personarray.forEach(person => console.log(person))).catch(e => console.log(e));