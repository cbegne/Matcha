import axios from 'axios';
import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';

import Loading from '../General/components/Loading.js';
import MyProfile from './MyProfile/containers/MyProfile.js';
import OneProfile from './OneProfile/containers/OneProfile.js';
import { UnavailablePage } from '../General/components/NoPage.js';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    const path = this.props.location.pathname;
    const loginSearch = path.split('/').pop();
    this.state = {
      loginSearch,
      loggedUser: {},
      tagsSuggestions: [],
      profile: {},
      error: '',
      loaded: false,
    };
  }

  componentDidMount() {
    this.getProfile(this.state.loginSearch);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    const loginSearch = pathname.split('/').pop();
    this.setState({ loaded: false, loginSearch });
    this.getProfile(loginSearch);
  }

  getProfile = (loginSearch) => {
    this.setState({ error: '' });
    const url = `/api/getuser/${loginSearch}`;
    axios.get(url)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { profile, loggedUser, tagsSuggestions } = data;
        this.setState({ profile, loggedUser, tagsSuggestions, loaded: true });
      } else {
        this.setState({ error, loaded: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { loginSearch, loggedUser, profile, tagsSuggestions, loaded, error } = this.state;
    const { login } = loggedUser;

    if (loaded === false) { return <Loading />; }
    if (error) { return <UnavailablePage />; }
    if (login === loginSearch) {
      return (
        <div>
          <MyProfile profile={profile} tagsSuggestions={tagsSuggestions} />
          <NotificationContainer />
        </div>
      );
    }
    return <OneProfile loggedUser={loggedUser} profile={profile} />;
  }
}

export default ProfileContainer;
