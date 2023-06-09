import React, {useState} from "react";
import {Routes, Route, Link, useMatch, useNavigate} from "react-router-dom";
import {useField} from "./hooks";
import {
  Container, TableContainer, Table, 
  TableBody, TableRow, TableCell, Paper, 
  TextField, Button, Alert, AppBar, Toolbar, 
  createTheme, ThemeProvider, MenuItem, Menu, 
  Box, IconButton
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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

const customTheme = createTheme({
  palette: {
    customDarkSlateGrey: {
      main: '#2F4F4F'
    },
    customDarkKhaki: {
      main: '#BDB76B'
    },
    customDarkSeaGreen: {
      main: '#8FBC8F'
    },
    customDarkSalmon: {
      main: '#E9967A'
    }
  },
  customPaper: {
    backgroundColor: '#2F4F4F'
  }
});

const MenuComponent = ({anecdotes, addNew, setNotification, vote}) => {
  let match = useMatch('/:id');
  let anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null;

  //const [anchorElNav, setAnchorElNav] = useState(null);
  const [menuState, setMenuState] = useState(false);

  //vaihtoehtoisesti voitaisiin ankkuroida menu suoraan nappiin ilman arvojen vaihtumista ja 
  //laittaa vaihtumaan Menun atribuutin open:in arvo vaihtumaan useStatessa tai 
  //Menun tyylissä display: 'block' ja 'none' vaihtoehtojen välillä?
  /*
  const handleOpenNavMenu = (e) => {
    //console.log(e.currentTarget);
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  */

  const handleOpenNavMenu = () => {
    //console.log(e.currentTarget);
    setMenuState(true);
  };

  const handleCloseNavMenu = () => {
    setMenuState(false);
  };

  return (
    <div>
        <AppBar position='static' color='customDarkSlateGrey'>
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                id='menuIconButton'
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon color="inherit" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={document.getElementById('menuIconButton') || null}
                //anchorEl={anchorElNav}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                open={menuState}
                //open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                  //backgroundColor: '#2F4F4F', <-- tämä, jos halutaan, että koko ruudun tausta vaihtuu ja ei näy muuta kuin alastulo-valikko
                  //pelkästään alastulo-valikon backgroundcolorin saa vaihtamalla käyttämällä classnamea: .MuiMenu-paper
                  '.MuiMenu-paper': {backgroundColor: '#2F4F4F'}
                }}
              >
              {/*
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                keepMounted
                transformOrigin={{vertical: 'top', horizontal: 'left'}}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                  //backgroundColor: '#2F4F4F', <-- tämä, jos halutaan, että koko ruudun tausta vaihtuu ja ei näy muuta kuin alastulo-valikko
                  //pelkästään alastulo-valikon backgroundcolorin saa vaihtamalla käyttämällä classnamea: .MuiMenu-paper
                  '.MuiMenu-paper': {backgroundColor: '#2F4F4F'}
                }}
              >
              */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <StyledLinkWithHover linksToProperty={'/'} linkName={'Anecdotes'} />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <StyledLinkWithHover linksToProperty={'/createnew'} linkName={'Create new'} />
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <StyledLinkWithHover linksToProperty={'/about'} linkName={'About'} />
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex' }}}>
              <Button>
                <StyledLinkWithHover linksToProperty={'/'} linkName={'Anecdotes'} />
              </Button>
              <Button>
                <StyledLinkWithHover linksToProperty={'/createnew'} linkName={'Create new'} />
              </Button>
              <Button>
                <StyledLinkWithHover linksToProperty={'/about'} linkName={'About'} />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

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
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {anecdotes.map(anecdote => 
              <TableRow key={anecdote.id}>
                <TableCell>
                  <Link style={{textDecoration: 'none', color: '#000000'}} to={`/${anecdote.id}`}>
                    {anecdote.content}
                  </Link>
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/*
        <div>
          <h2 style={{marginBottom: '5px'}}>Anecdotes</h2>
          <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
            {anecdotes.map(anecdote => { 
                return (<li style={{paddingTop: '5px', paddingBottom: '5px', paddingLeft: '0px', paddingRight: '0px'}} key={anecdote.id}>
                  <Link style={{textDecoration: 'none', color: '#000000'}} to={`/${anecdote.id}`}>
                    {anecdote.content}
                  </Link>
                </li>);
              })
            }
          </ul>
        </div>
        */}
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
          <TextField label='Content' {...content} />
        </div>
        <div style={inputStyle}>
          <TextField label='Author' {...author} />
        </div>
        <div style={inputStyle}>
          <TextField label='Info' {...info} />
        </div>
        <div style={inputStyle}>
          <Button type='submit' variant='contained' color='customDarkSeaGreen'>Submit</Button>
          <Button type='button' variant='contained' color='customDarkKhaki' onClick={() => resetInputs()} style={{marginLeft: '5px'}}>Reset</Button>
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
    <Container>
      <ThemeProvider theme={customTheme}>
        <MenuComponent anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} vote={vote} />
        {notification.message 
          && <Alert severity={notification.type} style={{position: 'absolute', display: 'block', top: '10px', right: '10px'/*, backgroundColor: notification.type === 'success' ? '#ADFF2F' : '#F08080'*/}}>{notification.message}</Alert>
        }
        <Footer />
      </ThemeProvider>
    </Container>
  );
};

export default App;
