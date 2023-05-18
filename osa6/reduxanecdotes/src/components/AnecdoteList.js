import {useSelector, useDispatch} from "react-redux";
import {vote} from "../reducers/AnecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.filter.filterInput.length === 0 ? 
    state.anecdotes.sort((a, b) => b.votes - a.votes) 
    : 
    state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.filterInput.toLowerCase())).sort((a, b) => b.votes - a.votes));
  /*
  const anecdotes = useSelector(state => {
    //console.log(state.filter.filterInput);
    if (state.filter.filterInput.length === 0) {
      return state.anecdotes.sort((a, b) => b.votes - a.votes);
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.filterInput.toLowerCase())).sort((a, b) => b.votes - a.votes);
    }
  });
  */
  //anecdotes.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const voteAnecdote = (id) => {
    //console.log('vote: ', id);
    dispatch(vote(id));
  };

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>Has {anecdote.votes} votes <input type='button' value="Vote" onClick={() => voteAnecdote(anecdote.id)} /></div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;