import { useState, useEffect } from 'react';
import personService from './services/personService';
import PersonsToShow from './components/PersonsToShow';
import Form from './components/Form';
import PersonFinder from './components/PersonFinder';

/* 
  In React and jsx `` are for concatenation and '' or "" are for strings.
  examples: 

    alert(`${newPerson.name} is already on the phonebook.`); <-- in this, we use ``-characters around the whole line,
    so we can join the variable, that is inside curly brackets with $-symbol and the plain text together. This is called concatenation.

    alert(newPerson.name+' is already on the phonebook.'); <-- here we use java-style to join variable with plus to string, which is inside ''-characters.
*/

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', phone: ''});
  const [editPerson, setEditPerson] = useState({name: '', phone: ''});
  const [string, setString] = useState('');
  const [clickedId, setClickedId] = useState();

  const dbhook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response);
      });
  };

  useEffect(dbhook, []);

  const inputChanged = (e) => {
    setNewPerson({...newPerson, [e.target.name]: e.target.value});
  };

  const stringChanged = (e) => {
    setString(e.target.value);
  };
  
  const addPerson = (e) => {
    e.preventDefault();
    let personFound;

    if (newPerson.name && newPerson.phone) {
      // eslint-disable-next-line
      if (personFound = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
        if (personFound.phone !== newPerson.phone) {
          if (window.confirm(`${newPerson.name} is already on the phonebook.\nDo you want to replace ${personFound.name}'s old number with the new one?`)) {
            //console.log(person);
            personService
              .updatePerson(personFound.id, newPerson);
            dbhook();
            setNewPerson({name: '', phone: ''});
          };
        } else {
          window.alert(`${newPerson.name} is already on the phonebook with matching information.`);
          setNewPerson({name: '', phone: ''});
        }
      // eslint-disable-next-line
      } else if (personFound = persons.find(person => person.phone === newPerson.phone)) {
        if (window.confirm(`${newPerson.phone} is already added to ${personFound.name}.\nDo you want to replace ${personFound.name}'s name with the new one?`)) {
          personService
            .updatePerson(personFound.id, newPerson);
          dbhook();
          setNewPerson({name: '', phone: ''});
        };
      } else {
        //console.log(newPerson);
        personService
          .createPerson(newPerson);
        dbhook();
        setNewPerson({name: '', phone: ''});
        /*setPersons([...persons, {name: newPerson.name, phone: newPerson.phone}]);
          setNewPerson({name: '', phone: ''});
        */
      };
    } else {
      window.alert('Name and phone number, please');
    };
  };

  const deletePerson = (id) => {
    //console.log('delete' , id);
    const personToDelete = persons.find(person => person.id === id);
    //console.log(personToDelete);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id);
      dbhook();
    }
  }

  const editRow = (id) => {
    setClickedId(id);
    let person = persons.find(person => person.id === id);
    setEditPerson({name: person.name, phone: person.phone});
  };

  const editInputChanged = (e) => {
    setEditPerson({...editPerson, [e.target.name]: e.target.value});
  };

  const saveEdit = () => {
    personService
      .updatePerson(clickedId, editPerson);
    dbhook();
    setEditPerson({name: '', phone: ''});
    setClickedId();
  };

  const undoEdit = () => {
    dbhook();
    setEditPerson({name: '', phone: ''});
    setClickedId();
  }

  /*
    Jatketaan personServicen muokkaamisesta.

    Tehdään puhelinluettelo listalle muokkaus nappi, josta painamalla rivi menee inputeiksi, 
    josta voi muokata sitä ja tallentamalla muutokset lähetetään personService:n kautta db.jsoniin.

    Lisäksi voidaan perua muokkaaminen. Poista nappi muuttuu muokkaus-tilassa peru napiksi?
  */

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onsubmit={addPerson} inputchanged={inputChanged} newperson={newPerson}>
        {/*
        Name: <Input onchange={inputChanged} name={'name'} value={newPerson.name} /><br />
        Phone number: <Input onchange={inputChanged} name={'phone'} value={newPerson.phone} /><br />
        <Button type={'submit'} text={'add'}/>
        */}
      </Form>
      <h1>Numbers</h1>
      <p>Click on name or phone number to edit row...</p>
      <PersonFinder stringchanged={stringChanged} string={string} />
      <PersonsToShow persons={persons} string={string} onclick={deletePerson} edit={editRow} undoedit={undoEdit} clickedid={clickedId} editperson={editPerson} editinputchanged={editInputChanged} saveedit={saveEdit} />
      {/* Tämä osuus omaksi komponentiksi
        string ?
        persons.filter(person => person.name.toLowerCase().includes(string.toLowerCase()))
        .map((person, index) => {
          return (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.phone}</td>
            </tr>
          )
        })
        :
        persons.map((person, index) => {
          return (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.phone}</td>
            </tr>
          )
        })
      */}  
    </div>
  );
};

export default App;