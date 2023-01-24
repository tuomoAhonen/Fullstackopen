const Input = ({onchange, name, value}) => 
  <input onChange={onchange} id={name} name={name} value={value} />;

export default Input;