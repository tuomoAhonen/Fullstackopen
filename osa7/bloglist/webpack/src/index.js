import React from 'react';
import ReactDOM from 'react-dom/client';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import App from './App';
import './index.css';
import {usePromisePolyfill} from './PromisePolyfill';

usePromisePolyfill();

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
