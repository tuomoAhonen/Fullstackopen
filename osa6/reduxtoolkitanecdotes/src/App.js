import AnecdoteFilter from "./components/AnecdoteFilter";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeAnecdotes} from "./reducers/AnecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]); 

  return (
    <div>
      <h2 style={{marginBottom: '5px'}}>Create new anecdote</h2>
      <AnecdoteForm />
      <h2 style={{marginBottom: '5px'}}>AnecDotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <Notification />
    </div>
  );
};

export default App;