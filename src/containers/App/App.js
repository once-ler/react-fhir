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
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;

    return (
      <div className="app">
        <header container>
          <div className="logo">logo</div>
          <div>
          <ul className="nav">
            <li>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className="brand"/>
                <span>{config.app.title}</span>
              </IndexLink>
            </li>
            <li key={6}><Link to="/scrollSyncGrid">Census Activity Sheet</Link></li>
            <li key={7}><Link to="/gridView">Grid View</Link></li>
            <li key={10} className="logout-link" onClick={this.handleLogout}><Link to="/logout">Logout</Link></li>
          </ul>
          </div>
        </header>
        {user && user.data &&
            <p className="loggedInMessage">Logged in as <strong>{`${user.data.lastName}, ${user.data.firstName}`}</strong>.</p>}

        <main container className="appContent">
          {this.props.children}
        </main>

      </div>
    );
  }
}
