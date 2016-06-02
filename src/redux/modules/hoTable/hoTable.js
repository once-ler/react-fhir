const LOAD = 'redux-example/hoTable/LOAD';
const SYNC = 'redux-example/hoTable/SYNC';

const initialState = {
  data: [],
  changes: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data
      };
    case SYNC:
      return {
        ...state,
        changes: Object.assign(state.changes, action.changes)
      };
    default:
      return state;
  }
}

export function load(data) {
  return {
    type: LOAD,
    data
  };
}

export function sync(changes) {
  return {
    type: SYNC,
    changes
  };
}
