const Input = ({onchange, name, value}) => 
  <input onChange={onchange} id={name} name={name} value={value} />;

export default Input;

/*
const Input = ({onchange, name, value, type, pattern, required}) => {
  //console.log(pattern);
  if (pattern) {
    if (required === 'yes') {
      return <input onChange={onchange} id={name} name={name} value={value} type={type} pattern={pattern} required />;
    } else {
      return <input onChange={onchange} id={name} name={name} value={value} type={type} pattern={pattern} />;
    };
  } else {
    if (required === 'yes') {
      return <input onChange={onchange} id={name} name={name} value={value} type={type} required />;
    } else {
      return <input onChange={onchange} id={name} name={name} value={value} type={type} />;
    };
  };
};
*/