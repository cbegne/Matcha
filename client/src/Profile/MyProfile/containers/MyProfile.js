import React, { Component } from 'react';

import Bio from './Bio.js';
import Delete from './Delete.js';
import Geolocate from './Geolocate.js';
import Password from './Password.js';
import Pictures from './Pictures.js';
import Popularity from '../../OneProfile/components/Popularity.js';
import Tags from './Tags.js';
import UpdateInfos from './UpdateInfos.js';
import '../../css/my-profile.css';

class MyProfile extends Component {

  render() {
    const { profile, tagsSuggestions } = this.props;

    return (
      <div className="profile-container">
        <div className="my-profile-title">
          <h2 className="">{profile.login}</h2>
          <Popularity profile={profile} />
        </div>
        <Pictures profile={profile} />
        <Tags profile={profile} tagsSuggestions={tagsSuggestions} />
        <div className="shared-container">
          <Bio profile={profile} />
          <Geolocate profile={profile} />
        </div>
        <div className="shared-container">
          <UpdateInfos profile={profile} />
          <Password />
        </div>
        <Delete />
      </div>
    );
  }
}

export default MyProfile;
