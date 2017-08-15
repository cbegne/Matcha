import React from 'react';
import { Link } from 'react-router-dom';

import ShowProfilePic from '../../Profile/MyProfile/components/ShowProfilePic.js';
import Connected from '../../Profile/OneProfile/components/Connected.js';
import Popularity from '../../Profile/OneProfile/components/Popularity.js';

const ProfileBox = (props) => {
  const { profile } = props;
  const { login, profilePic } = profile;

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
    </div>
  );
};

export default ProfileBox;
