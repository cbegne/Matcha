import React from 'react';
import emptyProfile from '../../img/empty_profile.png';

const ShowProfilePic = (props) => {
  const { src } = props;
  const displaySrc = `/static/${src}`;

  switch (src !== '') {
    case true:
      return <img className="square-profile-pic" src={displaySrc} alt="" />;
    default:
      return <img className="square-profile-pic" src={emptyProfile} alt="" />;
  }
};

export default ShowProfilePic;
