import React from 'react';

const Bio = (props) => {
  const { bio } = props.profile;

  return (
    <div className="each-box">
      <h2>Bio</h2>
      <p className="well well-md">{bio}</p>
    </div>
  );
};

export default Bio;
