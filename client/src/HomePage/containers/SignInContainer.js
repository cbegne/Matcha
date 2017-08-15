import axios from 'axios';
import Cookies from 'universal-cookie';
import { NotificationManager } from 'react-notifications';
import React, { Component } from 'react';

import SignInForm from '../components/SignIn.js';
import RedirectProfile from '../../General/components/RedirectProfile.js';

class SignInContainer extends Component {

  state = {
    login: '',
    password: 'pass123',
    auth: false,
  }

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  checkUser = () => {
    const user = Object.assign({}, this.state);
    const url = '/api/signin';
    axios.post(url, user)
    .then(({ data }) => {
      const { success, message } = data;
      if (success === false) {
        NotificationManager.error(message, 'Oh...', 1500);
        this.setState({ auth: false });
      }
      if (success === true) {
        const { token } = data;
        const cookies = new Cookies();
        cookies.set('access_token', token, { path: '/' });
        this.setState({ auth: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    switch (this.state.auth) {
      case true:
        return <RedirectProfile login={this.state.login} />;
      default:
        return (
          <SignInForm
            onSubmit={this.checkUser}
            onChange={this.saveState}
            message={this.state.message}
          />
        );
    }
  }
}

export default SignInContainer;
