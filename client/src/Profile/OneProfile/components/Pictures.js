import React from 'react';

import ShowProfilePic from '../../MyProfile/components/ShowProfilePic.js';
import ShowPic from '../../MyProfile/components/ShowPic.js';

const Pictures = (props) => {
  const { profilePic, pictures } = props.profile;

  return (
    <div className="each-box">
      <h2>Photos</h2>
      <div className="display-picture-box">
        <div className="one-profile-pic">
          <ShowProfilePic src={profilePic} />
        </div>
        <ShowPic multipleSrc={pictures} removeButtonOn={false} />
      </div>
    </div>
  );
};

export default Pictures;
