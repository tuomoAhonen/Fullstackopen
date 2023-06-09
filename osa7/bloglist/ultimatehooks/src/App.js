import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  /*
  return {
    type,
    value,
    onChange
  };
  */

  const mainVariables = {
    type, value, onChange
  };

  return [
    mainVariables,
    reset
  ];
};

const useResource = (baseurl) => {
  const [url/*, setUrl*/] = useState(baseurl);
  const [resources, setResources] = useState([]);

  
  const getAll = useCallback(() => {
    return (async () => {
      try {
        const result = await axios.get(url);
        return setResources(result.data);
      } catch (error) {
        return error;
      }
    })();
  }, [url]);

  useEffect(() => {
    /*
    (async () => {
      try {
        const result = await axios.get(url);
        return setResources(result.data);
      } catch (error) {
        return error;
      }
    })();
    */
    getAll();
  }, [/*url*/getAll]);

  /*
  const getAll = async () => {
    try {
      const result = await axios.get(url);
      return setResources(result.data);
    } catch (error) {
      return error;
    }
  };
  */

  const create = async (resource) => {
    const result = await axios.post(url, resource);
    getAll();
    return result.data;
  };

  const service = {
    create/*,
    getAll*/
  };

  return [
    resources,
    service
  ];
};

const App = () => {
  const [content, resetContent] = useField('text');
  const [name, resetName] = useField('text');
  const [phone, resetPhone] = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personsService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    //console.log(content.value);
    noteService.create({content: content.value});
    //noteService.getAll();
    resetContent();
  };

  const resetPerson = () => {
    resetName();
    resetPhone();
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    //console.log(name.value, phone.value);
    personsService.create({name: name.value, phone: phone.value});
    //personsService.getAll();
    resetPerson();
  };

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        Content: <input {...content} />
        <input type='submit' value='Submit' />
      </form>
      {notes 
      ? notes.map(note => <p key={note.id}>{note.content}</p>)
      : <p>Nothing to show...</p>
      }

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name: <input {...name} /><br />
        Phone: <input {...phone} />
        <input type='submit' value='Submit' />
      </form>
      {persons 
      ? persons.map(person => <p key={person.id}>{person.name} {person.phone}</p>)
      : <p>Nothing to show...</p>
      }
    </div>
  );
};

export default App;