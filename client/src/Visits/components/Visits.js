import React from 'react';

import ProfileBox from '../../Likes/components/ProfileBox.js';

const Visits = (props) => {
  const { visitors } = props;
  let display;
  switch (visitors.length) {
    case 0:
      display = <div className="no-likes">Vous n{"'"}avez pas encore de visiteurs !</div>;
      break;
    default:
      display = visitors.map((profile) => {
        const { _id } = profile;
        const indivKey = `visits_${_id}`;
        return (
          <div className="profile-box" key={indivKey}>
            <ProfileBox profile={profile} />
          </div>
        );
      });
  }

  return (
    <div>
      <h2 className="title-likes">Visiteurs</h2>
      <div className="all-likes">
        {display}
      </div>
    </div>
  );
};

export default Visits;
