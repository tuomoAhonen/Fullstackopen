import {useState} from 'react';
import blogService from '../services/blogservice';
import PropTypes from 'prop-types';

const BlogCreateNew = ({user, updateBlogs, handleLogout, handleMessage, handleErrorMessage, handleErrors, isToggled, unToggle}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [userCredentials] = useState(user);
  //const [message, setMessage] = useState(null);

  const emptyInputs = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCredentials && (userCredentials !== 'null' || null)) {
      //console.log(userCredentials);
      const blog = {title: title, author: author, url: url, likes: 0, createdbyuserid: userCredentials.userid};
      //console.log(blog);
      try {
        const result = await blogService.postBlog(blog);
        console.log(result);
        emptyInputs();
        unToggle();
        handleMessage('Blog has been added to list');
        return updateBlogs();
        /*
          .then(blogs => updateBlogs(blogs))
          .catch(error => console.log(error));
          */
      } catch (error) {
        return handleErrors(error);
        /*
        if (error.response.data === 'Error: jwt expired') {
          emptyInputs();
          handleErrorMessage(`${error.response.data}. User credentials expired... please login`);
          return handleLogout();
        } else if (error.response.data) {
          handleErrorMessage(error.response.data);
        } else {
          console.log(error);
          //emptyInputs();
          return handleErrorMessage(error.message);
        }
        */
      }
    } else {
      handleErrorMessage('User credentials missing... please login');
      return handleLogout();
    }
  };

  return (
    <div style={{display: `${isToggled}`, height: '100px', width: '280px', padding: '5px', marginTop: '10px', backgroundColor: '#6495ED', borderRadius: '5px'}}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title" style={{width: '50px', float: 'left', marginBottom: '5px'}}>Title: </label>
        <input id="title" name="title" onChange={e => setTitle(e.target.value)} value={title} type="text" style={{width: '220px', float: 'right', marginBottom: '5px'}}/><br />

        <label htmlFor="author" style={{width: '50px', float: 'left', marginBottom: '5px'}}>Author: </label>
        <input id="author" name="author" onChange={e => setAuthor(e.target.value)} value={author} type="text" style={{width: '220px', float: 'right', marginBottom: '5px'}}/><br />

        <label htmlFor="url" style={{width: '50px', float: 'left', marginBottom: '5px'}}>Url: </label>
        <input id="url" name="url" onChange={e => setUrl(e.target.value)} value={url} type="url" style={{width: '220px', float: 'right', marginBottom: '5px'}}/><br />

        <input id="submitNewBlog" type="submit" value="Submit" style={{width: 'auto', float: 'right', marginLeft: '5px'}}/><input type="button" value="Cancel" onClick={() => unToggle()} style={{width: 'auto', float: 'right'}}/><br />
      </form>
      {/*{message !== null ?
        <div style={{display: 'block'}}>{message}</div>
        :
        <div style={{display: 'none'}}>{message}</div>
      }*/}
    </div>
  );
};

BlogCreateNew.propTypes = {
  user: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
  handleErrorMessage: PropTypes.func.isRequired,
  handleErrors: PropTypes.func,
  isToggled: PropTypes.string.isRequired,
  unToggle: PropTypes.func.isRequired
};

export default BlogCreateNew;