import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import React, { Component } from 'react';

import MyBio from '../components/MyBio.js';

class Bio extends Component {

  state = {
    bio: '',
  }

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  saveBio = () => {
    const user = Object.assign({}, this.state);
    const url = '/api/bio';
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
      <MyBio
        profile={this.props.profile}
        onSubmit={this.saveBio}
        onChange={this.saveState}
      />
    );
  }
}

export default Bio;
