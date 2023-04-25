import {useState} from "react";
import PropTypes from 'prop-types';
//import './Blog.css'
//let blogCounter = 1;

/*
let allStates = [];

const allBlogStates = (getblogid, getbuttonValue, getisExtended) => {
  const blogState = {
    blogid: getblogid,
    buttonValue: getbuttonValue,
    isExtended: getisExtended
  };

  if (allStates.find(o => o.blogid === blogState.blogid)) {
    const modifiedAllStates = allStates.map(o => {
      if (o.blogid === blogState.blogid) {
        return blogState;
      } else {
        return o;
      }
    });
    allStates = modifiedAllStates;
  } else {
    allStates.push(blogState);
  }

  console.log(allStates);
  //return (<div>{allStates}</div>);
};
*/

const Blog = ({blog, handleLike, handleDelete, user}) => {
  const [buttonValue, setButtonValue] = useState('View');
  const [isExtended, setIsExtended] = useState('none');

  /*
  const handleDelete = async (blogid) => {
    console.log(blogid);

    try {
      const result = await blogService.deleteBlog(blogid);
      console.log(result);
      refreshBlogs();
      //return handleMessage(`Deleted blog ${{result.title}}`);
    } catch (error) {
      return console.log(error);
      //return handleErrors(error);
    }
  };
  */

  /*
  // eslint-disable-next-line
  const gridItem1 = {
    display: 'inline-block',
    width: '32%',
    marginRight: '5px',
    marginBottom: '5px',
    padding: '5px',
    backgroundColor: '#6495ED',
    borderRadius: '5px'
  };

  // eslint-disable-next-line
  const gridItem2 = {
    display: 'inline-block',
    width: '32%',
    marginRight: '5px',
    marginBottom: '5px',
    padding: '5px',
    backgroundColor: '#6495ED',
    borderRadius: '5px'
  };

  // eslint-disable-next-line
  const gridItem3 = {
    display: 'inline-block',
    width: '32%',
    marginLeft: '5px',
    marginBottom: '5px',
    padding: '5px',
    backgroundColor: '#6495ED',
    borderRadius: '5px'
  };
  */

  /*
  if (blogCounter === 4) {
    blogCounter = 1;
  }
  */

  //const styleName = `gridItem${blogCounter}`;

  //blogCounter++;

  const handleExtending = () => {
    if (buttonValue === 'View') {
      setButtonValue('Hide');
      setIsExtended('block');
      //allBlogStates(blog.blogid, 'hide', 'block');
    } else {
      setButtonValue('View');
      setIsExtended('none');
      //allBlogStates(blog.blogid, 'view', 'none');
    }
  };

  //const results = blog.whohasliked !== null ? blog.whohasliked.map(id => (id === user.userid)) : null;
  const results = blog.whohasliked !== null ? blog.whohasliked.includes(user.userid) : null;

  //toinen vaihtoehto on tallettaa käyttäjälle tykättyjen blogien blogid user-taulun 'userhasliked' array-kenttään.
  //periaatteessa voi olla suorituskyvyn kannalta parempi vaihtoehto? Blogilla voi olla usea tykkäys, mutta käyttäjä ei välttämättä ole tykänyt niin monesta.
  //mutta tämä voi mennä molempiin suuntiin. Esim. ne blogit josta on tykätty vähän tai ei ole tykätty ollenkaan tai ovat uusia blogeja, niin ne ovat nopeita käydä lävitse nykyisellä menetelmällä.
  //mieluiten tehtäisiin välitaulu many-to-many relaatiolla käyttäjän tykkäyksille ja blogin tykkäyksille.
  //tällä voitaisiin myös luoda käyttäjälle tykätyt blogit osio tiedostoon DisplayBlogs.js

  /*
  let result = false;

  if (results !== null) {
    result = results.includes(true);
  }
  */

  //console.log(result);

  return (
    <div className='Blog-area' /*className={styleName}*/ /*style={{styleName}}*/ style={{minHeight: 'fit-content', height: 'fit-content', padding: '5px', backgroundColor: '#6495ED', borderRadius: '5px'/*gridColumn: 'auto', display: 'inline-block', width: '32%', marginBottom: '5px', */}}>
      <div className="viewHideButton-area" style={{width:'10%', display: 'inline-block', float: 'right'}}><input className="viewHideButton" type="button" value={buttonValue} onClick={handleExtending} style={{float: 'right'}} /></div>
      <div style={{width:'90%', display: 'inline-block'}}><b className="blogTitle" style={{fontSize: '20px'}}>{blog.title}</b> by author <b style={{fontSize: '20px'}}>{blog.author}</b></div>
      <div style={{width:'100%', display: `${isExtended}`}}><a href={blog.url} style={{textDecoration: 'none', color: '#000000'}}>{blog.url}</a></div>
      <div className="likes-area" style={{width:'100%', display: `${isExtended}`}}>
        Likes: {blog.likes}
        {results === null ?
          <input className="likeButton" type="button" value='Like +1' onClick={() => handleLike({newlike: 1, wholiked: user.userid}, blog.blogid)} style={{marginLeft: '5px'}} />
          : results === false &&
          <input className="likeButton" type="button" value='Like +1' onClick={() => handleLike({newlike: 1, wholiked: user.userid}, blog.blogid)} style={{marginLeft: '5px'}} />
        }
      </div>
      { blog.createdbyuserid !== null ?
        <div style={{width:'100%', display: `${isExtended}`}}>
          { blog.createdbyuserid === user.userid &&
            <input className="deleteButton" type="button" value='Delete' onClick={() => handleDelete(blog.blogid)} style={{float: 'right'}} />
          }
          <p style={{float: 'left', margin: 0, padding: 0}}>Added by {blog.createdbyuser.name}</p>
        </div>
        :
        <div style={{width:'100%', display: `${isExtended}`}}>Added by Administrators</div>
      }
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
  user: PropTypes.object.isRequired
};

export default Blog;