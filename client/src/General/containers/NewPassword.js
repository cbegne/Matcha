import axios from 'axios';
import React, { Component } from 'react';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Link } from 'react-router-dom';

import InputNewPassword from '../components/InputNewPassword.js';
import '../css/forgot.css';

class NewPassword extends Component {

  state = {
    password: '',
    passwordConfirm: '',
  }

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  changePassword = () => {
    const { pathname } = this.props.location;
    const confirmationKey = {
      confirmationKey: pathname.split('/').pop(),
    };
    const user = Object.assign({}, this.state, confirmationKey);
    const url = '/api/reinit_password';
    axios.post(url, user)
    .then(({ data }) => {
      const { success, message } = data;
      if (success === true) {
        NotificationManager.success(message, 'Success!', 3000);
      } else {
        NotificationManager.error(message, 'Oh...', 3000);
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <div>
        <Link to="/"><span className="fa fa-arrow-left" /></Link>
        <InputNewPassword
          onSubmit={this.changePassword}
          onChange={this.saveState}
          message={this.state.message}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default NewPassword;
