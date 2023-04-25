import {useState} from "react";
import loginService from "../services/loginservice";
import PropTypes from 'prop-types';

const Login = ({login, handleMessage, handleErrorMessage}) => {

  //const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({username: username, password: password});
      //setUser(user);
      setUsername('');
      setPassword('');
      handleMessage('Login successful');
      return login(user);
    } catch (error) {
      console.log(error);
      return handleErrorMessage('Wrong user credentials, try again...');
      /*
      setTimeout(() => {
        setMessage(null);
      }, 1000);
      */
    }
  };

  return (
    <div style={{width: '300px', padding: '5px', paddingBottom: '8px', backgroundColor: '#5F9EA0', borderRadius: '5px'}}>
      <form id='loginForm' onSubmit={(e) => handleLogin(e)}>
        <label htmlFor="username" style={{width: '25%', marginLeft: '1%'}}>Username: </label>
        <input id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} type="text" style={{width: '70%', marginLeft: '1px', marginBottom: '5px'}} /><br />
        <label htmlFor="password" style={{width: '25%', marginLeft: '1%'}}>Password: </label>
        <input id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" style={{width: '70%', marginLeft: '4px', marginTop: '4px', marginBottom: '5px'}} /><br />
        <input id="submitLogin" /*type="button"*/ type="submit" value="Login" /*onClick={(e) => handleLogin(e)}*/ style={{width: '25%', marginRight: '1.6%', float: 'right'}} /><br />
        {/*{message !== null &&
          <p style={{marginLeft: '1%', paddingTop: '0px', marginTop: '4px', color: '#B22222'}}>{message}</p>
        }*/}
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired
};

export default Login;