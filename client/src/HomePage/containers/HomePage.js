import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import '../css/homepage.css';

import SignUpContainer from './SignUpContainer.js';
import SignInContainer from './SignInContainer.js';


class HomePage extends Component {

  render() {
    return (
      <div className="homepage-forgot-password-container">
        <div className="homepage-container">
          <div className="page-header">
            <h1>Matcha</h1>
            <SignInContainer />
          </div>
          <SignUpContainer />
        </div>
        <div>
          <Link to="/oubli">
            <span className="forgot-password">Identifiant ou mot de passe oublié ?</span>
          </Link>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default HomePage;
