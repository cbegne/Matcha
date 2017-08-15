import axios from 'axios';
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';

import MyProfilePic from '../components/MyProfilePic.js';
import MyPics from '../components/MyPics.js';
import '../../css/pictures.css';

class Pictures extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profilePicName: props.profile.profilePic,
      picNames: props.profile.pictures,
    };
  }

  saveProfilePic = (elem) => {
    const url = '/api/add_profile_pic';
    axios.post(url, elem)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { profilePicName } = data;
        this.setState({ profilePicName });
      } else if (!error) {
        const { message } = data;
        NotificationManager.error(message, 'Oh...', 1500);
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  savePics = (elem) => {
    const url = '/api/add_pics';
    axios.post(url, elem)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { picNames } = data;
        const pics = this.state.picNames;
        const newPics = pics.concat(picNames);
        this.setState({ picNames: newPics });
      } else if (!error) {
        const { message } = data;
        NotificationManager.error(message, 'Oh...', 1500);
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  removePic = (filename) => {
    const url = '/api/remove_pic';
    axios.post(url, { filename })
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const pics = this.state.picNames;
        const index = pics.indexOf(filename);
        pics.splice(index, 1);
        this.setState({ picNames: pics });
      } else if (!error) {
        const { message } = data;
        NotificationManager.error(message, 'Oh...', 1500);
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <div className="each-box my-pictures">
        <h2>Mes photos</h2>
        <div className="display-picture-box">
          <MyProfilePic
            onDrop={this.saveProfilePic}
            profilePicName={this.state.profilePicName}
          />
          <MyPics
            onDrop={this.savePics}
            onRemove={this.removePic}
            picNames={this.state.picNames}
          />
        </div>
      </div>
    );
  }
}

export default Pictures;
