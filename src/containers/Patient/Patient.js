/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import * as actions from '../../redux/modules/patient/patient';
import {isLoaded, load } from '../../redux/modules/patient/patient';

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
    patient: state.patient.data,
    error: state.patient.error,
    loading: state.patient.loading
  }),
  {...actions})
export default class extends Component {
  static propTypes = {
    patient: PropTypes.object
  };

  render() {
    const { patient } = this.props;
    return <div><h1>Patient</h1><pre>{JSON.stringify(patient)}</pre></div>;
  }
}
