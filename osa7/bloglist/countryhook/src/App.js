import React, {useState, useEffect} from 'react';
import {getCountry} from './services/CountryService';

//ohjelman alussa voitaisiin hakea kaikki maiden nimet ja verrata niihin haku-sanaa ja 
//jos se löytyisi maiden nimilistasta, niin se haettaisiin "tietokannasta"

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    value,
    onChange,
    reset
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    //console.log(name);
    (async () => {
      if (name && name !== null && name !== undefined) {
        try {
          //console.log('useCountry name: '+name);
          const result = await getCountry(name);
          console.log(result);
          return setCountry(result);
        } catch (error) {
          console.log(error);
          return setCountry('notfound');
        }
      } else {
        return setCountry(null);
      }
    })();
  }, [name]);

  //console.log(country);
  return country;
};

const Country = ({country}) => {
  //console.log(country);
  if (!country || country === undefined || country === null) {
    return null;
  }

  if (country === 'notfound') {
    return (
      <div>Country not found...</div>
    );
  }

  return (
    <div>
      <h3 style={{marginBottom: '5px'}}>{country.name.common}</h3>
      <div>Capital: {country.capital[0]}</div>
      <div>Population: {country.population}</div>
      <img src={country.flags.svg} height='100px' alt={country.flags.alt} style={{marginTop: '5px'}} />
    </div>
  );
};

const App = () => {
  const [name, setName] = useState('');
  const country = useCountry(name);
  const nameInput = useField('text');
  const resetValue = nameInput.reset;
  delete nameInput.reset;
  //console.log(nameInput);

  const fetch = (e) => {
    e.preventDefault();
    //console.log(nameInput);
    setName(nameInput.value);
    resetValue();
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <input type='submit' value='Find' />
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
