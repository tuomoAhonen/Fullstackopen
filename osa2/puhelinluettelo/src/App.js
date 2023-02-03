import { useState, useEffect } from 'react';
import personService from './services/personService';
import PersonsToShow from './components/PersonsToShow';
import Form from './components/Form';
import PersonFinder from './components/PersonFinder';
import Notification from './components/Notification';

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
  const [clickedId, setClickedId] = useState(null);
  const [message, setMessage] = useState(null);
  const [types] = useState({success: 'success', error: 'error'});

  const messageSetter = async (msg, msgtype) => {
    setMessage({msg, msgtype});
    setTimeout(() => {
      setMessage(null);
    }, 5000)
  }

  const dbhook = async () => {
    await personService
      .getAll()
      .then(response => setPersons(response))
      .catch(e => {
        return (
          messageSetter(`Couldn't reload/find database.\nCheck your browser's developer console for the error.`, types.error), 
          console.log(e)
        );
      });
      /* Very simple way to handle the error.
      .catch(e => messageSetter(`Couldn't reload/find database.\nError: ${e}`)); 
      */
  };

  useEffect(() => {
    dbhook();
    // eslint-disable-next-line
  }, [types]);
  
  const inputChanged = (e) => {
    setNewPerson({...newPerson, [e.target.name]: e.target.value});
  };

  const stringChanged = (e) => {
    setString(e.target.value);
  };
  
  const addPerson = async (e) => {
    e.preventDefault();
    let personFound;

    if (newPerson.name && newPerson.phone) {
      // eslint-disable-next-line
      if (personFound = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
        if (personFound.phone !== newPerson.phone) {
          if (window.confirm(`${newPerson.name} is already on the phonebook.\nDo you want to replace ${personFound.name}'s old number with the new one?`)) {
            //console.log(person);
            await personService
              .updatePerson(personFound.id, newPerson)
              .then(messageSetter(`${newPerson.name}'s phone number has been updated.`, types.success))
              .catch(e => {
                return (
                messageSetter(`There was error on updating the phone number.\nCheck your browser's developer console for the error.`, types.error),
                console.log(e)
                );
              });
            dbhook();
            setNewPerson({name: '', phone: ''});
          };
        } else {
          if (window.confirm(`${newPerson.name} is already on the phonebook with matching information.`)) {
            setNewPerson({name: '', phone: ''});
          }
        }
      // eslint-disable-next-line
      } else if (personFound = persons.find(person => person.phone === newPerson.phone)) {
        if (window.confirm(`${newPerson.phone} is already added to ${personFound.name}.\nDo you want to replace ${personFound.name}'s name with the new one?`)) {
          await personService
            .updatePerson(personFound.id, newPerson)
            .then(messageSetter(`${personFound.name}'s name has been changed to ${newPerson.name}.`, types.success))
            .catch(e => {
              return (
                messageSetter(`There was an error on updating the name.\nCheck your browser's developer console for the error.`, types.error),
                console.log(e)
              );
            });
          dbhook();
          setNewPerson({name: '', phone: ''});
        };
      } else {
        //console.log(newPerson);
        let allPersons = [null];
        await personService
          .getAll()
          .then(response => allPersons.splice(0, 1, response))
          .catch(e => { 
            return (
              messageSetter(`There was an error, try again.\nCheck your browser's developer console for the error.`, types.error),
              console.log(e)
            );
          });
        //console.log(allPersons);
        if (allPersons[0].find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
          if (window.confirm('The person was already addded to database.\nDo you want to check or edit it?')) {
            setString(newPerson.name);
          }
        } else {
          await personService
            .createPerson(newPerson)
            .then(messageSetter(`${newPerson.name} has been successfully added to your phonebook.`, types.success))
            .catch(e => {
              return (
                messageSetter(`There was an error, try again.\nCheck your browser's developer console for the error.`, types.error),
                console.log(e)
              );
            });
        }
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

  const deletePerson = async (id) => {
    //console.log('delete' , id);
    const personToDelete = persons.find(person => person.id === id);
    //console.log(personToDelete);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      await personService
        .deletePerson(id)
        .then(messageSetter(`${personToDelete.name} has been deleted.`, types.success))
        .catch(e => {
          return (
            messageSetter(`Couldn't find ${personToDelete.name} to delete from your phonebook,\nbecause it was already deleted by someone else.\nCheck your browser's developer console for the error.`, types.error), 
            console.log(e)
          )
        });
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

  const saveEdit = async () => {
    await personService
      .updatePerson(clickedId, editPerson)
      .then(messageSetter(`${editPerson.name}'s information has been changed.`, types.success))
      .catch(e => {
        return (
          messageSetter(`Couldn't save the changes you made, try again.\nCheck your browser's developer console for the error.`, types.error),
          console.log(e)
        );
      });
    dbhook();
    setEditPerson({name: '', phone: ''});
    setClickedId(null);
  };

  const undoEdit = () => {
    dbhook();
    setEditPerson({name: '', phone: ''});
    setClickedId(null);
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
      <PersonsToShow 
        persons={persons} 
        string={string} 
        onclick={deletePerson} 
        edit={editRow} 
        undoedit={undoEdit} 
        clickedid={clickedId} 
        editperson={editPerson} 
        editinputchanged={editInputChanged} 
        saveedit={saveEdit} 
      />
      <Notification message={message} />
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