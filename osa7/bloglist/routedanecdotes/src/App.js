import {useState} from "react";
import {/*BrowserRouter, */Routes, Route, Link, useMatch, useNavigate} from "react-router-dom";
import {useField} from "./hooks";

//Tätä styledlinkwithhover-komponenttia ei tarvita, jos käytetään css-tiedostoa, 
//joka importoitaisiin tänne app.js:ään tai vaihtoehtoisesti komponentin omaan tiedostoon. 
//Missä sitten on tyyleinä linkStyle ja linkStyle:hover Link-komponenteille
//Tämä vain komponentin tekemisen harjoittelua
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
  /*
  const linkStyle = {
    width: '100%',
    padding: '5px',
    marginRight: '5px',
    textAlign: 'justify',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000000',
    writeable: 'true'
  };

  const [hover1, setHover1] = useState({
    backgroundColor: '#8FBC8F'
  });

  const [hover2, setHover2] = useState({
    backgroundColor: '#8FBC8F'
  });

  const [hover3, setHover3] = useState({
    backgroundColor: '#8FBC8F'
  });
  */

  let match = useMatch('/:id');
  let anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null;

  return (
    <div>
      {/*<BrowserRouter>*/}
        <div>
          <StyledLinkWithHover linksToProperty={'/'} linkName={'Anecdotes'} />
          <StyledLinkWithHover linksToProperty={'/createnew'} linkName={'Create new'} />
          <StyledLinkWithHover linksToProperty={'/about'} linkName={'About'} />
          {/*
          <Link 
            onMouseOver={() => setHover1({backgroundColor: '#556B2F'})} 
            onMouseLeave={() => setHover1({backgroundColor: '#8FBC8F'})} 
            style={{...linkStyle, ...hover1}} 
            to='/'
          >Anecdotes</Link>
          <Link 
            onMouseOver={() => setHover2({backgroundColor: '#556B2F'})} 
            onMouseLeave={() => setHover2({backgroundColor: '#8FBC8F'})} 
            style={{...linkStyle, ...hover2}} 
            to='/createnew'
          >Create New</Link>
          <Link 
            onMouseOver={() => setHover3({backgroundColor: '#556B2F'})} 
            onMouseLeave={() => setHover3({backgroundColor: '#8FBC8F'})} 
            style={{...linkStyle, ...hover3}} 
            to='/about'
          >About</Link>
          */}
        </div>

        <Routes>
          <Route path='/:id' element={<Anecdote anecdote={anecdote} vote={vote} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} /*vote={vote}*//>} />
          <Route path='/createnew' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      {/*</BrowserRouter>*/}

      {/*
      <a href='#' style={linkStyle}>Anecdotes</a>
      <a href='#' style={linkStyle}>Create new</a>
      <a href='#' style={linkStyle}>About</a>
      */}
    </div>
  );
};

const AnecdoteList = ({anecdotes}) => {
  return (
    <div>
      <h2 style={{marginBottom: '5px'}}>Anecdotes</h2>
      <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
        {anecdotes 
        ? anecdotes.map(anecdote => { 
            return (<li style={{paddingTop: '5px', paddingBottom: '5px', paddingLeft: '0px', paddingRight: '0px'}} key={anecdote.id}>
              <Link style={{textDecoration: 'none', color: '#000000'}} to={`/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </li>);
          })
        : <li>No anecdotes found.</li>
        }
      </ul>
    </div>
  );
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
  /*
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');
  */

  const navigate = useNavigate();

  const content = useField('text', 'content');
  const author = useField('text', 'author');
  const info = useField('url', 'info');

  const contentReset = content.reset;
  const authorReset = author.reset;
  const infoReset = info.reset;

  delete content.reset;
  delete author.reset;
  delete info.reset;

  const resetInputs = () => {
    contentReset();
    authorReset();
    infoReset();
    /*
    content.reset();
    author.reset();
    info.reset();
    */
  };

  /*
  const resetInputs = () => {
    setContent('');
    setAuthor('');
    setInfo('');
  };
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.value && author.value && info.value) {
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      });

      setNotification(`Added new anecdote: ${content.value}`);
      //resetInputs();
      //console.log(content, author, info);
      navigate('/');

      return setTimeout(() => {
        setNotification('');
      }, 5000);
    } else {
      setNotification('Fill all of the fields');
      return setTimeout(() => {
        setNotification('');
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
          <label htmlFor='content'>Content:</label><br />
          <input {...content} />
          {/*<input type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)} /><br />*/}
        </div>
        <div style={inputStyle}>
          <label htmlFor='author'>Author:</label><br />
          <input {...author} />
          {/*<input type='text' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} /><br />*/}
        </div>
        <div style={inputStyle}>
          <label htmlFor='info'>URL for more info:</label><br />
          <input {...info} />
          {/*<input type='text' name='info' value={info} onChange={(e) => setInfo(e.target.value)} />*/}
        </div>
        <div style={inputStyle}>
          <input type='submit' value='Submit' />
          <input type='button' value='Reset' onClick={() => resetInputs()} style={{marginLeft: '5px'}} />
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

const Footer = () => {
  const aStyle = {
    textDecoration: 'none', 
    color: '#2F4F4F'
  };

  return (
    <div style={{display: 'block', padding: '5px', marginTop: '10px', backgroundColor: '#8FBC8F', textAlign: 'center', verticalAlign: 'middle'}}>
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

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    //console.log(anecdote);
    //randomised-id voidaan tarkistaa servicessä hakemalla tietokannasta get-lausekkeella where id=? eli löytyykö id:tä, sen lisäämisen yhteydessä tietokantaan
    //jos ei niin lisätään tietokantaan ja jos löytyy, niin tehdään uusi randomised-id ja tarkistus, mikä tarkoittaa myös sitä, että randomised-id siirrettävä servicen puolelle mieluiten
    //mikä on luultavasti melko nopea tapa tarkistaa id verrattuna siihen, että haetaan kaikki anecdotet tietokannasta ja verrataan sen jälkeen javascriptin avulla tuloksia?
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
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} vote={vote} />
      {notification 
        && <div style={{position: 'absolute', display: 'block', top: '10px', right: '10px'}}>{notification}</div>
        //: <div style={{display: 'none'}}></div>
      }
      {/*
      <AnecdoteList anecdotes={anecdotes} />
      <CreateNew addNew={addNew} />
      <About />
      */}
      <Footer />
    </div>
  );
};

export default App;
