import {createListenerMiddleware} from "@reduxjs/toolkit";
import {/*setNotification, */newNotification} from "../reducers/NotificationReducer";
import {newAnecdote} from "../reducers/AnecdoteReducer";

//toinen tapa saada tieto ilman middlewarea voisi olla exporttaamalla dispatch functio storesta jollain tapaa ja saada tätä kautta kaikki staten tiedot?
const newAnecdoteListenerMiddleware = createListenerMiddleware();

newAnecdoteListenerMiddleware.startListening({
  actionCreator: newAnecdote,
  effect: (action, listenerApi) => {
    const newAnecdoteInformation = {anecdote: action.payload.content, type: 'newanecdote'};
    //listenerApi.dispatch(setNotification(newAnecdoteInformation));
    listenerApi.dispatch(newNotification(newAnecdoteInformation));
  }
});

export default newAnecdoteListenerMiddleware;