import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';
import anecdoteStore from './components/AnecdoteStore';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={anecdoteStore}>
    <App />
  </Provider> 
);