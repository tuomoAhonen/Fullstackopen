import axios from "axios";

const url = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const result = await axios.get(url);
  return result.data;
};

const getAnecdote = async (id) => {
  return await axios.get(url+'/'+id);
};

const getNewId = async () => {
  const result = await axios.get(url);
  const anecdotes = result.data;
  //console.log(anecdotes);

  let newId = Math.max(...anecdotes.map(anecdote => anecdote.id));
  newId++;
  //console.log(newId);
  return newId;
}

export const postAnecdote = async (anecdote) => {
    const id = await getNewId();
    //console.log(anecdote);
    const newAnecdote = {id: id, ...anecdote}
    const result = await axios.post(url, newAnecdote);
    return result.data;
};

export const voteAnecdote = async (id) => {
  //console.log(id);
  let anecdote = await getAnecdote(id);
  anecdote = anecdote.data;
  //console.log(anecdote);
  anecdote.votes++;

  const result = await axios.put(url+'/'+id, anecdote);
  //console.log(result);
  return result.data;
};