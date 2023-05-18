import {useDispatch} from "react-redux";
import {newAnecdote} from "../reducers/AnecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitNewAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(newAnecdote(anecdote));
  };

  return (
    <div>
      <form onSubmit={submitNewAnecdote}>
        <input name='anecdote' type='text' /><br />
        <input type='submit' value='Submit' style={{marginTop: '5px'}} />
      </form>
    </div>
  );
};

export default AnecdoteForm;