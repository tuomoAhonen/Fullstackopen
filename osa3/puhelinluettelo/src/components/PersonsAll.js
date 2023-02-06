import Button from './Button';
import Input from './Input';

/* tarvitaan tuoda vielä editille toiminnot: inputchange, save, undo */

const PersonsAll = ({
  persons, 
  onclick, 
  edit, 
  undoedit, 
  clickedid, 
  editperson, 
  editinputchanged, 
  saveedit
}) => persons.map((person, index) => {
  if (clickedid) {
    if (person.id === clickedid) {
      return (
        <tr key={index}>
          <td><Input onchange={editinputchanged} name={'name'} value={editperson.name} /></td>
          <td><Input onchange={editinputchanged} name={'phone'} value={editperson.phone} /></td>
          <td><Button type={'button'} text={'save'} onclick={saveedit} /></td>
          <td><Button type={'button'} text={'undo'} onclick={undoedit} /></td>
          <td><Button type={'button'} text={'delete'} onclick={() => onclick(person.id)} /></td>
        </tr>
      )
    } else {
      return (
        <tr key={index}>
          <td onClick={() => edit(person.id)}>{person.name}</td>
          <td onClick={() => edit(person.id)}>{person.phone}</td>
        </tr>
      )
    }
  } else {
    return (
      <tr key={index}>
        <td onClick={() => edit(person.id)}>{person.name}</td>
        <td onClick={() => edit(person.id)}>{person.phone}</td>
        <td><Button type={'button'} text={'delete'} onclick={() => onclick(person.id)} /></td>
      </tr>
    )
  };
});

export default PersonsAll;