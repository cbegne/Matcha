import React, { Component } from 'react';

import ShowTinyProfilePic from './ShowTinyProfilePic.js';

class Message extends Component {
  render() {
    const { message, loggedUser, profile } = this.props;
    const { author, text } = message;

    if (author === profile.login) {
      return (
        <div className="message-display">
          <ShowTinyProfilePic src={profile.profilePic} className="message-profile-pic" />
          <div className="message other-chat">
            {text}
          </div>
        </div>
      );
    }
    return (
      <div className="message-display">
        <ShowTinyProfilePic src={loggedUser.profilePic} className="message-profile-pic" />
        <div className="message logged-user-chat">
          {text}
        </div>
      </div>
    );
  }
}

export default Message;
