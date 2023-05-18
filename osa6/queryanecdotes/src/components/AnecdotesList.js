import {useQuery} from "react-query";
import {getAnecdotes} from "../services/AnecdoteService";

const AnecdotesList = () => {
  
  const result = useQuery('anecdotes', getAnecdotes);
  const anecdotes = result.data;
  //console.log(anecdotes);

  const handleVote = (id) => {
    console.log('voted', id);
  };

  const style = {
    width: '240px',
    marginBottom: '10px',
    padding: '5px',
    backgroundColor: '#FFA07A',
    borderRadius: '5px'
  };

  if (anecdotes) {
    return (
      <div>
        <h3>Anecdotes</h3>
        {anecdotes.map(anecdote =>
          <div style={style} key={anecdote.id}>
            <input type='button' value='Vote' onClick={() => handleVote(anecdote.id)} style={{display: 'block', float: 'right', marginLeft: '10px', marginBottom: '10px'}} />
            <p style={{display: 'block'}}>{anecdote.content}</p>
          </div>
        )}
      </div>
    );
  } else {
    return <div><h3>Anecdote service is not available at the moment...</h3></div>;
  }
};

export default AnecdotesList;