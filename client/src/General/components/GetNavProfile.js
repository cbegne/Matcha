import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Tooltip } from 'react-bootstrap';
import TooltipLink from './TooltipLink.js';

const GetNavProfile = () => {
  const cookies = new Cookies();
  const token = cookies.get('access_token');
  try {
    const decoded = jwtDecode(token);
    const login = decoded.login;
    const profile = `/profil/${login}`;
    const tooltip = <Tooltip id="nav-my-profile">Mon profil</Tooltip>;
    return (
      <TooltipLink to={profile} className="glyphicon glyphicon-user" tooltip={tooltip} />
    );
  } catch (err) {
    return <Redirect to="/" />;
  }
};

export default GetNavProfile;
