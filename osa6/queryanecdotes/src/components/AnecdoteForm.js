import {useMutation, useQueryClient} from "react-query";
import {postAnecdote} from "../services/AnecdoteService";
import {useNotificationDispatch} from "../reducers/NotificationReducer";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const anecdoteMutation = useMutation(postAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes');
      const message = `Added new anecdote: "${anecdote.content}"`;
      dispatch({type: 'success', payload: message});
      return setTimeout(() => {
        return dispatch({type: 'null'});
      }, 5000);
    },
    onError: (error) => {
      //console.log(error); /*tähän tilalle error notification*/
      if (error.response.data.error && error.response.data.error === 'Too short anecdote, length must be 5 letters or more') {
        dispatch({type: 'error', payload: error.response.data.error});
        return setTimeout(() => {
          return dispatch({type: 'null'});
        }, 5000);
      } else {
        dispatch({type: 'error', payload: error.message});
        return setTimeout(() => {
          return dispatch({type: 'null'});
        }, 5000);
      }
    }
  });

  const createNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const anecdote = {content: content.charAt(0).toUpperCase() + content.slice(1), votes: 0};
    anecdoteMutation.mutate(anecdote);
  };

  return (
    <div>
      <h3 style={{marginBottom: '5px'}}>Create new Anecdote</h3>
      <form onSubmit={createNewAnecdote}>
        <input name='anecdote' />
        <input type="submit" value="Submit" style={{marginLeft: '5px'}} />
      </form>
    </div>
  );
};

export default AnecdoteForm;