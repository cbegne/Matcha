import React from 'react';

import ProfileBox from './ProfileBox.js';

const Likes = (props) => {
  const { likers } = props;
  let display;
  switch (likers.length) {
    case 0:
      display = <div className="no-likes">Vous n{"'"}avez pas encore de likes !</div>;
      break;
    default:
      display = likers.map((profile) => {
        const { _id } = profile;
        const indivKey = `likes_${_id}`;
        return (
          <div className="profile-box" key={indivKey}>
            <ProfileBox profile={profile} />
          </div>
        );
      });
  }

  return (
    <div>
      <h2 className="title-likes">Likes reçus</h2>
      <div className="all-likes">
        {display}
      </div>
    </div>
  );
};

export default Likes;
