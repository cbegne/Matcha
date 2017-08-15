import axios from 'axios';
import React, { Component } from 'react';

import Loading from '../../General/components/Loading.js';
import Visits from '../components/Visits.js';
import NewVisits from '../components/NewVisits.js';

class VisitsContainer extends Component {

  state = {
    visitors: [],
    newVisitors: [],
    error: '',
    loaded: false,
  };

  componentDidMount() {
    const url = '/api/get_visits';
    axios.get(url)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { profiles, newProfiles } = data;
        this.setState({ visitors: profiles, newVisitors: newProfiles, loaded: true });
      } else {
        this.setState({ error, loaded: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { visitors, newVisitors, loaded, error } = this.state;

    if (loaded === false) { return <Loading />; }
    if (error) { return <div>{error}</div>; }
    return (
      <div>
        <NewVisits newVisitors={newVisitors} />
        <Visits visitors={visitors} />
      </div>
    );
  }
}

export default VisitsContainer;
