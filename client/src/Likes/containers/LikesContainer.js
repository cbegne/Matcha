import axios from 'axios';
import React, { Component } from 'react';

import Loading from '../../General/components/Loading.js';
import Likes from '../components/Likes.js';
import NewLikes from '../components/NewLikes.js';
import '../css/likes.css';

class LikesContainer extends Component {

  state = {
    likers: [],
    newLikers: [],
    error: '',
    loaded: false,
  };

  componentDidMount() {
    const url = '/api/get_likes';
    axios.get(url)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { profiles, newProfiles } = data;
        this.setState({ likers: profiles, newLikers: newProfiles, loaded: true });
      } else {
        this.setState({ error, loaded: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { likers, newLikers, loaded, error } = this.state;

    if (loaded === false) { return <Loading />; }
    if (error) { return <div>{error}</div>; }
    return (
      <div>
        <NewLikes newLikers={newLikers} />
        <Likes likers={likers} />
      </div>
    );
  }
}

export default LikesContainer;
