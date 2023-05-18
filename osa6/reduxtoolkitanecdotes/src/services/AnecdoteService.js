import axios from "axios";

const url = 'http://localhost:3001/anecdotes';

const getAnecdotes = async () => {
  const result = await axios.get(url);
  return result.data;
};

const createAnecdote = async (anecdote) => {
  const result = await axios.post(url, anecdote);
  return result.data;
};

const getAnecdote = async (id) => {
  const result = await axios.get(`${url}/${id}`);
  return result.data;
};

const voteAnecdote = async (id) => {
  let anecdote = await getAnecdote(id);
  //anecdote = {...anecdote, votes: anecdote.votes+1};
  anecdote.votes++;
  const result = await axios.put(`${url}/${id}`, anecdote);
  return result.data;
};

// eslint-disable-next-line
export default {getAnecdotes, createAnecdote, voteAnecdote};