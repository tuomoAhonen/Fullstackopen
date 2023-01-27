import PersonsFound from './PersonsFound';
import PersonsAll from './PersonsAll';

const PersonsToShow = ({persons, string, onclick, edit, undoedit, clickedid, editinputchanged, saveedit, editperson}) => {
  /* Voidaan käyttää Search:ssa, jos halutaan käydä lävitse arrayn objektin kaikki propertiet
  const object = persons[0];
  console.log(Object.keys(object).length);
  */
  return (
    <>
    <table>
      <tbody>
        {
          string ?
          /* ilman search funktiota/komponenttia filtteröinti
          persons.filter(person => 
            person.name.toLowerCase().includes(string.toLowerCase()))
          */
          <PersonsFound persons={persons} string={string} onclick={onclick} edit={edit} undoedit={undoedit} clickedid={clickedid} editperson={editperson} editinputchanged={editinputchanged} saveedit={saveedit} />
          :
          <PersonsAll persons={persons} onclick={onclick} edit={edit} undoedit={undoedit} clickedid={clickedid} editperson={editperson} editinputchanged={editinputchanged} saveedit={saveedit} />
        }
      </tbody>
    </table>
    </>
  );
  
   /* 2 vaihtoehto
    SearchFromArrayWithObjects(string, persons, "name")
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
  );
  */
  
  /* 3 vaihtoehto
  if (string) {
    return (
      persons.filter(person => person.name.toLowerCase().includes(string.toLowerCase()))
        .map((person, index) => {
          return (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.phone}</td>
            </tr>
          )
        })
      )
  } else {
    return (
      persons.map((person, index) => {
        return (
          <tr key={index}>
            <td>{person.name}</td>
            <td>{person.phone}</td>
          </tr>
        )
      })
    )
  }
  */
};

export default PersonsToShow;