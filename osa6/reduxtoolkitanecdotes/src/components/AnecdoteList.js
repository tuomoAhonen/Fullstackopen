import {useSelector, useDispatch} from "react-redux";
import {castVote} from "../reducers/AnecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    //console.log(state);
    return [state.filter.input].length === 0 ? 
    state.anecdotes.sort((a, b) => b.votes - a.votes) 
    : 
    state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.input.toLowerCase())).sort((a, b) => b.votes - a.votes)
  });

  const dispatch = useDispatch();

  const voteAnecdote = (id) => {
    //console.log('vote: ', id);
    dispatch(castVote(id));
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