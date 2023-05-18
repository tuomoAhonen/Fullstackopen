import deepFreeze from 'deep-freeze';
import counterReducer from './Reducer';

describe('Unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  };

  test('Should return a proper initial state when called with undefined state', () => {
    const state = {};
    const action = {
      type: 'DO_NOTHING'
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('Good increment', () => {
    const state = initialState;
    const action = {
      type: 'GOOD'
    };
    
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });

  test('Ok increment', () => {
    const state = initialState;
    const action = {
      type: 'OK'
    };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    });
  });

  test('Bad increment', () => {
    const state = initialState;
    const action = {
      type: 'BAD'
    };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    });
  });

  test('Reset all', () => {
    const state = initialState;
    const action = {
      type: 'ZERO'
    };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    });
  });
});