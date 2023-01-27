import SearchFromArrayWithObjects from './SearchFromArrayWithObjects';
import Button from './Button';
import Input from './Input';

const PersonsFound = ({persons, string, onclick, edit, undoedit, clickedid, editperson, editinputchanged, saveedit}) => SearchFromArrayWithObjects(string, persons, "name")
  .map((person, index) => {
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
export default PersonsFound;