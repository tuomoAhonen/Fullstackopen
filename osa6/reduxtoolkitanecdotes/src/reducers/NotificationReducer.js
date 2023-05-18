import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  content: null,
};

const notificationSlice = createSlice({
  name: 'anecdotelatest',
  initialState,
  reducers: {
    setNotification(state, action) {
      //console.log('Latest: ', state, action);
      //console.log(action.payload);
      state.content = action.payload;
    },
    unsetNotification(state, action) {
      state.content = null;
    }
  }
});

export const newNotification = information => async dispatch => {
  dispatch(setNotification(information));
  return setTimeout(() => {
    return dispatch(unsetNotification());
  }, 5000)
};


export const {setNotification, unsetNotification} = notificationSlice.actions;
export default notificationSlice.reducer;