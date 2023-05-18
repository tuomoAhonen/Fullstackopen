import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NotificationContextProvider} from './reducers/NotificationReducer';

const queryClient = new QueryClient();
//queryClient.invalidateQueries();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
);