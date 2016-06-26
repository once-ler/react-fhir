// importing fhir-client will create a global http request object
// import '../../../node_modules/fhir-js-client/dist/fhir-client-isomorphic-fetch';
import '../../../node_modules/fhir-js-client/dist/fhir-client';

// initial global stub for a FhirClient
// in the reducer auth.js, will be replaced once authorized and jwt provided
function ClientPrototypeStub() {}
global.smart = new ClientPrototypeStub();

const LOAD = 'react-fhir/auth/LOAD';
const LOAD_SUCCESS = 'react-fhir/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'react-fhir/auth/LOAD_FAIL';
const LOGIN = 'react-fhir/auth/LOGIN';
const LOGIN_SUCCESS = 'react-fhir/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'react-fhir/auth/LOGIN_FAIL';
const LOGOUT = 'react-fhir/auth/LOGOUT';
const LOGOUT_SUCCESS = 'react-fhir/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'react-fhir/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        smart: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        smart: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        smart: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

/*
  This would be for a confidential client, not public
 */
export function login() {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

/*
  @description
    Typically, authorization from smart oauth2 server for a public client
    would be called from FHIR.oauth2.authorize(config) in launch.html
    by the time index.html is called, we have to wait for FHIR.oauth2.ready(callback)
    Note: FHIR.oauth2 is global, b/c it was imported in client.js
*/
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    /* eslint no-unused-vars: 0 */
    promise: (client) => {
      // this is a bit of a hack
      // typically, we are provided a http client object here, but we won't use it
      // instead, we're going to create a promise and wait for the callback from FHIR.oauth2.ready
      // console.log(window.FHIR.oauth2.ready.toString());
      return new Promise((resolve, reject) => {
        window.FHIR.oauth2.ready(smart => {
          global.smart = smart;
          resolve(smart);
        },
        err => { reject(err); });
      }).catch(err => console.log(err));
    }
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
