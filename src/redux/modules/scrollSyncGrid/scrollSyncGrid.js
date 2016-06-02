const FETCH_GRID_LIST = 'lildata-react/scrollSyncGrid/FETCH_GRID_LIST';
const FETCH_GRID_LIST_SUCCESS = 'lildata-react/scrollSyncGrid/FETCH_GRID_LIST_SUCCESS';
const FETCH_GRID_LIST_FAIL = 'lildata-react/scrollSyncGrid/FETCH_GRID_LIST_FAIL';

const initialState = {
  viewname: '',
  loaded: false,
  searchValue: '',
  value: '',
  input: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_GRID_LIST:
      return {
        ...state,
        loading: true
      };
    case FETCH_GRID_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case FETCH_GRID_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function load(options) {
  const { viewname } = options;
  console.log(viewname);
  return {
    types: [FETCH_GRID_LIST, FETCH_GRID_LIST_SUCCESS, FETCH_GRID_LIST_FAIL],
    promise: (client) => client.get(`/GetDetail?scandate=3/03/2016&facility=LO0002697&page=2&rows=50`)
  };
}

export function isLoaded(globalState) {
  return globalState.scrollSyncGrid && globalState.scrollSyncGrid.loaded;
}
