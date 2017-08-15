import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectProfile = (props) => {
  const login = props.login;
  const profile = `/profil/${login}`;
  return (
    <Redirect to={profile} />
  );
};

export default RedirectProfile;
