import AnecdoteFilter from "./components/AnecdoteFilter";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div>
      <h2 style={{marginBottom: '5px'}}>Create new anecdote</h2>
      <AnecdoteForm />
      <h2 style={{marginBottom: '5px'}}>AnecDotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
    </div>
  );
};

export default App;