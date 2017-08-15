import axios from 'axios';
import React, { Component } from 'react';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { Link } from 'react-router-dom';

import InputForgot from '../components/InputForgot.js';
import '../css/forgot.css';

class Forgot extends Component {

  state = {
    email: '',
  }

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  sendMail = () => {
    const { email } = this.state;
    const url = `/api/forgot/${email}`;
    axios.put(url)
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
        <InputForgot
          onSubmit={this.sendMail}
          onChange={this.saveState}
          message={this.state.message}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default Forgot;
