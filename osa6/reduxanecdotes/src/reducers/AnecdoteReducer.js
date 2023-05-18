const anecdotesDefault = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];
const generatedIdArray = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const generateId = () => {
  const generatedId = getId();
  if (generatedIdArray.length === 0 || generatedIdArray.find(id => id !== generatedId)) {
    generatedIdArray.push(generatedId);
    return generatedId;
  } else {
    generateId();
  }
};

const asObject = (anectode) => {
  const newId = generateId();
  
  return {
    content: anectode,
    id: newId,
    votes: 0
  };
};

const initialState = anecdotesDefault.map(asObject);

const AnecdoteReducer = (state = initialState, action) => {
  //console.log('state now: ', state);
  //console.log('action: ', action);

  switch (action.type) {
    case 'vote':
      let foundAnecdote = state.find(anecdote => anecdote.id === action.payload.id);
      //console.log(foundAnecdote);
      foundAnecdote = {...foundAnecdote, votes: foundAnecdote.votes+1};

      const newState = state.map(anecdote => {
        if (anecdote.id !== action.payload.id) {
          return anecdote;
        } else {
          return foundAnecdote;
        } 
      });

      return [...newState];
    case 'new':
      //console.log(action);
      const newAnecdote = asObject(action.payload.anecdote);
      //console.log(generatedIdArray);
      return [...state, newAnecdote];
    default: 
      return state;
  }
};

export const vote = (id) => {
  return {
    type: 'vote',
    payload: {id}
  }
};

export const newAnecdote = (anecdote) => {
  return {
    type: 'new',
    payload: {anecdote}
  };
};

export default AnecdoteReducer;