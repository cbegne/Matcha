import axios from 'axios';
import Cookies from 'universal-cookie';
import React, { Component } from 'react';

import { InvalidToken } from '../components/NoPage.js';
import Loading from '../components/Loading.js';
import RedirectProfile from '../components/RedirectProfile.js';

class FinalSignUp extends Component {

  state = {
    login: '',
    auth: undefined,
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    const confirmationKey = {
      confirmationKey: pathname.split('/').pop(),
    };
    const url = '/api/confirm';
    axios.post(url, confirmationKey)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        const { token, login } = data;
        const cookies = new Cookies();
        cookies.set('access_token', token, { path: '/' });
        this.setState({ auth: true, login });
      } else {
        this.setState({ auth: false });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { auth, login } = this.state;

    switch (auth) {
      case false:
        return <InvalidToken />;
      case true:
        return <RedirectProfile login={login} />;
      default:
        return <Loading />;
    }
  }
}

export default FinalSignUp;
