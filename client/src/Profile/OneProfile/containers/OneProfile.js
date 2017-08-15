import React, { Component } from 'react';

import Bio from '../components/Bio.js';
import Infos from '../components/Infos.js';
import Interactions from './Interactions.js';
import Pictures from '../components/Pictures.js';
import Tags from '../components/Tags.js';
import '../../css/one-profile.css';

class OneProfile extends Component {

  render() {
    return (
      <div className="profile-container">
        <Interactions loggedUser={this.props.loggedUser} profile={this.props.profile} />
        <Pictures profile={this.props.profile} />
        <Infos profile={this.props.profile} />
        <Tags profile={this.props.profile} />
        <Bio profile={this.props.profile} />
      </div>
    );
  }
}

export default OneProfile;
