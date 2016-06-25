import '../../styles/main.scss';
import './App.scss';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from '../../redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({smart: state.auth.smart}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    smart: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.smart && nextProps.smart) {
      // login
      this.props.pushState('/patient');
    } else if (this.props.smart && !nextProps.smart) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {smart} = this.props;
    const logoImage = require('../../../static/mfny2.jpeg');
    return (
      <div className="app">
        <header container>
          <div className="logo"><img src={logoImage}/></div>
          <div>
          <ul className="nav">
            <li>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className="brand"/>
                <span>{config.app.title}</span>
              </IndexLink>
            </li>
            <li key={6}><Link to="/patient">Patient</Link></li>
            <li key={7}><Link to="/allergyIntolerance">Allergy Intolerance</Link></li>
            <li key={10} className="logout-link" onClick={this.handleLogout}><Link to="/logout">Logout</Link></li>
          </ul>
          </div>
        </header>
        {smart && smart.tokenResponse &&
            <div><h4>Token Response</h4><pre>{JSON.stringify(smart.tokenResponse)}</pre></div>}

        <main container className="appContent">
          {this.props.children}
        </main>

      </div>
    );
  }
}
