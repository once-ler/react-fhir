const module = 'medicalOrder';
const modulePath = `../../redux/modules/${module}/${module}`;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import * as actions from `${modulePath}`;
import {isLoaded, load } from `${modulePath}`;

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(load()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    data: state[module].data,
    error: state[module].error,
    loading: state[module].loading
  }),
  {...actions})
export default class MedicalOrder extends Component {

}
