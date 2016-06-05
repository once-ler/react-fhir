/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import * as actions from '../../redux/modules/medicationOrder/medicationOrder';
import {isLoaded, load } from '../../redux/modules/medicationOrder/medicationOrder';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(load({ ['resourceName']: 'MedicationOrder', ['referencePath']: 'MedicationOrder.medicationReference' })));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    medicationOrder: state.medicationOrder.data,
    error: state.medicationOrder.error,
    loading: state.medicationOrder.loading
  }),
  {...actions})
export default class extends Component {
  static propTypes = {
    medicationOrder: PropTypes.object
  };

  render() {
    const { medicationOrder } = this.props;
    return <div><h1>Medication Order</h1><pre>{JSON.stringify(medicationOrder)}</pre></div>;
  }
}
