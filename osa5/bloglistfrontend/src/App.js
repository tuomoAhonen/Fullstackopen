import {useState, useEffect} from "react";
import blogService from "./services/blogservice";
import Login from "./components/Login";
import DisplayBlogs from "./components/DisplayBlogs";
import BlogCreateNew from "./components/BlogCreateNew";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userCredentials, setUserCredentials] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFormToggled, setIsFormToggled] = useState('none');
  const [isButtonToggled, setIsButtonToggled] = useState('block');

  const toggleNewBlogForm = () => {
    setIsFormToggled('block');
    setIsButtonToggled('none');
  };

  const unToggleNewBlogForm = () => {
    setIsFormToggled('none');
    setIsButtonToggled('block');
  };

  const refreshBlogs = async () => {
    try {
      const results = await blogService.getAll();
      setBlogs(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshBlogs();
    /*
    (async () => {
      try {
        const results = await blogService.getAll();
        setBlogs(results);
      } catch (error) {
        console.log(error);
      }
    })();
    */
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loginInfo');
    //console.log(loggedUserJSON);
    if (loggedUserJSON && (loggedUserJSON !== 'null' || loggedUserJSON !== null)) {
      const user = JSON.parse(loggedUserJSON);
      //console.log(user);
      setUserCredentials(user);
    }
  }, []);

  /*
  const updateBlogs = (newBlogs) => {
    setBlogs(newBlogs);
  };
  */

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleErrorMessage = (msg) => {
    console.log(msg);
    setErrorMessage(msg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleLogin = (user) => {
    //console.log(user);
    setUserCredentials(user);

    window.localStorage.setItem(
      'loginInfo', JSON.stringify(user)
    );
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUserCredentials(null);

    if (isFormToggled === 'block') {
      unToggleNewBlogForm();
    }

    setMessage('Logout successful');
    setTimeout(() => {
      setMessage(null);
      //return window.location.replace('http://localhost:3000/');
    }, 5000);
  };

  const handleErrors = (error) => {
    console.log(error);
    if (error.response.data  === 'Error: jwt expired') {
      handleErrorMessage(`${error.response.data}. User credentials expired... please login`);
      return setTimeout(() => {
        setMessage(null);
        return handleLogout();
      }, 5000);
    } else if (error.response.data === 'Error: Token invalid or missing, jwt must be provided') {
      handleErrorMessage(`${error.response.data}. User credentials expired... please login`);
      return setTimeout(() => {
        setMessage(null);
        return handleLogout();
      }, 5000);
    } else if (error.response.data) {
      return handleErrorMessage(error.response.data);
    } else {
      return handleErrorMessage(error.message);
    }
  };

  const handleLike = async (likes, userid) => {
    try {
      const result = await blogService.editBlog(likes, userid);
      console.log(result);
      refreshBlogs();
      return handleMessage(`You have liked from ${result.title}`);
    } catch (error) {
      return handleErrors(error);
      /*
      console.log(error);
      if (error.response.data  === 'Error: jwt expired') {
        handleErrorMessage(`${error.response.data}. User credentials expired... please login`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        return handleLogout();
      } else if (error.response.data) {
        return handleErrorMessage(error.response.data);
      } else {
        return handleErrorMessage(error.message);
      }
      */
    }
  };

  const handleDelete = async (blogid) => {
    //console.log(blogid);
    try {
      const result = await blogService.deleteBlog(blogid);
      console.log(result);
      refreshBlogs();
      return handleMessage(result);
    } catch (error) {
      return handleErrors(error);
    }
  };

  return (
    <div>
      {message !== null ?
        <div id='message' style={{display: 'block', position: 'absolute', top: '1%', right: '1%', padding: '5px', backgroundColor: '#9ACD32'}}>{message}</div>
        : errorMessage !== null ?
          <div id='errorMessage' style={{display: 'block', position: 'absolute', top: '1%', right: '1%', padding: '5px', backgroundColor: '#B22222'}}>{errorMessage}</div>
          :
          <div style={{display: 'none'}}></div>
      }
      {userCredentials !== null ?
        <div id="blogs-area-all">
          <div style={{minHeight: '20px', width: 'auto', padding: '5px', backgroundColor: '#5F9EA0', borderRadius: '5px'}}><input id="toggleNewBlogForm" type="button" value='New Blog' onClick={() => toggleNewBlogForm()} style={{display: `${isButtonToggled}`, float: 'left'}} /><input id="logoutButton" type="button" onClick={() => handleLogout()} value="Logout" style={{float: 'right', marginLeft: '5px'}} /><p style={{float: 'right', margin: 0, padding: 0}}>Logged as <b style={{fontSize: '20px'}}>{userCredentials.username}</b></p></div>
          <BlogCreateNew user={userCredentials} updateBlogs={refreshBlogs} handleLogout={handleLogout} handleMessage={handleMessage} handleErrorMessage={handleErrorMessage} handleErrors={handleErrors} isToggled={isFormToggled} unToggle={unToggleNewBlogForm} />
          {/*<h2 style={{marginBottom: '5px', marginTop: '10px'}}>Blogs</h2>*/}
          <DisplayBlogs user={userCredentials} blogs={blogs} handleLike={handleLike} handleDelete={handleDelete} />
        </div>
        :
        <div>
          <Login login={handleLogin} handleMessage={handleMessage} handleErrorMessage={handleErrorMessage} />
        </div>
      }
    </div>
  );
};

export default App;