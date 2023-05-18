import {useDispatch} from "react-redux";
import {createNewAnecdote} from "../reducers/AnecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitNewAnecdote = (e) => {
    e.preventDefault();
    if (e.target.anecdote.value) {
      const anecdote = e.target.anecdote.value;
      e.target.anecdote.value = '';
      dispatch(createNewAnecdote(anecdote));
    }
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