import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
//import AnecdotesList from "./components/AnecdotesList";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {getAnecdotes, voteAnecdote} from "./services/AnecdoteService";
import {useNotificationDispatch} from "./reducers/NotificationReducer";

const App = () => {
  const result = useQuery('anecdotes', getAnecdotes);
  const dispatch = useNotificationDispatch();
  const anecdotes = result.data;
  //console.log(anecdotes);

  const queryClient = useQueryClient();
  const voteMutation = useMutation(voteAnecdote, {
    onSuccess: (anecdote) => {
      //console.log(anecdote);
      queryClient.invalidateQueries('anecdotes');
      const message = `Voted anecdote: "${anecdote.content}"`;
      dispatch({type: 'success', payload: message});
      return setTimeout(() => {
        return dispatch({type: 'null'});
      }, 5000);
    },
    onError: (error) => {
      dispatch({type: 'error', payload: error.message});
      return setTimeout(() => {
        return dispatch({type: 'null'});
      }, 5000);
    }
  });

  const handleVote = (anecdote) => {
    //console.log('voted', id);
    voteMutation.mutate(anecdote.id);
  };

  const style = {
    width: '240px',
    minHeight: '32px',
    marginBottom: '5px',
    padding: '5px',
    backgroundColor: '#FFA07A',
    borderRadius: '5px'
  };

  if (anecdotes) {
    return (
      <div>
        <AnecdoteForm />
        <div>
          <h3 style={{marginBottom: '5px'}}>Anecdotes</h3>
          {anecdotes.map(anecdote =>
            <div style={style} key={anecdote.id}>
              <div style={{display: 'block', float: 'right', minWidth: '60px', backgroundColor: '#FFE4E1', padding: '5px'}}>
                <div style={{display: 'inline-block'}}>{anecdote.votes}</div>
                <input type='button' value='Vote' onClick={() => handleVote(anecdote)} style={{display: 'inline-block', marginLeft: '5px'}} />
              </div>
              <div style={{display: 'block'}}>{anecdote.content}</div>
              
            </div>
          )}
        </div>
        <Notification />
      </div>
    );
  } else {
    return <div><h3>Anecdote service is not available at the moment...</h3></div>;
  }

/*
  return (
    <div>
      <AnecdoteForm />
      <AnecdotesList />
      <Notification />
    </div>
  );
*/
};

export default App;
