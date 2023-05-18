import React, {useState} from 'react';
import { createStore } from 'redux';
import Reducer from './Reducer';

const store = createStore(Reducer);

const App = () => {
  const [results, setResults] = useState({
    good: 0,
    ok: 0,
    bad: 0
  });

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    });
  };

  const ok = () => {
    store.dispatch({
      type: 'OK'
    });
  };

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    });
  };

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    });
  };

  store.subscribe(() => {
    setResults({...store.getState()});
  });

  return (
    <div>
      <input type='button' onClick={good} value="Good" />
      <input type='button' onClick={ok} value="Ok" />
      <input type='button' onClick={bad} value="Bad" />
      <input type='button' onClick={zero} value="Reset" />
      <div>Good {results.good}</div>
      <div>Ok {results.ok}</div>
      <div>Bad {results.bad}</div>
    </div>
  );
};

//store.subscribe(App);

export default App;