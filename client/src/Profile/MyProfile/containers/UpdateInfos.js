import moment from 'moment';
import React, { Component } from 'react';

import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import UpdateMyInfos from '../components/UpdateMyInfos.js';

class UpdateInfos extends Component {

  constructor(props) {
    super(props);
    const date = moment(props.profile.birthDate).format('DD/MM/YYYY');
    this.state = {
      email: props.profile.email,
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      gender: props.profile.gender,
      orientation: props.profile.orientation,
      birthDate: date,
    };
  }

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  changeInfos = () => {
    const user = Object.assign({}, this.state);
    const url = '/api/update_infos';
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
      <UpdateMyInfos
        profile={this.props.profile}
        onSubmit={this.changeInfos}
        onChange={this.saveState}
      />
    );
  }
}

export default UpdateInfos;
