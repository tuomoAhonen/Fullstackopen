import {createListenerMiddleware} from "@reduxjs/toolkit";
import {/*setNotification, */newNotification} from "../reducers/NotificationReducer";
import {vote} from "../reducers/AnecdoteReducer";

//toinen tapa saada tieto ilman middlewarea voisi olla exporttaamalla dispatch functio storesta jollain tapaa ja saada tätä kautta kaikki staten tiedot?
const voteListenerMiddleware = createListenerMiddleware();

voteListenerMiddleware.startListening({
  actionCreator: vote,
  effect: (action, listenerApi) => {
    const voteInformation = {anecdote: action.payload.content, type: 'vote'};
    //listenerApi.dispatch(setNotification(voteInformation));
    listenerApi.dispatch(newNotification(voteInformation));
  }
});

export default voteListenerMiddleware;