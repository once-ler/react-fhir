/* eslint no-unused-vars: 0 */
/* eslint id-length: [2, {"properties": "never", "exceptions": ["_"]}] */
/* eslint "no-param-reassign": 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { asyncConnect } from 'redux-connect';
import * as actions from '../../redux/modules/clinicalTrials/clinicalTrials';
import {isLoaded, load } from '../../redux/modules/clinicalTrials/clinicalTrials';
import {GridForm, Fieldset, Row, Field} from 'react-gridforms';
import _ from 'lodash';

@connect(
  state => ({
    clinicalTrials: state.clinicalTrials.data,
    error: state.clinicalTrials.error,
    loading: state.clinicalTrials.loading
  }),
  {...actions})
export default class extends Component {
  static propTypes = {
    clinicalTrials: PropTypes.array,
    error: PropTypes.string
  };

  render() {
    const { clinicalTrials, error } = this.props;

    if (error) {
      return <h2>{error}</h2>;
    }

    let studies;
    studies = (<Fieldset legend="Participated Studies">{ clinicalTrials.map(ad => (<Row>
      <Field><label>Name</label><input type="text" value={ad.name} /></Field>
      <Field><label>Principal Investigator</label><input type="text" value={ad.principalInvestigator} /></Field>
      <Field><label>Link</label><a target="_blank" href={ad.link}>{ad.link}</a></Field></Row>)) }</Fieldset>);

    return clinicalTrials && (
    <div><h1>Clinical Trials</h1>
    <GridForm>
    {studies}
    </GridForm></div>);
  }
}
