import {useState} from "react";

export const useField = (type, name) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type, 
    name,
    value, 
    onChange,
    reset
  };
};

//samaan hook-moduuliin voidaan tehdä useampi hook ja exporttaa ne 
//tai vaihtoehtoisesti tehdä ne erillisiin tiedostoihin