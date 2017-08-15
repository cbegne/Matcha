import React, { Component } from 'react';

import LikeBlockReport from './LikeBlockReport.js';
import Chat from '../components/Chat.js';
import Connected from '../components/Connected.js';
import Title from '../components/Title.js';
import Popularity from '../components/Popularity.js';

class Interactions extends Component {

  render() {
    const { loggedUser, profile } = this.props;

    return (
      <div className="one-profile-interactions">
        <Title loggedUser={loggedUser} profile={profile} />
        <LikeBlockReport loggedUser={loggedUser} profile={profile} />
        <Chat loggedUser={loggedUser} profile={profile} />
        <Popularity profile={profile} />
        <Connected profile={this.props.profile} />
      </div>
    );
  }
}

export default Interactions;
