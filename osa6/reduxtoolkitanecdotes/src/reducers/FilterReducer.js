import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  input: ''
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setfilter(state, action) {
      state.input = action.payload;
    }
  }
});

export const {setfilter} = filterSlice.actions;
export default filterSlice.reducer;