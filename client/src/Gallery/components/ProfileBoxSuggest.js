import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ShowProfilePic from '../../Profile/MyProfile/components/ShowProfilePic.js';
import Connected from '../../Profile/OneProfile/components/Connected.js';
import Popularity from '../../Profile/OneProfile/components/Popularity.js';

class ProfileBoxSuggest extends Component {

  render() {
    const { profile } = this.props;
    const { login, profilePic, age, distance, nbCommonTags, popularity } = profile;

    return (
      <div>
        <div className="profile-box-header">
          <Popularity profile={profile} />
          <Link to={`/profil/${login}`}>
            <h2 className="login-likes">
              {login}
            </h2>
          </Link>
        </div>
        <Link to={`/profil/${login}`}>
          <ShowProfilePic src={profilePic} />
        </Link>
        <Connected profile={profile} />
        <div className="profile-box-info">Age : {age} ans</div>
        <div className="profile-box-info">Distance : {distance} km</div>
        <div className="profile-box-info">Tags en commun : {nbCommonTags}</div>
        <div className="profile-box-info">Popularité : {popularity}</div>
      </div>
    );
  }
}

export default ProfileBoxSuggest;
