import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import auth from './auth';
import gridView from './gridView/gridView';
import hoTable from './hoTable/hoTable';
import scrollSyncGrid from './scrollSyncGrid/scrollSyncGrid';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  gridView,
  scrollSyncGrid,
  multireducer: multireducer({
    censusErrorHotable: hoTable
  })
});
