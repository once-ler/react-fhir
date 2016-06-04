const action = 'MEDICALRECORD';
const application = 'react-fhir';
const module = 'medicalRecord';
const modulePath = `${application}/${module}`;
const FETCH_START = `${modulePath}/${action}_FETCH_START`;
const FETCH_SUCCESS = `${modulePath}/${action}_FETCH_SUCCESS`;
const FETCH_FAIL = `${modulePath}/${action}__FETCH_FAIL`;

const initialState = {
  loaded: false,
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case FETCH_FAIL:
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

// TODO
export function load(options) {
  const { viewname } = options;
  return {
    types: [FETCH_START, FETCH_SUCCESS, FETCH_ERROR],
    promise: (client) => client.get(`/GetDetail?scandate=3/03/2016&facility=LO0002697&page=2&rows=50`)
  };
}

export function isLoaded(globalState) {
  return globalState[module] && globalState[mdoule].loaded;
}
