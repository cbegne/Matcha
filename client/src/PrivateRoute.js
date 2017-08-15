import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const isAuthenticated = () => {
  const cookies = new Cookies();
  const token = cookies.get('access_token');
  try {
    const decoded = jwtDecode(token);
    return decoded.login;
  } catch (err) {
    return null;
  }
};

const PublicRoute = ({ component, ...props }) => {
  const login = isAuthenticated();
  if (login) {
    const profile = `/profil/${login}`;
    return <Redirect to={profile} />;
  }
  return <Route {...props} component={component} />;
};

const PrivateRoute = ({ component, ...props }) => {
  if (isAuthenticated()) {
    return <Route {...props} component={component} />;
  }
  console.log('Authentification required');
  return <Redirect to="/" />;
};

export { PrivateRoute, PublicRoute };
