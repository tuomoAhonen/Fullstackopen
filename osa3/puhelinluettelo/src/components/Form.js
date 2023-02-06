import Input from './Input';
import Button from './Button';

const Form = ({onsubmit, inputchanged, newperson}) => 
  <form onSubmit={onsubmit}>
    Name: <Input onchange={inputchanged} name={'name'} value={newperson.name} /><br />
    Phone number: <Input onchange={inputchanged} name={'phone'} value={newperson.phone} /><br />
    <Button type={'submit'} text={'add'}/>
  </form>

  export default Form;