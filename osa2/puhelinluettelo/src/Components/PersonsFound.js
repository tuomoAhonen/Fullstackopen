import SearchFromArrayWithObjects from './SearchFromArrayWithObjects';

const PersonsFound = ({persons, string}) => SearchFromArrayWithObjects(string, persons, "name")
  .map((person, index) => {
    return (
      <tr key={index}>
        <td>{person.name}</td>
        <td>{person.phone}</td>
      </tr>
    )
  });
export default PersonsFound;