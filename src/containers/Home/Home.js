import './Home.scss';
import React, { Component } from 'react';
import config from '../../config';

export default class Home extends Component {
  render() {
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');
    return (
      <div className="home">
        <div className="masthead">
          <h1>{config.app.title}</h1>
        </div>
      </div>
    );
  }
}
