import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import React, { Component } from 'react';

import ChangePassword from '../components/ChangePassword.js';

class Password extends Component {

  state = {
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  }

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  changePass = () => {
    const url = '/api/change_password';
    const user = Object.assign({}, this.state);
    axios.post(url, user)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { message } = data;
        NotificationManager.success(message, 'Success!', 1500);
      } else if (!error) {
        const { message } = data;
        NotificationManager.error(message, 'Oh...', 1500);
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <ChangePassword
        onSubmit={this.changePass}
        onChange={this.saveState}
      />
    );
  }
}

export default Password;
