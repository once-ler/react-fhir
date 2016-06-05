const actionType = 'PATIENT';
const application = 'react-fhir';
const module = 'patient';
const modulePath = `${application}/${module}`;
const FETCH_START = `${modulePath}/${actionType}_FETCH_START`;
const FETCH_SUCCESS = `${modulePath}/${actionType}_FETCH_SUCCESS`;
const FETCH_FAIL = `${modulePath}/${actionType}__FETCH_FAIL`;

const initialState = {
  loaded: false,
  data: {}
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

/* eslint no-unused-vars: 0 */
export function load(options) {
  // const { viewname } = options;
  return {
    types: [FETCH_START, FETCH_SUCCESS, FETCH_FAIL],
    promise: (client) => {
      return new Promise((resolve, reject) => {
        global.smart.patient.read()
          .then(pt => {
            resolve(pt);
          }, err => { reject(err); });
      });
    }
  };
}

export function isLoaded(globalState) {
  return globalState[module] && globalState[module].loaded;
}
