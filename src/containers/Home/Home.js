import './Home.scss';
import React, { Component } from 'react';
import config from '../../config';

export default class Home extends Component {
  render() {
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className="home">
        <div className="masthead">
          <div className="">
            <div className="home">
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>
          </div>
        </div>
      </div>
    );
  }
}
