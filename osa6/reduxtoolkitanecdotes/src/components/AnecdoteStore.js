import {configureStore} from "@reduxjs/toolkit";
import AnecdoteReducer from '../reducers/AnecdoteReducer';
import FilterReducer from '../reducers/FilterReducer';
import NotificationReducer from "../reducers/NotificationReducer";
import NewAnecdoteListenerMiddleware from "../middlewares/NewAnecdoteListener";
import VoteListenerMiddleware from "../middlewares/VoteListener";

const anecdoteStore = configureStore({
  reducer: {
    anecdotes: AnecdoteReducer,
    filter: FilterReducer,
    notification: NotificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(NewAnecdoteListenerMiddleware.middleware, VoteListenerMiddleware.middleware),
});

/*
export const anecdoteLatestHook = (anecdote) => {
  anecdoteStore.dispatch(anecdote);
};
*/

export default anecdoteStore;