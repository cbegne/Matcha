import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import React, { Component } from 'react';

import MyGeolocate from '../components/MyGeolocate.js';

class Geolocate extends Component {

  getCoor = (position) => {
    const { latitude, longitude } = position.coords;
    const user = Object.assign({}, { latitude }, { longitude });
    const url = '/api/geolocate';
    axios.post(url, user)
    .then(({ data }) => {
      const { success, message } = data;
      if (success === true) {
        NotificationManager.success(message, 'Success!', 1500);
      } else {
        NotificationManager.error(message, 'Oh...', 1500);
      }
    })
    .catch(err => console.error('Error: ', err));
  };

  errorCoor = () => {
    const user = Object.assign({}, { latitude: '' }, { longitude: '' });
    const url = '/api/geolocate';
    axios.post(url, user)
    .catch(err => console.error('Error: ', err));
  };

  geolocateUser = () => {
    navigator.geolocation.getCurrentPosition(
      this.getCoor,
      this.errorCoor,
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true },
    );
  }

  render() {
    return (
      <MyGeolocate onClick={this.geolocateUser} />
    );
  }
}

export default Geolocate;
