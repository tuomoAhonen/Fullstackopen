import { useState } from 'react';
import PersonsToShow from './Components/PersonsToShow';
import Form from './Components/Form';
import PersonFinder from './Components/PersonFinder';

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Essi Esimerkki', phone: '040 987 6543'},
    {name: 'Esa Esimerkki', phone: '040 123 4567'},
    {name: 'Arto Hellas', phone: '044 000 0001'},
    {name: 'Iiro Hellas', phone: '044 000 0002'},
    {name: 'Eero Hellas', phone: '044 000 0003'},
    {name: 'Pirjo Hellas', phone: '044 000 0004'},
    {name: 'Ada Lovelace', phone: '09 532 3523'},
    {name: 'Dan Abramov', phone: '050 123 4345'},
    {name: 'Mary Poppendieck', phone: '044 642 3122'}
  ]);
  const [newPerson, setNewPerson] = useState({name: '', phone: ''});
  const [string, setString] = useState('');

  const inputChanged = (e) => {
    setNewPerson({...newPerson, [e.target.name]: e.target.value});
  };

  const stringChanged = (e) => {
    setString(e.target.value);
  };
  
  const addPerson = (e) => {
    e.preventDefault();

    if (persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      alert(newPerson.name+' is already on the phonebook.');
    } else {
      setPersons([...persons, {name: newPerson.name, phone: newPerson.phone}]);
      setNewPerson({name: '', phone: ''});
    }
  };

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
      <PersonFinder stringchanged={stringChanged} string={string} />
        <table>
          <tbody>
            <PersonsToShow persons={persons} string={string}/>
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
          </tbody>
        </table>
    </div>
  );
};

export default App;