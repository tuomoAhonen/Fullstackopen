import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createStore, combineReducers} from 'redux';
import AnecdoteReducer from './reducers/AnecdoteReducer';
import FilterReducer from './reducers/FilterReducer';
import {Provider} from 'react-redux';

const reducer = combineReducers({
  anecdotes: AnecdoteReducer,
  filter: FilterReducer
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider> 
);