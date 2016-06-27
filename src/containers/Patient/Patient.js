/* eslint no-unused-vars: 0 */
/* eslint id-length: [2, {"properties": "never", "exceptions": ["_"]}] */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import * as actions from '../../redux/modules/patient/patient';
import {isLoaded, load } from '../../redux/modules/patient/patient';
import {GridForm, Fieldset, Row, Field} from 'react-gridforms';

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
    patient: PropTypes.object,
    loading: PropTypes.bool
  };

  render() {
    const { patient, loading } = this.props;
    let refreshClassName = 'rv-refresh';
    if (loading) {
      refreshClassName += ' spinner';
    }
    if (!patient) {
      return <div><h1>Patient</h1><h2>Not Authorized</h2></div>;
    }
    let addresses;
    addresses = (patient.address && <Fieldset legend="Address">{ patient.address.map(ad => <div key={Math.random()}><div>{ad.use}</div><Row><Field><label>Line</label><input type="text" value={ad.line.join(',')} /></Field></Row>
      <Row><Field><label>City</label><input type="text" value={ad.city} /></Field><Field><label>State</label><input type="text" value={ad.state} /></Field>
      <Field><label>Country</label><input type="text" value={ad.country} /></Field></Row></div>)}
      <hr/></Fieldset>);
    let telecoms;
    telecoms = (patient.telecom && <Fieldset legend="Telecom">{ patient.telecom.map(ad => <div key={Math.random()}><div>{ad.use}</div><Row><Field><label>{ad.system}</label><input type="text" value={ad.value} /></Field></Row></div>)}<hr/></Fieldset>);
    let extensions;
    extensions = (patient.extension && <Fieldset legend="Extension">{ patient.extension.map(ad => <div key={Math.random()}><div>{ad.url}</div><Row><Field><label>Display</label><input type="text" value={ad.valueCodeableConcept.coding[0].display} /></Field></Row>
      <Row><Field><label>System</label><input type="text" value={ad.valueCodeableConcept.coding[0].system} /></Field>
      <Field><label>Code</label><input type="text" value={ad.valueCodeableConcept.coding[0].code} /></Field></Row></div>)}
      <hr/></Fieldset>);

    return (
    <div className={refreshClassName}>
    <GridForm>
    <Fieldset legend="Patient">
      <Row>
        <Field><label>Last Name</label><input type="text" value={patient.name[0].family.join(' ')}></input></Field>
        <Field><label>First Name</label><input type="text" value={patient.name[0].given.join(' ')}></input></Field>
      </Row>
      <Row>
        <Field><label>Birth Date</label><input type="text" value={patient.birthDate}></input></Field>
        <Field><label>Active</label><input type="text" value={patient.active}></input></Field>
        <Field><label>Gender</label><input type="text" value={patient.gender}></input></Field>
      </Row>
      <Row>
        <Field><label>Marital Status</label><input type="text" value={patient.maritalStatus ? patient.maritalStatus.text : 'N/A'}></input></Field>
        <Field><label>Deceased</label><input type="text" value={patient.deceasedBoolean || 'false'}></input></Field>
      </Row>
      <hr/>
    </Fieldset>
    {addresses}
    {telecoms}
    {extensions}
    </GridForm></div>);
  }
}
