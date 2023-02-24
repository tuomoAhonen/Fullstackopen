import Input from './Input';
import Button from './Button';

const Form = ({onsubmit, inputchanged, newperson}) => 
  <form onSubmit={onsubmit}>
    Name: <Input onchange={inputchanged} name={'name'} value={newperson.name} /><br />
    Phone number: <Input onchange={inputchanged} name={'phone'} value={newperson.phone} /><br />
    <Button type={'submit'} text={'add'}/>
  </form>

export default Form;

/*
const Form = ({onsubmit, inputchanged, newperson}) => {
  const pattern = '[0-9]{2}-[0-9]{7}|[0-9]{3}-[0-9]{7}|[0-9]{2}-[0-9]{8}|[0-9]{3}-[0-9]{8}|[0-9]{2}-[0-9]{9}|[0-9]{3}-[0-9]{9}|[0-9]{2}-[0-9]{10}|[0-9]{3}-[0-9]{10}';
  return (<form onSubmit={onsubmit}>
    Name: <Input onchange={inputchanged} name={'name'} value={newperson.name} type={'text'} required={'yes'} /><br />
    Phone number: <Input onchange={inputchanged} name={'phone'} value={newperson.phone} type={'tel'} pattern={pattern} required={'yes'} /><br />
    <Button type={'submit'} text={'add'}/>
  </form>);
};
*/