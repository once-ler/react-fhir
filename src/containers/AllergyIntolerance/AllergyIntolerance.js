/* eslint no-unused-vars: 0 */
/* eslint id-length: [2, {"properties": "never", "exceptions": ["_"]}] */
/* eslint "no-param-reassign": 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink, Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import * as actions from '../../redux/modules/allergyIntolerance/allergyIntolerance';
import {isLoaded, load } from '../../redux/modules/allergyIntolerance/allergyIntolerance';
import {GridForm, Fieldset, Row, Field} from 'react-gridforms';
import _ from 'lodash';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isLoaded(getState())) {
      promises.push(dispatch(load({ ['resourceName']: 'AllergyIntolerance', ['referencePath']: '' })));
      // promises.push(dispatch(load()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    allergyIntolerance: state.allergyIntolerance.data,
    error: state.allergyIntolerance.error,
    loading: state.allergyIntolerance.loading
  }),
  {...actions})
export default class extends Component {
  static propTypes = {
    allergyIntolerance: PropTypes.array
  };

  render() {
    const { allergyIntolerance } = this.props;
    if (!allergyIntolerance) {
      return <div><h1>Allergy Intolerance</h1><h2>Not Authorized</h2></div>;
    }

    let allergyIntolerances;
    allergyIntolerances = allergyIntolerance.map(ad => (<div><Fieldset legend={ad.substance.text}>
      <Row><Field><label>Criticality</label><input type="text" value={ad.criticality} /></Field>
      <Field><label>Onset</label><input type="text" value={ad.onset} /></Field>
      <Field><label>Status</label><input type="text" value={ad.status} /></Field></Row>
      <Row><Field><label>Record Date</label><input type="text" value={ad.recordedDate} /></Field>
      <Field><label>Recorder</label><input type="text" value={ad.recorder.display} /></Field>
      <Field><label>Recorder Reference</label><input type="text" value={ad.recorder.reference} /></Field></Row>
      <Row><Field><label>Note</label><input type="text" value={ad.note ? ad.note.text : ''} /></Field></Row>
      <hr/>
      <div>Reactions</div>
      { ad.reaction.map(su => (<div>
      <Row><Field><label>Manifestation</label><textarea value={_.reduce(su.manifestation, (mu, dx) => { mu += `${dx.text}\n`; return mu;}, '')}></textarea></Field></Row>
      </div>
      ))
      }
      <hr/>
      <div>Coding</div>
      { ad.substance.coding.map(su => (
      <Row><Field><label>System</label><input type="text" value={su.system} /></Field>
      <Field><label>Code</label><input type="text" value={su.code} /></Field>
      <Field><label>Display</label><input type="text" value={su.display} /></Field></Row>))
      }
      </Fieldset><hr/></div>)
      );

    return allergyIntolerance && (
    <div><h1>Allergy Intolerance</h1><h3>{allergyIntolerance[0].patient.display}</h3>
    <GridForm>
    {allergyIntolerances}
    </GridForm></div>);
  }
}
