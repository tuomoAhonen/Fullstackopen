const PersonsAll = ({persons}) => persons.map((person, index) => {
    return (
      <tr key={index}>
        <td>{person.name}</td>
        <td>{person.phone}</td>
      </tr>
    )
  });

export default PersonsAll;