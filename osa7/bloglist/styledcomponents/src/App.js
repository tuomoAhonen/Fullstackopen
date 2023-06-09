import React, {useState} from "react";
import {Routes, Route, Link, useMatch, useNavigate} from "react-router-dom";
import {useField} from "./hooks";
import styled from "styled-components";

const Page = styled.div`
  padding: 1em;
  background: #FFFACD;
`;

const Navigation = styled.div`
  padding: 1em;
  background: #2F4F4F;
`;

const Footer = styled.div`
  display: block;
  padding: 1em;
  margin-top: 2em;
  background: #8FBC8F;
  text-align: center; 
  vertical-align: middle;
`;

const Input = styled.input`
  margin: 0.25em;
  width: 15em;
  height: 1.5em;
`;

const Label = styled.label`
  margin: 0.25em;
`;

const ButtonSubmit = styled.button`
  background: #8FBC8F;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 1px solid #556B2F;
  border-radius: 5px;
`;

const ButtonReset = styled.button`
  background: #BDB76B;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.25em 1em;
  border: 1px solid #556B2F;
  border-radius: 5px;
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledLi = styled.li`
  padding: 0.25em;
  background: #8FBC8F;
  border-bottom: 1px solid #556B2F;
  :last-child {
    border-bottom: none;
  };
`;

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

const MenuComponent = ({anecdotes, addNew, setNotification, vote}) => {
  let match = useMatch('/:id');
  let anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      <Navigation>
        <StyledLinkWithHover linksToProperty={'/'} linkName={'Anecdotes'} />
        <StyledLinkWithHover linksToProperty={'/createnew'} linkName={'Create new'} />
        <StyledLinkWithHover linksToProperty={'/about'} linkName={'About'} />
      </Navigation>

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
        <div>
          <h2 style={{marginBottom: '5px'}}>Anecdotes</h2>
          <StyledUl>
            {anecdotes.map(anecdote => { 
                return (
                  <StyledLi key={anecdote.id}>
                    <Link style={{textDecoration: 'none', color: '#000000'}} to={`/${anecdote.id}`}>
                      {anecdote.content}
                    </Link>
                  </StyledLi>
                );
              })
            }
          </StyledUl>
        </div>
      </div>
    );
  } else {
    return (
      <div>Anecdotes not found...</div>
    );
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
      setNotification({message: 'Fill all of the fields', type: 'warning'});
      return setTimeout(() => {
        setNotification({message: '', type: ''});
      }, 5000);
    }
  };

  const inputStyle = {
    marginBottom: '5px'
  };

  return (
    <div>
      <h2 style={{marginBottom: '5px'}}>Create new Anecdote</h2>
      <form onSubmit={handleSubmit} style={{marginTop: '10px'}}>
        <div style={inputStyle}>
          <Label htmlFor='content'>Content</Label><br />
          <Input {...content} />
        </div>
        <div style={inputStyle}>
          <Label htmlFor='author'>Author</Label><br />
          <Input {...author} />
        </div>
        <div style={inputStyle}>
          <Label htmlFor='info'>Info</Label><br />
          <Input {...info} />
        </div>
        <div style={inputStyle}>
          <ButtonSubmit type='submit'>Submit</ButtonSubmit>
          <ButtonReset type='button' onClick={() => resetInputs()} style={{marginLeft: '5px'}}>Reset</ButtonReset>
        </div>
      </form>
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

const FooterComponent = () => {
  const aStyle = {
    textDecoration: 'none', 
    color: '#2F4F4F'
  };

  return (
    <Footer>
      Anecdote app for <a href='https://fullstackopen.com' style={aStyle}>https://fullstackopen.com</a><br />
      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js' style={aStyle}>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </Footer>
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
    anecdote.votes++;
    setAnecdotes(anecdotes.map(a => a.id === id ? anecdote : a));
  };

  return (
    <Page>
        <MenuComponent anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} vote={vote} />
        {notification.message 
          && <div style={{position: 'absolute', display: 'block', top: '10px', right: '10px'/*, backgroundColor: notification.type === 'success' ? '#ADFF2F' : '#F08080'*/}}>{notification.message}</div>
        }
        <FooterComponent />
    </Page>
  );
};

export default App;
