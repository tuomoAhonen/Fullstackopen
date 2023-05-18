const defaultState = {
  filterInput: ''
};

const FilterReducer = (state = defaultState, action) => {
  //console.log('action: ', action);
  switch (action.type) {
    case 'setfilter':
      //console.log('correct case');
      return {...state, filterInput: action.payload.input};
    default:
      return state;
  }
};

export const filterInput = (input) => {
  return {
    type: 'setfilter',
    payload: {input}
  }
};

export default FilterReducer;