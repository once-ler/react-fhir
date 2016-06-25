import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from './redux/modules/auth';
import { App, NotFound, Home, Patient, AllergyIntolerance } from './containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        // replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="patient" component={Patient}/>
        <Route path="allergyIntolerance" component={AllergyIntolerance}/>
        { /* <Route path="scrollSyncGrid" component={CensusActivitySheet}/> */ }
        { /* <Route path="gridView" component={GridView}/> */ }
      </Route>

      { /* Routes */ }
      { /* <Route path="gridView" component={GridView} /> */ }
    { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
