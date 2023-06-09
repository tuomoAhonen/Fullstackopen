import {useState} from "react";
import {Routes, Route, Link, useMatch, useNavigate} from "react-router-dom";
import {useField} from "./hooks";
import {Table, Form, InputGroup, Button, Alert, Navbar, Nav} from "react-bootstrap";

const StyledLinkWithHover = ({linksToProperty, linkName}) => {
  const linkStyle = {
    width: '100%',
    padding: '5px',
    marginRight: '5px',
    textAlign: 'justify',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    //color: '#000000',
    writeable: 'true'
  };

  const [hover, setHover] = useState({
    backgroundColor: '#8FBC8F',
    color: '#000000'
  });

  return (
    <Link 
      onMouseOver={() => setHover({backgroundColor: '#556B2F', color: '#ffffff'})} 
      onMouseLeave={() => setHover({backgroundColor: '#8FBC8F', color: '#000000'})} 
      style={{...linkStyle, ...hover}} 
      to={linksToProperty}
    >
      {linkName}
    </Link>
  );
};

const Menu = ({anecdotes, addNew, setNotification, vote}) => {
  let match = useMatch('/:id');
  let anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div style={{marginBottom: '10px'}}>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'/* style={{paddingLeft: '5px'}}*/>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="me-auto">
              <Nav.Item>
                <Nav.Link href='#' as='span'>
                  <StyledLinkWithHover linksToProperty={'/'} linkName={'Anecdotes'} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='#' as='span'>
                  <StyledLinkWithHover linksToProperty={'/createnew'} linkName={'Create new'} />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href='#' as='span'>
                  <StyledLinkWithHover linksToProperty={'/about'} linkName={'About'} />
                </Nav.Link>
              </Nav.Item>
              {/*
              <Nav.Link href='#' as='span'>
                <StyledLinkWithHover linksToProperty={'/'} linkName={'Anecdotes'} />
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <StyledLinkWithHover linksToProperty={'/createnew'} linkName={'Create new'} />
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <StyledLinkWithHover linksToProperty={'/about'} linkName={'About'} />
              </Nav.Link>
              */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path='/:id' element={<Anecdote anecdote={anecdote} vote={vote} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} /*vote={vote}*//>} />
          <Route path='/createnew' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
          <Route path='/about' element={<About />} />
        </Routes>
    </div>
  );
};

const AnecdoteList = ({anecdotes}) => {
  if (anecdotes) {
    return (
      <div>
        <h2 style={{marginBottom: '5px'}}>Anecdotes</h2>
        <Table striped>
          <tbody>
            {
              anecdotes.map(anecdote => 
                <tr key={anecdote.id}>
                  <td><Link style={{textDecoration: 'none', color: '#000000'}} to={`/${anecdote.id}`}>{anecdote.content}</Link></td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    );
  } else {
    return (
      <div>
        No anecdotes found...
      </div>
    )
  }
};

const Anecdote = ({anecdote, vote}) => {
  return (
    <div>
      <h2 style={{marginBottom: '5px'}}>{anecdote.content}</h2>
      Has been voted {anecdote.votes} times <input type='button' value='Vote' onClick={() => vote(anecdote.id)} />
    </div>
  );
};

const CreateNew = ({addNew, setNotification}) => {
  const navigate = useNavigate();

  const [content, resetContent] = useField('text', 'content');
  const [author, resetAuthor] = useField('text', 'author');
  const [info, resetInfo] = useField('url', 'info');

  const resetInputs = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.value && author.value && info.value) {
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      });

      setNotification({message: `Added new anecdote: ${content.value}`, type: 'success'});
      navigate('/');

      return setTimeout(() => {
        setNotification({message: '', type: ''});
      }, 5000);
    } else {
      setNotification({message: 'Fill all of the fields', type: 'danger'});
      return setTimeout(() => {
        setNotification({message: '', type: ''});
      }, 5000);
    }
  };

  return (
    <div>
      <h2 style={{marginBottom: '5px'}}>Create new anecdote</h2>
      <Form onSubmit={handleSubmit} style={{marginTop: '10px'}}>
        <Form.Group>
          <Form.Label htmlFor='content'>Content: </Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control {...content} />
          </InputGroup>
        
          <Form.Label htmlFor='author'>Author: </Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control {...author} />
          </InputGroup>

          <Form.Label htmlFor='info'>URL for more info: </Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control {...info} />
          </InputGroup>

          {/*<InputGroup className='mb-3'>*/}
            <Button type='submit' variant='primary'>Submit</Button>
            <Button type='button' variant='secondary' onClick={() => resetInputs()} style={{marginLeft: '5px'}}>Reset</Button>
          {/*</InputGroup>*/}
        </Form.Group>
      </Form>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h2 style={{marginBottom: '5px'}}>About anecdote app</h2>
      <p style={{margin: '10px 0px 10px 0px'}}>According to Wikipedia:</p>
      <em>
        An anecdote is a brief, revealing account of an individual person or incident.

        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke 
        laughter but to reveal a truth more general than the brief tale itself, such as to characterize a person by 
        delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through 
        the concrete details of a short narrative.

        An anecdote is "a story with a point".
      </em>
    </div>
  );
};

const Footer = () => {
  const aStyle = {
    textDecoration: 'none', 
    color: '#2F4F4F'
  };

  return (
    <div style={{display: 'block', padding: '5px', /*marginTop: '20px',*/ backgroundColor: '#8FBC8F', textAlign: 'center', verticalAlign: 'middle'}}>
      Anecdote app for <a href='https://fullstackopen.com' style={aStyle}>https://fullstackopen.com</a><br />
      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js' style={aStyle}>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 0
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 1
    }
  ]);

  //notificationille voisi periaatteessa tehdä customHookin
  const [notification, setNotification] = useState({message: '', type: ''});

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => {
    return anecdotes.find(a => a.id === id);
  };

  const vote = (id) => {
    let anecdote = anecdoteById(id);
    //console.log(anecdote);
    anecdote.votes++;
    setAnecdotes(anecdotes.map(a => a.id === id ? anecdote : a));
  };

  return (
    <div className='container' style={{paddingTop: '10px'}}>
      <Menu anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} vote={vote} />
      {notification.message
        && <Alert variant={notification.type} style={{position: 'absolute', display: 'block', top: '10px', right: '10px'}}>{notification.message}</Alert>
      }
      <Footer />
    </div>
  );
};

export default App;
