import {createSlice} from "@reduxjs/toolkit";
import AnecdoteService from "../services/AnecdoteService";
/*
const anecdotesDefault = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];
*/

const generatedIdArray = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const generateId = () => {
  const generatedId = parseInt(getId());
  if (generatedIdArray.length === 0 || !generatedIdArray.includes(generatedId)) {
    generatedIdArray.push(generatedId);
    return generatedId;
  } else {
    return generateId();
  }
};

const asObject = (anecdote) => {
  const newId = generateId();
  return {
    content: anecdote,
    id: newId,
    votes: 0
  };
};

// generateId()-funktio ei ole pakollinen, koska json-server voi generoida id-arvon automaattisesti
// eli returnin id-kohtaan voitaisiin laittaa null tai jättää se kokonaan pois
// samaa ominaisuutta voidaan käyttää useimmissa tietokannoissa, mikä on hyvä tapa id:n generoimiseksi
/* tämä siis toimisi kanssa json-serverin takia
const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  };
};
*/

//const initialState = anecdotesDefault.map(anecdote => asObject(anecdote));

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {  
      return state.map(anecdote => {
        //console.log('anecdote id: ', anecdote.id);
        //console.log('payload id: ', action.payload);
        if (anecdote.id === action.payload.id) {
          return {...anecdote, votes: anecdote.votes+1};
        } else {
          return anecdote;
        }
      });
    },
    newAnecdote(state, action) {
      //const newAnecdote = asObject(action.payload);
      //AnecdoteService.createAnecdote(newAnecdote);
      //console.log(action.payload);
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      //console.log(action.payload);
      const defaultAnecdotes = action.payload;
      defaultAnecdotes.forEach(anecdote => generatedIdArray.push(anecdote.id));
      //console.log(generatedIdArray);
      return defaultAnecdotes;
    }
  }
});

export const initializeAnecdotes = () => async dispatch => {
  try {
    const result = await AnecdoteService.getAnecdotes();
    return dispatch(setAnecdotes(result));
  } catch (error) {
    return alert(error.message);
  }
};

export const createNewAnecdote = anecdote => async dispatch => {
  /*
  //console.log(anecdote);
  const anecdoteToObject = asObject(anecdote);
  //console.log(anecdoteToObject);
  const result = await AnecdoteService.createAnecdote(anecdoteToObject);
  //console.log(result);
  return dispatch(newAnecdote(result));
  */
  const anecdoteToObject = asObject(anecdote);
  try {
    const result = await AnecdoteService.createAnecdote(anecdoteToObject);
    return dispatch(newAnecdote(result));
  } catch (error) {
    return alert(error.message);
  }
};

export const castVote = id => async dispatch => {
  try {
    const result = await AnecdoteService.voteAnecdote(id);
    return dispatch(vote(result));
  } catch (error) {
    return alert(error.message);
  }
};

export const {vote, newAnecdote, setAnecdotes} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;