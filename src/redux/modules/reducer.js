import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import auth from './auth';
// import gridView from './gridView/gridView';
// import hoTable from './hoTable/hoTable';
// import scrollSyncGrid from './scrollSyncGrid/scrollSyncGrid';
import patient from './patient/patient';
import allergyIntolerance from './allergyIntolerance/allergyIntolerance';
import clinicalTrials from './clinicalTrials/clinicalTrials';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  patient,
  allergyIntolerance,
  clinicalTrials
  // gridView,
  // scrollSyncGrid,
  // multireducer: multireducer({
  //   censusErrorHotable: hoTable
  // })
});
